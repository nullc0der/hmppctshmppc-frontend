import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import classnames from 'classnames'

import s from './Stats.module.scss'

type StatsProps = {
    showStat: boolean
    handlePaymentDialogShow: () => void
    className?: string
}

const data = {
    labels: ['ETH', 'BTC', 'XMR', 'ADA', 'DOGE'],
    datasets: [
        {
            data: [3, 5, 3, 5, 10],
            backgroundColor: [
                'rgb(50, 179, 136)',
                'rgb(249, 113, 133)',
                'rgb(134, 117, 191)',
                'rgb(60, 152, 223)',
                'rgb(247, 190, 80)',
            ],
            borderColor: [],
            borderWidth: 1,
        },
    ],
}

const DoughnutChart = ({
    showStat,
    className,
    handlePaymentDialogShow,
}: StatsProps) => {
    const cx: string = classnames(s.container, className)

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
                        data={data}
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
                            <p>MM/DD/YYYY ##:##:## UTC</p>
                            <p>Total Payments Sent: 0</p>
                        </div>
                        <div className="share-btn">
                            <button className="btn btn-info">
                                <i className="fa fa-twitter mr-2"></i>Share
                            </button>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default DoughnutChart
