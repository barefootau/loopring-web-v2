import React from "react";

import { FeeInfo, myLog } from "@loopring-web/common-resources";
import { AccountStep, useOpenModals } from "@loopring-web/component-lib";

import {
  activateAccount,
  useAccount,
  ActionResult,
  ActionResultCode,
  EddsaKey,
  LoopringAPI,
  accountServices,
} from "../../index";

import * as sdk from "@loopring-web/loopring-sdk";
import { useWalletInfo } from "../../stores/localStore/walletInfo";
import { ConnectorError } from "@loopring-web/loopring-sdk";

export function useUpdateAccount() {
  const { updateHW, checkHWAddr } = useWalletInfo();

  const { setShowAccount } = useOpenModals();

  const { account } = useAccount();

  const goUpdateAccount = React.useCallback(
    async ({
      isFirstTime = false,
      isReset = false,
      feeInfo,
    }: {
      isFirstTime?: boolean;
      isReset?: boolean;
      feeInfo?: FeeInfo;
    }) => {
      setShowAccount({
        isShow: true,
        step: isReset
          ? AccountStep.ResetAccount_Approve_WaitForAuth
          : AccountStep.UpdateAccount_Approve_WaitForAuth,
      });

      const isHWAddr = !isFirstTime ? true : checkHWAddr(account.accAddress);

      myLog(
        "goUpdateAccount: isFirstTime:",
        isFirstTime,
        " isReset:",
        isReset,
        " isHWAddr:",
        isHWAddr
      );

      const response: ActionResult = await activateAccount({
        isHWAddr,
        feeInfo,
        isReset,
      });

      switch (response.code) {
        case ActionResultCode.NoError:
          const { eddsaKey, accInfo } = response?.data as EddsaKey;
          if (!isFirstTime && isHWAddr) {
            updateHW({ wallet: account.accAddress, isHWAddr });
          }
          if (
            !(
              LoopringAPI.userAPI &&
              LoopringAPI.walletAPI &&
              accInfo &&
              accInfo?.accountId !== -1
            )
          ) {
            //TODO;
            setShowAccount({
              isShow: true,
              step: isReset
                ? AccountStep.ResetAccount_Failed
                : AccountStep.UpdateAccount_Failed,
              error: response?.data as sdk.RESULT_INFO,
            });
          } else {
            try {
              const [{ apiKey }, { walletType }] = await Promise.all([
                LoopringAPI.userAPI.getUserApiKey(
                  {
                    accountId: accInfo.accountId,
                  },
                  eddsaKey.sk
                ),
                LoopringAPI.walletAPI.getWalletType({
                  wallet: account.accAddress,
                }),
              ]);
              accountServices.sendAccountSigned({
                apiKey,
                eddsaKey,
                isInCounterFactualStatus: walletType?.isInCounterFactualStatus,
                isContract: walletType?.isContract,
              });
              setShowAccount({
                isShow: true,
                step: isReset
                  ? AccountStep.UpdateAccount_Success
                  : AccountStep.ResetAccount_Success,
              });
              await sdk.sleep(1000);
              setShowAccount({ isShow: false });
            } catch (error) {
              if (error) {
                //TODO:
                setShowAccount({
                  isShow: true,
                  step: isReset
                    ? AccountStep.ResetAccount_Failed
                    : AccountStep.UpdateAccount_Failed,
                  error: response?.data as sdk.RESULT_INFO,
                });
              }
            }
          }
          break;
        case ActionResultCode.UpdateAccountError:
        case ActionResultCode.GenEddsaKeyError:
          let errMsg = sdk.checkErrorInfo(
            response?.data as sdk.RESULT_INFO,
            isFirstTime as boolean
          );
          if (
            (response?.data as sdk.RESULT_INFO)?.message?.startsWith(
              ConnectorError.USER_DENIED_2
            )
          ) {
            errMsg = sdk.ConnectorError.USER_DENIED;
          }

          switch (errMsg) {
            case sdk.ConnectorError.NOT_SUPPORT_ERROR:
              myLog("activateAccount UpdateAccount: NOT_SUPPORT_ERROR");
              setShowAccount({
                isShow: true,
                step: isReset
                  ? AccountStep.ResetAccount_First_Method_Denied
                  : AccountStep.UpdateAccount_First_Method_Denied,
              });
              return;
            case sdk.ConnectorError.USER_DENIED:
              myLog("activateAccount: USER_DENIED");
              setShowAccount({
                isShow: true,
                step: isReset
                  ? AccountStep.ResetAccount_User_Denied
                  : AccountStep.UpdateAccount_User_Denied,
              });
              return;
            default:
              myLog("activateAccount: Error");
              setShowAccount({
                isShow: true,
                step: isReset
                  ? AccountStep.ResetAccount_Failed
                  : AccountStep.UpdateAccount_Failed,
                error: response?.data as sdk.RESULT_INFO,
              });
              return;
          }
          break;
        default:
          myLog("activateAccount: USER_DENIED");
          setShowAccount({
            isShow: true,
            step: isReset
              ? AccountStep.ResetAccount_Failed
              : AccountStep.UpdateAccount_Failed,
            error: response?.data as sdk.RESULT_INFO,
          });
          return;

          break;
      }
    },
    [account.accAddress, checkHWAddr, setShowAccount, updateHW]
  );

  return {
    goUpdateAccount,
  };
}
