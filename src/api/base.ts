import { ApisauceInstance, create } from 'apisauce'

const apiBase: ApisauceInstance = create({
    baseURL: process.env.REACT_APP_API_ROOT,
    headers: {'Content-Type': 'application/json'}
})

export default apiBase
