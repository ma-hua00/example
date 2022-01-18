import request from "@src/utils/request";

export function getList() {
    return request({
        url: '/artist/list',
        method: 'get'
    })
}
