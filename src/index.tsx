import React from 'react'
import ReactDOM from 'react-dom'
import App from './containers/App'
import reportWebVitals from './reportWebVitals'

var printedToConsole = false

ReactDOM.render(
    <React.StrictMode>
        <App />
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
