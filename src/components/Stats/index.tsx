import { useState, useEffect } from 'react'

import { Doughnut } from 'react-chartjs-2'
import classnames from 'classnames'
import get from 'lodash/get'

import { getStats } from 'api/stats'
import {
    getAccessToken,
    removeAccessToken,
    removePaymentInfo,
} from 'utils/store'

import s from './Stats.module.scss'

type StatsProps = {
    showStat: boolean
    handlePaymentDialogShow: () => void
    className?: string
}

const initialData = {
    labels: ['ETH', 'BTC', 'XMR', 'ADA', 'DOGE', 'DOT'],
    datasets: [
        {
            data: [3, 5, 3, 5, 10, 4],
            backgroundColor: [
                'rgb(50, 179, 136)',
                'rgb(249, 113, 133)',
                'rgb(134, 117, 191)',
                'rgb(60, 152, 223)',
                'rgb(247, 190, 80)',
                'rgb(51, 255, 189)',
            ],
            borderColor: [],
            borderWidth: 1,
        },
    ],
}

const shareButtonText = (): string => {
    const text =
        'I just paid #Crypto to see how many others paid crypto. See results for yourself here. \nhttps://howmanypeoplepaidcryptotoseehowmanypeoplepaidcrypto.com/\n@hmppctshmppc\n\n$btc $doge $xmr #cryptocurrency'
    return encodeURIComponent(text)
}

const Stats = ({
    showStat,
    className,
    handlePaymentDialogShow,
}: StatsProps) => {
    const [chartData, setChartData] = useState(initialData)
    const [totalPaymentCount, setTotalPaymentCount] = useState(0)
    const [statsCreatedOn, setStatsCreatedOn] = useState('')
    const cx: string = classnames(s.container, className)

    useEffect(() => {
        if (showStat) {
            const { access_token } = getAccessToken()
            getStats({ access_token }).then((response) => {
                if (response.ok) {
                    const stats = get(response.data, 'stats', {})
                    setChartData({
                        ...initialData,
                        datasets: [
                            {
                                ...initialData.datasets[0],
                                data: [
                                    get(stats, 'ethereum_payment_count', 0),
                                    get(stats, 'bitcoin_payment_count', 0),
                                    get(stats, 'monero_payment_count', 0),
                                    get(stats, 'cardano_payment_count', 0),
                                    get(stats, 'dogecoin_payment_count', 0),
                                    get(stats, 'polkadot_payment_count', 0),
                                ],
                            },
                        ],
                    })
                    setTotalPaymentCount(get(stats, 'total_payment_count', 0))
                    setStatsCreatedOn(get(response.data, 'created_on', ''))
                    removeAccessToken()
                    removePaymentInfo()
                }
            })
        }
    }, [showStat])

    return (
        <div className={cx}>
            {!showStat ? (
                <>
                    <div className="overlay">
                        <button
                            className="btn btn-header-red"
                            onClick={handlePaymentDialogShow}>
                            Send Crypto
                        </button>
                    </div>
                    <div className="overlay-removed">
                        <p>Nice try!! but that's not gonna work 😜</p>
                    </div>
                </>
            ) : (
                <>
                    <Doughnut
                        data={chartData}
                        options={{
                            responsive: true,
                            maintainAspectRatio: true,
                            legend: {
                                position: 'right',
                                labels: {
                                    usePointStyle: true,
                                },
                            },
                        }}
                    />
                    <div className="d-flex flex-horizontal justify-content-center align-items-center mt-4 stats-info">
                        <div className="stats-text mr-4">
                            <p>{new Date(statsCreatedOn).toUTCString()}</p>
                            <p>Total Payments Sent: {totalPaymentCount}</p>
                        </div>
                        <div className="share-btn">
                            <button className="btn btn-info">
                                {/* //TODO: Change the text and add URL */}
                                <a
                                    href={`https://twitter.com/intent/tweet?text=${shareButtonText()}`}
                                    target="_blank"
                                    rel="noreferrer">
                                    <i className="fa fa-twitter mr-2"></i>Share
                                </a>
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default Stats
