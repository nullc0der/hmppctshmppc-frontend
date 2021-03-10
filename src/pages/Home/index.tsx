import React, { useState } from 'react'
import classnames from 'classnames'

import Header from 'components/Header'
import Stats from 'components/Stats'
import About from 'components/About'
import Footer from 'components/Footer'

import s from './Home.module.scss'

const Home = () => {
    const [showStat, setShowStat] = useState(false)
    const [showPaymentDialog, setShowPaymentDialog] = useState(false)
    const handlePaymentDialogClose = () => setShowPaymentDialog(false)
    const handlePaymentDialogShow = () => setShowPaymentDialog(true)
    const cx: string = classnames(s.container)

    return (
        <div className={cx}>
            <div className="header-section">
                <Header
                    showPaymentDialog={showPaymentDialog}
                    handlePaymentDialogClose={handlePaymentDialogClose}
                    handlePaymentDialogShow={handlePaymentDialogShow}
                    setShowStat={() => setShowStat(true)}
                />
            </div>
            <div className="stats-section">
                <Stats
                    showStat={showStat}
                    handlePaymentDialogShow={handlePaymentDialogShow}
                />
            </div>
            <div className="about-section">
                <About />
            </div>
            <div className="footer-section">
                <Footer />
            </div>
        </div>
    )
}

export default Home
