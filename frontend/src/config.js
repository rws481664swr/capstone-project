const {  API_URL} = process.env
export let BASE_URL = process.env.DEV_API || 'http://localhost:3001'
if(process.env.NODE_ENV === 'production') BASE_URL = API_URL
