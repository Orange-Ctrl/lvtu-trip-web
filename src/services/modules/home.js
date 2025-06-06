import hyRequest from "../request";
export function getHotSuggests(){
  return hyRequest
  .get({
    url: "/home/hotSuggests",
  })
}

export function getCategries(){
  return hyRequest
  .get({
    url: "/home/categories",
  })
}

export function getHouselist(){
  return hyRequest
  .get({
    url: "/home/houselist",
    params:{
      page:1
    }
  })
}
