import apiBase from 'api/base'

export const initiatePayment = () => {
    const url: string = '/initiatepayment/'
    return apiBase.post(url)
}

export const postPaymentSuccess = (data: any) => {
    const url: string = '/postpaymentsuccess/'
    return apiBase.post(url, data)
}
