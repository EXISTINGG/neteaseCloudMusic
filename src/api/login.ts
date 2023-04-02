import {request, requests} from '@/utils/request'

//向外导出 API 函数
// 手机号登录
export const phoneLogin = (phone: number, psd: string) => {
  return request.get(encodeURIComponent(`/login/cellphone?phone=${phone}&password=${psd}`))
}
// 邮箱登录
export const emailLogin = (email: string, psd: string) => {
  return request.get(encodeURIComponent(`/login?email=${email}&password=${psd}`))
}
//生成key 时间戳timestamp
export const qrCodeLoginKey = (timestamp: number) => {
  return request.get(`/login/qr/key?timestamp=${timestamp}`)
}
// 二维码生成接口
export const qrCodeLoginImg = (key: string) => {
  return request.get(`/login/qr/create?qrimg=true&key=${key}`)
}
// 二维码检测扫码状态接口
export const qrCodeLoginCheck = (key: string,timestamp: number) => {
  return requests.get(`/login/qr/check?key=${key}&timestamp=${timestamp}`)
}
// 游客登录
export const guestUserLogin = () => {
  return request.get(`/register/anonimous`)
}
