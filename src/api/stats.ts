import apiBase from 'api/base'

type getStatsData = {
    access_token: string
}

export const getStats = (data: getStatsData) => {
    const url: string = '/getstats/'
    return apiBase.post(url, data)
}
