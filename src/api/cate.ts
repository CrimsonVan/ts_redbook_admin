import request from '../utils/request'
// 帖子接口
//获取所有帖子分类
export const getPostCateService = (obj: { pagenum: any; cate_name?: any; creater?: any }) =>
  request.post<any>('/cate/get', obj)
//新增帖子分类
export const addPostCateService = (obj: {
  cate_name: any
  creater: any
  creater_username: any
  creater_avatar: any
}) => request.post<any>('/cate/add', obj)
//修改帖子分类
export const updatePostCateService = (obj: { cate_name: any; cate_id: any }) =>
  request.post<any>('/cate/update', obj)
// //删除帖子
// export const delPostService = ({ id }: any) => request.post<any, any>('/post/del', { id })
// //修改帖子状态
// export const updatePostService = ({ id, status }: any) =>
//   request.post<any>('/post/updateStatus', { id, status })
