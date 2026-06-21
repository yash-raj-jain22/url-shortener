import axiosInstance from "../utils/axiosinstance"


export const createShortUrl = async (longUrl) => {
    const {data} = await axiosInstance.post('/api/create', { url: longUrl.trim() })
    return data
}