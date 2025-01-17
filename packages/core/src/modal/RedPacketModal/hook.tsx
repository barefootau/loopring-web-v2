/* eslint-disable react/jsx-pascal-case */

import {
  AccountStep,
  RedPacketOpenProps,
  RedPacketQRCodeProps,
  RedPacketTimeoutProps,
  RedPacketViewStep,
  useOpenModals,
} from "@loopring-web/component-lib";
import React from "react";
import {
  Exchange,
  getShortAddr,
  getValuePrecisionThousand,
  UIERROR_CODE,
  YEAR_DAY_MINUTE_FORMAT,
} from "@loopring-web/common-resources";
import {
  useAccount,
  // useSystem,
  useTokenMap,
} from "../../stores";
import { volumeToCountAsBigNumber } from "../../hooks";
import { useTranslation } from "react-i18next";
import moment from "moment";
import * as sdk from "@loopring-web/loopring-sdk";
import { LoopringAPI } from "../../api_wrapper";

// import { useWalletInfo } from "../../stores/localStore/walletInfo";

export function useRedPacketModal() {
  const {
    modals: {
      // isShowNFTDetail,
      isShowRedPacket: { info, isShow, step },
    },
    setShowRedPacket,
    setShowAccount,
  } = useOpenModals();
  const { account } = useAccount();
  const { tokenMap, idIndex } = useTokenMap();
  const { t } = useTranslation("common");
  // const { chainId, connectName } = useSystem();
  // const { checkHWAddr, updateHW } = useWalletInfo();

  // React.useEffect(() => {
  //
  // }, [info.]);
  const amountStr = React.useMemo(() => {
    const _info = info as sdk.LuckyTokenItemForReceive;
    const token = tokenMap[idIndex[_info.tokenId] ?? ""];
    if (token && _info && _info.tokenAmount) {
      const symbol = token.symbol;
      const amount = getValuePrecisionThousand(
        volumeToCountAsBigNumber(symbol, _info.tokenAmount as any),
        token.precision,
        token.precision,
        undefined,
        false,
        {
          floor: false,
          // isTrade: true,
        }
      );
      return amount + " " + symbol;
    }
    return "";

    // tokenMap[]
  }, [info?.tokenId, info?.tokenAmount]);
  const textSendBy = React.useMemo(() => {
    const _info = info as sdk.LuckyTokenItemForReceive;
    if (info && _info.validSince > _info.createdAt) {
      const date = moment(new Date(`${_info.validSince}000`)).format(
        YEAR_DAY_MINUTE_FORMAT
      );
      return t("labelLuckyRedPacketStart", date);
    } else {
      return "";
    }
  }, [info?.validSince, info?.createdAt]);
  const redPacketQRCodeProps: RedPacketQRCodeProps | undefined =
    React.useMemo(() => {
      // new Date(info.validSince)
      const _info = info as sdk.LuckyTokenItemForReceive;
      if (
        (isShow && _info.status === sdk.LuckyTokenItemStatus.COMPLETED) ||
        _info.status === sdk.LuckyTokenItemStatus.OVER_DUE
      ) {
        setShowRedPacket({
          isShow,
          step: RedPacketViewStep.TimeOutPanel,
          info: _info,
        });
      } else if (
        isShow &&
        _info?.hash &&
        step === RedPacketViewStep.QRCodePanel
      ) {
        const url = `${Exchange}/wallet?redpacket&id=${info?.hash}&referrer=${account.accAddress}`;
        return {
          url,
          textAddress: _info.sender?.ens ?? getShortAddr(_info.sender?.address),
          textContent: _info.info.memo,
          amountStr,
          textSendBy,
          textType:
            _info.type.mode == sdk.LuckyTokenClaimType.RELAY
              ? t("labelRelayRedPacket")
              : t("labelLuckyRedPacket"),
          textShared: t("labelShare"),
          textNo: _info.templateNo?.toString(),
        } as RedPacketQRCodeProps;
      } else {
        return undefined;
      }
      return undefined;
    }, [info, account.accAddress, isShow, textSendBy, amountStr, step]);
  const redPacketTimeoutProps: RedPacketTimeoutProps | undefined =
    React.useMemo(() => {
      // new Date(info.validSince)
      const _info = info as sdk.LuckyTokenItemForReceive;
      if (
        isShow &&
        step === RedPacketViewStep.TimeOutPanel &&
        (_info.status === sdk.LuckyTokenItemStatus.COMPLETED ||
          _info.status === sdk.LuckyTokenItemStatus.OVER_DUE)
      ) {
        return {
          memo: _info.info.memo,
          sender:
            _info.sender?.ens ?? getShortAddr(_info.sender?.address) ?? "",
          viewDetail: () => {
            setShowRedPacket({
              isShow,
              step: RedPacketViewStep.DetailPanel,
              info: _info,
            });
          },
        } as RedPacketTimeoutProps;
      } else {
        return undefined;
      }
      return undefined;
    }, [info, account.accAddress, isShow, step]);
  const redPacketOpenProps: RedPacketOpenProps | undefined =
    React.useMemo(() => {
      // new Date(info.validSince)
      const _info = info as sdk.LuckyTokenItemForReceive;
      if (_info.status == sdk.LuckyTokenItemStatus.COMPLETED) {
      } else if (isShow && _info.status === sdk.LuckyTokenItemStatus.OVER_DUE) {
        setShowRedPacket({
          isShow,
          step: RedPacketViewStep.TimeOutPanel,
          info: _info,
        });
      } else if (
        isShow &&
        _info?.hash &&
        step === RedPacketViewStep.OpenPanel
      ) {
        return {
          memo: _info.info.memo,
          amountStr,
          sender:
            _info.sender?.ens ?? getShortAddr(_info.sender?.address) ?? "",
          viewDetail: () => {
            setShowRedPacket({
              isShow,
              step: RedPacketViewStep.DetailPanel,
              info: _info,
            });
          },

          onOpen: async () => {
            setShowAccount({
              isShow: true,
              step: AccountStep.RedPacketOpen_In_Progress,
            });
            // let isHWAddr = checkHWAddr(account.accAddress);
            // if (!isHWAddr && !isNotHardwareWallet) {
            //   isHWAddr = true;
            // }

            try {
              // TODO:
              let response =
                LoopringAPI.luckTokenAPI?.sendLuckTokenClaimLuckyToken({
                  request: {
                    hash: _info?.hash,
                    claimer: account.accAddress,
                    // TODO:
                    referrer: _info.info.memo,
                  },
                  // chainId: chainId === "unknown" ? 1 : chainId,
                  // walletType: (ConnectProvidersSignMap[connectName] ??
                  //   connectName) as unknown as sdk.ConnectorNames,
                  eddsaKey: account.eddsaKey.sk,
                  apiKey: account.apiKey,
                  // isHWAddr,
                } as any);
              //await
              if (
                (response as sdk.RESULT_INFO).code ||
                (response as sdk.RESULT_INFO).message
              ) {
                throw response;
              }
              setShowAccount({
                isShow: false,
              });
              setShowRedPacket({
                isShow,
                step: RedPacketViewStep.OpenedPanel,
                info: { ..._info, response },
              });
            } catch (error: any) {
              setShowAccount({
                isShow: true,
                step: AccountStep.RedPacketOpen_Failed,
                error: {
                  code: UIERROR_CODE.UNKNOWN,
                  msg: error?.message,
                  // @ts-ignore
                  ...(error instanceof Error
                    ? {
                        message: error?.message,
                        stack: error?.stack,
                      }
                    : error ?? {}),
                },
              });
              // setShowAccount({
              //   isShow: false,
              // });
            }
          },
        };
      } else {
        return undefined;
      }
      return undefined;
    }, [info, account.accAddress, isShow, step]);
  return {
    redPacketQRCodeProps,
    redPacketTimeoutProps,
    redPacketOpenProps,
  };
}

export const useRedPacketDetail = () => {
  return {
    redPacketProps: undefined,
  };
};
