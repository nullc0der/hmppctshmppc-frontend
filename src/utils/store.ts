import { PaymentInfo, AccessToken } from "utils/types"

function checkLocalStorageAvailable() {
    var storage
    try {
        storage = window.localStorage
        storage.setItem('data', '__local_storage_test_data__')
        storage.removeItem('data')
        return true
    }
    catch (e) {
        return (
            e instanceof DOMException &&
            // everything except Firefox
            (e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            storage &&
            storage.length !== 0
        )
    }
}

function saveToLocalStorage(key: string, value: string) {
    if (checkLocalStorageAvailable()) {
        localStorage.setItem(key, value)
    }
}

function getFromLocalStorage(key: string) {
    if (checkLocalStorageAvailable()) {
        return localStorage.getItem(key) || ''
    }
    return ''
}

function removeFromLocalStorage(key: string) {
    if (checkLocalStorageAvailable()) {
        localStorage.removeItem(key)
    }
}

export function clearLocalStorage() {
    if (checkLocalStorageAvailable()) {
        localStorage.clear()
    }
}

export function getPaymentInfo(): PaymentInfo {
    const paymentInfo = getFromLocalStorage('payment_info')
    return paymentInfo[0] === '{' ? JSON.parse(paymentInfo) : {}
}

export function setPaymentInfo(paymentInfo: PaymentInfo) {
    saveToLocalStorage('payment_info', JSON.stringify(paymentInfo))
}

export function removePaymentInfo() {
    removeFromLocalStorage('payment_info')
}

export function getAccessToken(): AccessToken {
    const accessToken = getFromLocalStorage('access_token')
    return accessToken[0] === '{'? JSON.parse(accessToken) : {}
}

export function setAccessToken(accessToken: AccessToken) {
    saveToLocalStorage('access_token', JSON.stringify(accessToken))
}

export function removeAccessToken() {
    removeFromLocalStorage('access_token')
}
