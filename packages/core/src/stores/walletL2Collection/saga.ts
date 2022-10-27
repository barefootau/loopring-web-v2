import { all, call, fork, put, takeLatest } from "redux-saga/effects";
import {
  getWalletL2CollectionStatus,
  updateWalletL2Collection,
} from "./reducer";
import { store, LoopringAPI } from "../../index";
import {
  CustomError,
  ErrorMap,
  myLog,
  CollectionLimit,
  L2CollectionFilter,
} from "@loopring-web/common-resources";
import * as sdk from "@loopring-web/loopring-sdk";

const getWalletL2CollectionBalance = async <_R extends { [key: string]: any }>({
  page,
  filter,
}: {
  page: number;
  filter?: L2CollectionFilter;
}) => {
  const offset = (page - 1) * CollectionLimit;
  const { accountId, apiKey, accAddress } = store.getState().account;
  myLog("getWalletL2CollectionBalance", filter);
  let response;
  if (
    filter?.isLegacy &&
    apiKey &&
    accountId &&
    LoopringAPI.userAPI &&
    filter?.tokenAddress
  ) {
    response = await LoopringAPI.userAPI
      .getUserLegacyCollection(
        {
          accountId: accountId.toString(),
          tokenAddress: filter.tokenAddress,
          limit: CollectionLimit,
          offset,
          ...filter,
        },
        apiKey
      )
      .then((result = {}) => {
        if (!result?.raw_data?.collections) {
          result.collections = result.raw_data;
          result.totalNum = result.raw_data.length;
          return result;
        } else {
          return result;
        }
      })
      .catch((_error) => {
        new CustomError(ErrorMap.TIME_OUT);
        return {
          collections: [],
          totalNum: 0,
        };
      });
  } else if (apiKey && accountId && LoopringAPI.userAPI) {
    response = await LoopringAPI.userAPI
      .getUserOwenCollection(
        {
          // @ts-ignore
          owner: accAddress,
          limit: CollectionLimit,
          offset,
          ...filter,
        },
        apiKey
      )
      .catch((_error) => {
        throw new CustomError(ErrorMap.TIME_OUT);
      });
  }
  let collections: sdk.CollectionMeta[] = [],
    totalNum = 0;
  if (
    response &&
    ((response as sdk.RESULT_INFO).code ||
      (response as sdk.RESULT_INFO).message)
  ) {
    throw new CustomError(ErrorMap.ERROR_UNKNOWN);
  }
  collections = (response as any)?.collections;
  totalNum = (response as any).totalNum;
  return {
    walletL2Collection: collections ?? [],
    total: totalNum,
    page,
  };
};

export function* getPostsSaga({ payload: { page = 1, filter } }: any) {
  try {
    // @ts-ignore
    const walletL2Collection: any = yield call(getWalletL2CollectionBalance, {
      page,
      filter,
    });
    yield put(getWalletL2CollectionStatus({ ...walletL2Collection }));
  } catch (err) {
    yield put(getWalletL2CollectionStatus(err));
  }
}

export function* walletL2CollectionSaga() {
  yield all([takeLatest(updateWalletL2Collection, getPostsSaga)]);
}

export const walletL2CollectionFork = [fork(walletL2CollectionSaga)];
