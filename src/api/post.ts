import request from '../utils/request'
// 帖子接口
//获取所有帖子
export const getPostService = (obj: { pagenum: any; status?: any; nick_name?: any }) =>
  request.post<any>('/post/get', obj)
//删除帖子
export const delPostService = ({ id }: any) => request.post<any, any>('/post/del', { id })
//修改帖子状态
export const updatePostService = ({ id, status }: any) =>
  request.post<any>('/post/updateStatus', { id, status })
