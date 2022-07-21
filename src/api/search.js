import request from '@/utils/request'
// 搜索建议
export const SearchSuggestions = (q) => {
  return request({
    url: '/v1_0/suggestion',
    params: {
      q
    }
  })
}
// 搜索结果
export const SearchResult = (q) => {
  return request({
    url: '/v1_0/search',
    params: {
      query: {
        page: 1,
        per_page: 10,
        q
      }
    }
  })
}
