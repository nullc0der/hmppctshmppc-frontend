import React from 'react'
import ReactDOM from 'react-dom'

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

import { MatomoProvider, createInstance } from '@datapunt/matomo-tracker-react'

import App from './containers/App'
import reportWebVitals from './reportWebVitals'

var printedToConsole = false

if (process.env.NODE_ENV === 'production') {
    Sentry.init({
        dsn: process.env.REACT_APP_SENTRY_DSN,
        integrations: [new Integrations.BrowserTracing()],

        // Set tracesSampleRate to 1.0 to capture 100%
        // of transactions for performance monitoring.
        // We recommend adjusting this value in production
        tracesSampleRate: 1.0,
    })
}

const instance = createInstance({
    urlBase: 'https://matomo.ekata.io',
    siteId: Number(process.env.REACT_APP_MATOMO_SITE_ID),
    disabled: process.env.NODE_ENV !== 'production', // optional, false by default. Makes all tracking calls no-ops if set to true.
})

ReactDOM.render(
    <React.StrictMode>
        <MatomoProvider value={instance}>
            <App />
        </MatomoProvider>
    </React.StrictMode>,
    document.getElementById('root')
)

function printToConsole() {
    if (!printedToConsole) {
        console.log(
            '%cHello tinkerer, nice to see you here, have fun!!',
            'color: green; font-size: 40px'
        )
        printedToConsole = true
    }
}

printToConsole()

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
