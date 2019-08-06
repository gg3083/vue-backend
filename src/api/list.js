import config from '../../env/config'
import request from '@/utils/request'

export function getList(param) {
    return request({
        url: config.BASE_API+'project/list',
        method: 'get',
        params: param
    })
}
