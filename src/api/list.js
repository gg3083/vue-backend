import config from '../../env/config'
import request from '@/utils/request'

export function getList(param) {
    return request({
        url: config.BASE_API+'project/list',
        method: 'get',
        params: param
    })
}

export function get(param) {
    return request({
        url: config.BASE_API+'project/get',
        method: 'get',
        params: param
    })
}
export function add(param) {
    return request({
        url: config.BASE_API+'project/add',
        method: 'post',
        params: param
    })
}
export function update(param) {
    return request({
        url: config.BASE_API+'project/update',
        method: 'post',
        params: param
    })
}
export function del(param) {
    return request({
        url: config.BASE_API+'project/delete',
        method: 'post',
        params: param
    })
}