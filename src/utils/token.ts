export const getPersistToken = () => {
  let persist: any = localStorage.getItem('token')
  // return JSON.parse(JSON.parse(persist).todoStore).token
  return persist
}
