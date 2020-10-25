// 1、导入axios
import Axios from 'axios'

// 2、抛出网络请求接口
export function request(config) {
  // 3、创建axios实例
  const instance = Axios.create({
    // 基础路径
    baseURL: 'http://123.207.32.32:8000',
    // 创建配置
    timeout: 5000
  })
  // 请求拦截
  // instance.interceptors.request.use(
  //   config=>{
  //     // 操作拦截数据
  //     console.log(config,'请求拦截');
  //     // 将操作完成的数据返回至请求
  //     return config
  //   },
  //   err=>{
  //     console.log(err,'请求拦截');
  //     return err
  //   }
  // )

  // // 响应拦截
  // instance.interceptors.response.use(
  //   config =>{
  //     // 操作拦截数据
  //     console.log(config,'响应拦截');
  //     // 将操作完成的数据返回至请求
  //     return config
  //   },
  //   err=>{
  //     console.log(err,'响应拦截');
  //     return err
  //   }
  // )
  // 4、发送网络请求,这里返回的是一个promis对象
  return instance(config)
}