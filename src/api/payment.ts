import apiBase from "api/base";

type initiatePaymentData = {
    currency: string
}

type checkPaymentStatusData = {
    payment_id: string
}

export const initiatePayment = (data: initiatePaymentData) => {
    const url: string = '/initiatepayment/'
    return apiBase.post(url, data)
}

export const checkPaymentStatus = (data: checkPaymentStatusData) => {
    const url: string = '/checkpaymentcompleted/'
    return apiBase.post(url, data)
}
