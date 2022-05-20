import { createSlice, PayloadAction, Slice } from "@reduxjs/toolkit";
import { ModalState, ModalStatePlayLoad, Transaction } from "./interface";
import { NFTWholeINFO, TradeNFT } from "@loopring-web/common-resources";
import { RESULT_INFO } from "@loopring-web/loopring-sdk";

const initialState: ModalState = {
  isShowSupport: { isShow: false },
  isWrongNetworkGuide: { isShow: false },
  isShowTransfer: { isShow: false, symbol: undefined },
  isShowWithdraw: { isShow: false, symbol: undefined },
  isShowDeposit: { isShow: false, symbol: undefined },
  isShowResetAccount: { isShow: false },
  isShowActiveAccount: { isShow: false },
  isShowExportAccount: { isShow: false },
  isShowSwap: { isShow: false },
  isShowAmm: { isShow: false },
  isShowConnect: { isShow: false, step: 0 },
  isShowAccount: { isShow: false, step: 0 },
  isShowFeeSetting: { isShow: false },
  isShowTradeIsFrozen: { isShow: false, type: "" },
  isShowIFrame: { isShow: false, url: "" },
  isShowNFTTransfer: { isShow: false },
  isShowNFTWithdraw: { isShow: false },
  isShowNFTDeposit: { isShow: false },
  isShowNFTMint: { isShow: false },
};

export const modalsSlice: Slice<ModalState> = createSlice({
  name: "settings",
  initialState,
  reducers: {
    setShowIFrame(
      state,
      action: PayloadAction<{ isShow: boolean; url: string }>
    ) {
      const { isShow, url } = action.payload;
      state.isShowIFrame = {
        isShow,
        url,
      };
    },
    setShowSupport(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowSupport.isShow = isShow;
    },
    setShowWrongNetworkGuide(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isWrongNetworkGuide.isShow = isShow;
    },
    setShowAmm(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowAmm.isShow = isShow;
    },
    setShowSwap(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowSwap.isShow = isShow;
    },
    setShowNFTTransfer(
      state,
      action: PayloadAction<ModalStatePlayLoad & NFTWholeINFO>
    ) {
      const { isShow, nftData, nftType, ...rest } = action.payload;
      state.isShowNFTTransfer = {
        isShow,
        nftData,
        nftType,
        ...rest,
      };
    },
    setShowNFTDeposit(
      state,
      action: PayloadAction<ModalStatePlayLoad & TradeNFT<any>>
    ) {
      const { isShow, nftData, nftType, ...rest } = action.payload;
      state.isShowNFTDeposit = {
        isShow,
        nftType,
        ...rest,
      };
    },
    setShowNFTMint(
      state,
      action: PayloadAction<ModalStatePlayLoad & TradeNFT<any>>
    ) {
      const { isShow, nftData, nftType, ...rest } = action.payload;
      state.isShowNFTMint = {
        isShow,
        nftData,
        nftType,
        ...rest,
      };
    },
    setShowNFTWithdraw(
      state,
      action: PayloadAction<ModalStatePlayLoad & NFTWholeINFO>
    ) {
      const { isShow, nftData, nftType, ...rest } = action.payload;
      state.isShowNFTWithdraw = {
        isShow,
        nftData,
        nftType,
        ...rest,
      };
    },
    setShowTransfer(
      state,
      action: PayloadAction<ModalStatePlayLoad & Transaction>
    ) {
      const { isShow, symbol } = action.payload;
      state.isShowTransfer = {
        isShow,
        symbol,
      };
    },
    setShowWithdraw(
      state,
      action: PayloadAction<ModalStatePlayLoad & Transaction>
    ) {
      const { isShow, symbol } = action.payload;
      state.isShowWithdraw = {
        isShow,
        symbol,
      };
    },
    setShowDeposit(
      state,
      action: PayloadAction<
        ModalStatePlayLoad & Transaction & { partner: boolean }
      >
    ) {
      const { isShow, symbol, partner } = action.payload;
      state.isShowDeposit = {
        isShow,
        symbol,
        partner,
      };
    },
    setShowResetAccount(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowResetAccount.isShow = isShow;
    },
    setShowActiveAccount(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowActiveAccount.isShow = isShow;
    },
    setShowExportAccount(state, action: PayloadAction<ModalStatePlayLoad>) {
      const { isShow } = action.payload;
      state.isShowExportAccount.isShow = isShow;
    },
    setShowConnect(
      state,
      action: PayloadAction<{
        isShow: boolean;
        step?: number;
        error?: RESULT_INFO;
      }>
    ) {
      const { isShow, step, error } = action.payload;
      state.isShowConnect = {
        isShow,
        step: step ? step : 0,
        error: error ?? undefined,
      };
    },
    setShowAccount(
      state,
      action: PayloadAction<{
        isShow: boolean;
        step?: number;
        error?: RESULT_INFO;
        info?: { [key: string]: any };
      }>
    ) {
      const { isShow, step, error, info } = action.payload;
      state.isShowAccount = {
        isShow,
        step: step ? step : 0,
        error: error ?? undefined,
        info: info ?? undefined,
      };
    },
    setShowFeeSetting(state, action: PayloadAction<{ isShow: boolean }>) {
      const { isShow } = action.payload;
      state.isShowFeeSetting = {
        isShow,
      };
    },
    setShowTradeIsFrozen(
      state,
      action: PayloadAction<{ isShow: boolean; type: string }>
    ) {
      const { isShow, type } = action.payload;
      state.isShowTradeIsFrozen = {
        isShow,
        type,
      };
    },
  },
});
export const {
  setShowNFTTransfer,
  setShowNFTDeposit,
  setShowNFTWithdraw,
  setShowTransfer,
  setShowWithdraw,
  setShowDeposit,
  setShowResetAccount,
  setShowExportAccount,
  setShowSwap,
  setShowAmm,
  setShowConnect,
  setShowAccount,
  setShowFeeSetting,
  setShowActiveAccount,
  setShowIFrame,
  setShowNFTMint,
  setShowTradeIsFrozen,
  setShowSupport,
  setShowWrongNetworkGuide,
} = modalsSlice.actions;
