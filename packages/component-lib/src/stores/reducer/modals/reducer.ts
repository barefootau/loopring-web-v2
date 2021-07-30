import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalState, ModalStatePlayLoad } from './interface';
import {
    AmmInfoProps,
    DepositInfoProps, ModalAccountProps,
    ModalWalletConnectProps,
    ResetInfoProps,
    SwapInfoProps,
    TransferInfoProps,
    WithdrawInfoProps
} from '../../../index';
import { IBData } from '@loopring-web/common-resources';

const initialState: ModalState<IBData<any>, any> = {
    isShowTransfer: {isShow: false, props: {}},
    isShowWithdraw: {isShow: false, props: {}},
    isShowDeposit: {isShow: false, props: {}},
    isShowResetAccount: {isShow: false, props: {}},
    isShowSwap: {isShow: false, props: {}},
    isShowAmm: {isShow: false, props: {}},
    isShowConnect: {isShow: false, props: {}},
    isShowAccount: {isShow: false, props: {}},
}

export const modalsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setShowAmm(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<AmmInfoProps<any, any, any, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowAmm.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowAmm.props[ key ] = props[ key ]
                })
            }
        },
        setShowSwap(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<SwapInfoProps<any, any, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowSwap.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowSwap.props[ key ] = props[ key ]
                })
            }
        },
        setShowTransfer(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<TransferInfoProps<IBData<any>, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowTransfer.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowTransfer.props[ key ] = props[ key ]
                })
            }
        },
        setShowWithdraw(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<WithdrawInfoProps<IBData<any>, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowWithdraw.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowWithdraw.props[ key ] = props[ key ]
                })
            }
        },
        setShowDeposit(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<DepositInfoProps<IBData<any>, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowDeposit.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowDeposit.props[ key ] = props[ key ]
                })
            }
        },
        setShowResetAccount(state, action: PayloadAction<ModalStatePlayLoad & { props?: Partial<ResetInfoProps<IBData<any>, any>> }>) {
            const {props, isShow} = action.payload;
            state.isShowResetAccount.isShow = isShow;
            if (props) {
                Object.keys(props).map(key => {
                    state.isShowResetAccount.props[ key ] = props[ key ]
                })
            }
        },
        setShowConnect(state, action: PayloadAction<{ isShow: boolean } & { props?: Partial<ModalWalletConnectProps> }>) {
            const {isShow} = action.payload;
            state.isShowConnect.isShow = isShow
        },
        setShowAccount(state, action: PayloadAction<{ isShow: boolean } & { props?: Partial<ModalAccountProps> }>) {
            const {isShow} = action.payload;
            state.isShowAccount.isShow = isShow
        }
    },
})
export const {
    setShowTransfer,
    setShowWithdraw,
    setShowDeposit,
    setShowResetAccount,
    setShowSwap,
    setShowAmm,
    setShowConnect,
    setShowAccount
} = modalsSlice.actions
// export const { setTheme,setPlatform,setLanguage } = settingsSlice.actions
