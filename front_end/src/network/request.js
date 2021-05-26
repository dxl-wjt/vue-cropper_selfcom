import {request} from './base'

export async function uploadimg(data) {
  return request({
    method:"POST",
    url:'/',
    data
  })
}