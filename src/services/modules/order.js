import hyRequest from '../request'

export function getOrderList(type) {
  return hyRequest.get({
    url: "/order/list",
    params: {
      type
    }
  })
}
