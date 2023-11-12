const { request } = require('@/utils')

export function getChannelAPI() {
  return request({
    url: '/channels',
    method: 'GET',
  })
}
