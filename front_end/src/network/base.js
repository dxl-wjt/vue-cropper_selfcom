import axios from 'axios'

//封装request函数：避免依赖
export function request(config) {
  //创建axios实例
  const instance = axios.create({
    baseURL:'http://localhost:8081',
    timeout:5000
  })

  //axios的拦截器
  instance.interceptors.request.use(
    config => config
  )
  instance.interceptors.response.use(
    res => res.data,
    err => console.log(err)
  )

  return instance(config)
}