import axiosInstance from "../utils/axiosinstance"


export const createShortUrl = async (longUrl, customUrl=null) => {
    const {data} = await axiosInstance.post('/api/url/create', { url: longUrl.trim(), customUrl: customUrl?.trim() })
    return data
}


export const getShortUrls = async () => {
    const {data} = await axiosInstance.get('/api/url/get')
    return data
}

export const getShortUrl = async (shortUrl) => {
    const {data} = await axiosInstance.get(`/api/url/get/${shortUrl}`)
    return data
}

export const deleteShortUrl = async (shortUrl) => {
    const {data} = await axiosInstance.delete(`/api/url/delete/${shortUrl}`)
    return data
}