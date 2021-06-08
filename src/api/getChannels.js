import axios from '@/api/axios'

export const getChannels = () => axios.post('/channels/get')