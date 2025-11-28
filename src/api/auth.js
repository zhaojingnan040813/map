import axios from 'axios'

const AUTH_CONFIG = {
    applicationid: 'b4a84eb9ba424344ae2018bfac4a315b',
    appkey: 'bb7b043421d2bb54506b7a0370ff629a',
    appsecret: '8da6af14c01a3289af3afe76c85b0f01',
    username: '18372153466'
}

export async function getToken() {
    try {
        const response = await axios.post('/api/appsheets/sheetapi/getUToken', AUTH_CONFIG)
        if (response.data && response.data.status === 'success' && response.data.result?.token) {
            const token = `Bearer ${response.data.result.token}`
            localStorage.setItem('Authorization', token)
            return token
        }
        throw new Error('获取 Token 失败')
    } catch (error) {
        console.error('获取 Token 失败:', error)
        throw error
    }
}

export function getStoredToken() {
    return localStorage.getItem('Authorization')
}
