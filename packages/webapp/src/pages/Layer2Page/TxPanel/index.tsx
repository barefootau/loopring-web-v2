import React from 'react'
import { TransactionTable } from '@loopring-web/component-lib'
import { WithTranslation, withTranslation } from 'react-i18next'
import { StylePaper } from '../../styled'
import { useGetTxs } from './hooks'

const TxPanel = withTranslation('common')((rest:WithTranslation<'common'>) => {
    const container = React.useRef(null);
    const [pageSize, setPageSize] = React.useState(10);

    const { txs: txTableData } = useGetTxs()

    React.useEffect(() => {
        // @ts-ignore
        let height = container?.current?.offsetHeight;
        if (height) {
            setPageSize(Math.floor((height - 120) / 44) - 2);
        }
    }, [container, pageSize]);

    return (
        <StylePaper ref={container}>
            <div className="title">Transactions</div>
            <div className="tableWrapper">
                <TransactionTable {...{
                    rawData: txTableData,
                    pagination: {
                        pageSize: pageSize
                    },
                    showFilter: true,
                    ...rest
                }} />
            </div>
        </StylePaper>
    )
})

export default TxPanel
