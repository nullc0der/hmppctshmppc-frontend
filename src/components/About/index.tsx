import React from 'react'
import classnames from 'classnames'

import s from './About.module.scss'

type AboutProps = {
    showStat: boolean
    handlePaymentDialogShow: () => void
    className?: string
}

const About = ({
    className,
    showStat,
    handlePaymentDialogShow,
}: AboutProps) => {
    const cx: string = classnames(s.container, className)

    return (
        <div className={cx}>
            {!showStat && (
                <div className="overlay">
                    <button
                        className="btn btn-header-red"
                        onClick={handlePaymentDialogShow}>
                        Send Payment
                    </button>
                </div>
            )}
            <h6>About</h6>
            <div className="d-none d-md-flex flex-md-column justify-content-md-center align-items-md-center">
                <p>
                    How many people paid crypto to see how many people paid
                    crypto
                </p>
                <p>is about a visualize fun way to see how many people paid</p>
                <p>crypto to see how many people paid crypto. This site was</p>
                <p>
                    inspired by doge coin, human creativity, humor, and most of
                </p>
                <p>all as a father dedicated to my little mountain.</p>
            </div>
            <div className="d-xs-block d-md-none">
                <p>
                    How many people paid crypto to see how many people paid
                    crypto is about a visualize fun way to see how many people
                    paid crypto to see how many people paid crypto. This site
                    was inspired by doge coin, human creativity, humor, and most
                    of all as a father dedicated to my little mountain.
                </p>
            </div>
        </div>
    )
}

export default About
