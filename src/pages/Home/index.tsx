import { useState, useEffect } from 'react'
import classnames from 'classnames'
import get from 'lodash/get'

import { useMatomo } from '@datapunt/matomo-tracker-react'

import Header from 'components/Header'
import Stats from 'components/Stats'
import About from 'components/About'
import Footer from 'components/Footer'
import EkataGPForm from 'components/EkataGP'

import { initiatePayment, postPaymentSuccess } from 'api/payment'
import { setAccessToken } from 'utils/store'

import s from './Home.module.scss'

const Home = () => {
    const [showStat, setShowStat] = useState(false)
    const [formID, setFormID] = useState('')

    const { trackEvent, trackPageView } = useMatomo()

    const handlePaymentDialogShow = () => {
        trackEvent({ category: 'Dialog', action: 'Open', name: 'Payment' })
        initiatePayment().then((response) => {
            if (response.ok) {
                setFormID(get(response.data, 'form_id', ''))
            }
        })
    }

    const onPaymentFormError = (data: any) => {
        console.log(data)
    }

    const onClosePaymentForm = (data: any) => {
        console.log(data)
    }

    const onSuccessPayment = (payload: any) => {
        postPaymentSuccess(payload).then((response) => {
            if (response.ok) {
                setAccessToken({
                    access_token: get(response.data, 'access_token', ''),
                })
                setShowStat(true)
            }
        })
    }

    useEffect(() => {
        trackPageView({})
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const cx: string = classnames(s.container)

    return (
        <div className={cx}>
            <div className="header-section">
                <Header handlePaymentDialogShow={handlePaymentDialogShow} />
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
            <EkataGPForm
                formID={formID}
                onError={onPaymentFormError}
                onCloseForm={onClosePaymentForm}
                onSuccess={onSuccessPayment}
            />
        </div>
    )
}

export default Home
