import React, { useCallback } from 'react';
import _ from 'lodash'
import store from 'stores'
import { useAmmMap } from '../../../stores/Amm/AmmMap';
import {
    AmmDetail,
    CustomError,
    ErrorMap,
    myError,
    myLog,
    SagaStatus,
    TradeFloat,
} from '@loopring-web/common-resources';
import { useTokenMap } from '../../../stores/token';
import { useSocket } from '../../../stores/socket';
import { useTicker } from '../../../stores/ticker';
import { makeTickView } from '../../../hooks/help';
import { tickerService } from '../../../services/socket';
import { LoopringAPI } from '../../../api_wrapper';
import { WsTopicType } from 'loopring-sdk';

const RowConfig = {
    rowHeight:44,
    headerRowHeight:44,

}
// import { tickerService } from '../../../services/tickerService';
type Row<R> = AmmDetail<R> & { tradeFloat: TradeFloat }
export function useAmmMapUI<R extends { [ key: string ]: any }, I extends { [ key: string ]: any }>(
    // {pageSize}: { pageSize: number }
) {
    const [rawData, setRawData] = React.useState<Array<Row<R>> | []>([]);
    const [filteredData, setFilteredData] = React.useState<Array<Row<R>> | []>([])

    // const [page, setPage] = React.useState<number>(1);
    const {coinMap,marketArray} = useTokenMap();
    const nodeTimer = React.useRef<NodeJS.Timeout | -1>(-1);
    const [filterValue, setFilterValue] = React.useState('');
    const [tableHeight, setTableHeight] = React.useState(0)
    const {ammMap} = useAmmMap();
    const {tokenPrices} = store.getState().tokenPrices
    const {tickerMap,updateTickerSync, status: tickerStatus} = useTicker();
    const {sendSocketTopic, socketEnd} = useSocket();

    const subject = React.useMemo(() => tickerService.onSocket(), []);
    React.useEffect(() => {
        const subscription = subject.subscribe(({tickerMap}) => {
            if (tickerMap) {
                Reflect.ownKeys(tickerMap).forEach((key) => {
                    // let recommendationIndex = recommendedPairs.findIndex(ele => ele === key)
                    // if (recommendationIndex !== -1) {
                    //     // setRecommendations
                    //     updateRecommendation(recommendationIndex, tickerMap[ key as string ])
                    // }
                    //TODO update related row. use socket return
                })
            }
        });
        return () => subscription.unsubscribe();
    }, [subject]);
    React.useEffect(() => {
        socketSendTicker();
        return () => {
            socketEnd()
        }
    }, []);
    const socketSendTicker = React.useCallback(() => {
        sendSocketTopic({[ WsTopicType.ticker ]: marketArray});
    }, [])

    // const getRecommendPairs = React.useCallback(async () => {
    //     if (LoopringAPI.exchangeAPI) {
    //         try {
    //             const {recommended} = await LoopringAPI.exchangeAPI.getRecommendedMarkets()
    //             setRecommendedPairs(recommended)
    //             return recommended || []
    //         } catch (e) {
    //             myError(e)
    //         }
    //         return []
    //
    //     }
    // }, [setRecommendedPairs])


    const resetTableData = React.useCallback((tableData)=>{
        if (tokenPrices) {
            setFilteredData(tableData)
            setTableHeight(RowConfig.headerRowHeight + tableData.length * RowConfig.rowHeight )
        }
    },[setFilteredData, setTableHeight, tokenPrices])
    const updateRawData = React.useCallback((tickerMap) => {

        try {
            const _ammMap: any = _.cloneDeep(ammMap);
            if (_ammMap) {
                for (let tickerMapKey in tickerMap) {
                    if (_ammMap[ 'AMM-' + tickerMapKey ]) {
                        _ammMap[ 'AMM-' + tickerMapKey ].tradeFloat = {
                            ..._ammMap[ 'AMM-' + tickerMapKey ].tradeFloat,
                            ...tickerMap[ tickerMapKey ],
                            // APY: _ammMap['AMM-' + tickerMapKey ].APY
                        }
    
                    }
                }
                const rawData = Object.keys(_ammMap).map((ammKey: string) => {
                    const [_, coinA, coinB] = ammKey.split('-')
                    const realMarket = `${coinA}-${coinB}`
                    const _tickerMap = tickerMap[realMarket].__rawTicker__
                    const tickerFloat = makeTickView(_tickerMap ? _tickerMap : {})
                    
                    if (coinMap) {
                        _ammMap[ ammKey ][ 'coinAInfo' ] = coinMap[ _ammMap[ ammKey ][ 'coinA' ] ];
                        _ammMap[ ammKey ][ 'coinBInfo' ] = coinMap[ _ammMap[ ammKey ][ 'coinB' ] ];
                    }
                    return {
                        ..._ammMap[ ammKey ],
                        tradeFloat: {
                            ..._ammMap[ ammKey ].tradtradeFloat,
                            volume: tickerFloat?.volume || 0
                        }
                    };
                })
                setRawData(rawData)
                resetTableData(rawData)
            }
        } catch (error) {
            throw new CustomError({...ErrorMap.NO_TOKEN_MAP, options: error})
        }

    }, [ammMap]);
    const sortMethod = React.useCallback((_sortedRows,sortColumn)=>{
        myLog({filteredData})
        let _rawData:Row<R>[] = [];
        switch (sortColumn) {
            case 'pools':
                _rawData = filteredData.sort((a, b) => {
                    const valueA = a.coinAInfo.simpleName
                    const valueB = b.coinAInfo.simpleName
                    return valueA.localeCompare(valueB)
                })
                break;
            case 'liquidity':
                _rawData = filteredData.sort((a, b) => {
                    const valueA = a.amountDollar
                    const valueB = b.amountDollar
                    if (valueA && valueB) {
                        return valueB - valueA
                    }
                    if (valueA && !valueB) {
                        return -1
                    }
                    if (!valueA && valueB) {
                        return 1
                    }
                    return 0
                })
                break;
            case 'volume24':
                _rawData = filteredData.sort((a, b) => {
                    const priceDollarA = tokenPrices[a.coinAInfo.simpleName] || 0
                    const priceDollarB = tokenPrices[b.coinAInfo.simpleName] || 0
                    const valueA = (a.tradeFloat.volume || 0) * priceDollarA
                    const valueB = (b.tradeFloat.volume || 0) * priceDollarB
                    if (valueA && valueB) {
                        return valueB - valueA
                    }
                    if (valueA && !valueB) {
                        return -1
                    }
                    if (!valueA && valueB) {
                        return 1
                    }
                    return 0
                })
                break;
            default:
                _rawData = rawData
        }
        // resetTableData(_rawData)
        return _rawData;
    },[filteredData, rawData, tokenPrices])


    React.useEffect(() => {
        return () => {
            clearTimeout(nodeTimer.current as NodeJS.Timeout);
        }
    }, [nodeTimer.current]);


    React.useEffect(() => {
        if (tickerStatus === SagaStatus.UNSET) {
            updateRawData(tickerMap)
        }
    }, [tickerStatus]);

    const getFilteredData = React.useCallback((event) => {
        setFilterValue(event.currentTarget?.value);
        if(event.currentTarget?.value) {
            const _rawData =  rawData.filter(o => {
                const coinA = o.coinAInfo.name.toLowerCase()
                const coinB = o.coinBInfo.name.toLowerCase()
                const formattedValue = event.currentTarget?.value.toLowerCase()
                return coinA.includes(formattedValue) || coinB.includes(formattedValue)
            })
            resetTableData(_rawData)
        }else{
            resetTableData(rawData)
        }

    }, [rawData])
    return {
        // page,
        filterValue,
        tableHeight,
        getFilteredData,
        filteredData,
        // updateTickersUI,
        sortMethod,
    }
}
