import axios from 'axios'

const TOKEN = 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIzOSIsImp0aSI6IjUxNTNiOWYyNDRiNWU5MGZiZDQwODA0NGQ1ZjM3ZWUwZWQwY2ZjYTJkNjliZjU2MjM5NmYwMTc5OTFlNTcxNTY0M2ViYzAzMDQyMjJiOGMwIiwiaWF0IjoxNzY0MjA3MjY1Ljk0MjEwMiwibmJmIjoxNzY0MjA3MjY1Ljk0MjEwNCwiZXhwIjoxNzY0ODEyMDY1Ljk0MTA3MSwic3ViIjoiMzMwIiwic2NvcGVzIjpbInBsYXRmb3JtIl19.hWg-HO3Nklhyb-q7eFnk91UjQl7_HOcOyuRf_XxDziBw8sXA4qbjVABARDD1CP0tP8w0WeAeGgcxiP5hwYp3vyJzHVkEup6Pleov7LfqQI6rkUkcszYVsxuyRWntSJ_o4fwMRMu3IdMlVWBHjJO0BkfuffgTFoS2ZM7J0yg1Ih8j68XYuMpZzGoOsqPBM5WCcKH1N8kXmITp7zNbdOmq5Izb1wYX-2Cs9tgYUfXl3WnhzNIXVVBegUxBEYep7rCfq_v4m_l4T2c4sSERJ6DIuEygNd1wy27FnbAabKy5qQariAbuVxKmiNh16hF_hhCF-YstPKfvqUfd-gJcdCkePuaPA2x2JfOiqxztxjBKj8jR9CKNXPRksHt0FGgCoLDtjlEp49ixKlBRMGGAVpX2dxSCnW1y7OQF2XE44OUZKsSRixI9q7m0sYmCvGUOdYlStNRDXByT_oJgsIKnjPb59Vdg_-02-FuVVN_zETZbY1eeAX0mQ8rad-lL3bNz6tyIsFYd4uzY_1TOety1LGo3sj07KKQerDXUJxFFCK9KQwbWI75j6U8WSDKtdC9jER3wj6wxH2GjvHPznC3fQsNb51HwOeE-RmqGqthT5d_r1qgQZxJ7JS-0L6j0hZHYPzgysu7kpQY-S9ueKFyw9m8n7CmpChZswTTv2f_OVqvjjik'

const request = axios.create({
  baseURL: '/api',
  timeout: 10000
})

request.interceptors.request.use(
  (config) => {
    config.headers['Authorization'] = TOKEN
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default request
