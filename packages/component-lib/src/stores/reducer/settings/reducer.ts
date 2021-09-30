import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { PlatFormType, SettingsState } from "./interface";
import { i18n, LanguageKeys, layoutConfigs, ThemeKeys, ThemeType, UpColor } from '@loopring-web/common-resources';
import moment from 'moment';
import * as imgConfig  from '@loopring-web/common-resources/assets/images/coin/loopring.json'
import { Slice } from '@reduxjs/toolkit/src/createSlice';
import { Currency } from 'loopring-sdk';
import { Layouts } from 'react-grid-layout';

const initialState: SettingsState = {
    themeMode: ThemeType.dark, //localStore.getItem('ThemeType')?localStore.getItem('ThemeType') as ThemeKeys :ThemeType.dark,
    language: i18n.language as LanguageKeys, //localStore.getItem('LanguageKey')?localStore.getItem('LanguageKey') as LanguageKeys: i18n.language as LanguageKeys,
    platform: PlatFormType.desktop,
    currency: Currency.usd,//localStore.getItem('Currency')?localStore.getItem('Currency') as keyof typeof Currency: Currency.usd,
    upColor: UpColor.green,//localStore.getItem('UpColor')?localStore.getItem('UpColor') as keyof typeof UpColor: UpColor.green,
    coinJson: imgConfig.frames,
    slippage: 'N',
    hideL2Assets: false,
    hideLpToken: false,
    hideSmallBalances: true,
    proLayout: layoutConfigs[ 0 ].layouts
}

export const settingsSlice:Slice<SettingsState> = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setTheme(state, action: PayloadAction<ThemeKeys>) {
            // localStore.setItem('ThemeType',action.payload)
            state.themeMode = action.payload
            
        },
        setLanguage(state, action: PayloadAction<LanguageKeys>) {
            i18n.changeLanguage(action.payload);
            if (action.payload) {
                // action.payload === 'en_US' ? moment.locale('en') : moment.locale(action.payload.toLocaleLowerCase());
                action.payload === 'en_US' 
                    ? moment.updateLocale('en', {
                            relativeTime : {
                                future: "in %s",
                                past:   "%s ago",
                                s  : 'a few seconds',
                                ss : '%d seconds',
                                m:  "a minute",
                                mm: "%d minutes",
                                h:  "an hour",
                                hh: "%d hours",
                                d:  "a day",
                                dd: "%d days",
                                w:  "a week",
                                ww: "%d weeks",
                                M:  "a month",
                                MM: "%d months",
                                y:  "a year",
                                yy: "%d years",
                            }
                        })
                    : moment.updateLocale('zh-cn', {
                        relativeTime : {
                            future: "%s后",
                            past:   "%s前",
                            s  : '几秒',
                            ss : '%d 秒',
                            m:  "1 分钟",
                            mm: "%d 分钟",
                            h:  "1 小时",
                            hh: "%d 小时",
                            d:  "1 天",
                            dd: "%d 天",
                            w:  "1 周",
                            ww: "%d 周",
                            M:  "1 个月",
                            MM: "%d 个月",
                            y:  "1 年",
                            yy: "%d 年",
                        }
                    });
                state.language = action.payload
            }
        },
        setPlatform(state, action: PayloadAction<keyof typeof PlatFormType>) {
            state.platform = action.payload
        },
        setCurrency(state, action: PayloadAction<Currency>) {
            // localStore.setItem('Currency',action.payload)
            state.currency = action.payload
        },
        setUpColor(state, action: PayloadAction<keyof typeof UpColor>) {
            // localStore.setItem('UpColor',action.payload)
            state.upColor = action.payload
        },
        setSlippage(state, action: PayloadAction<'N' | number>) {
            // localStore.setItem('UpColor',action.payload)
            state.slippage = action.payload
        },
        setCoinJson(state, action: PayloadAction<any>) {
            // localStore.setItem('UpColor',action.payload)
            state.coinJson = action.payload
        },
        setHideL2Assets(state, action: PayloadAction<boolean>) {
            state.hideL2Assets = action.payload
        },
        setHideLpToken(state, action: PayloadAction<boolean>) {
            state.hideLpToken = action.payload
        },
        setHideSmallBalances(state, action: PayloadAction<boolean>) {
            state.hideSmallBalances = action.payload
        },
        setLayouts(state, action: PayloadAction<Layouts>) {
            // localStore.setItem('UpColor',action.payload)
            state.proLayout = {
                ...layoutConfigs[ 0 ].layouts,
                ...state.proLayout,
                ...action.payload,
            }
        },
    },
})
export const {setLayouts,setTheme, setLanguage, setPlatform, setCurrency, setUpColor, setSlippage, setCoinJson, setHideL2Assets, setHideLpToken, setHideSmallBalances} = settingsSlice.actions
// export const { setTheme,setPlatform,setLanguage } = settingsSlice.actions