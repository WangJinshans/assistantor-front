import Mock from 'mockjs'
import { base_url } from '@/common'

Mock.mock(`${base_url}/user/login`, 'post', ({body}) => {
    let result = {
        "code": 0,
        "message": "success",
        "data": {}
    }
    return result
  })
  