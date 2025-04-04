export const socket = async () => {
  const token = localStorage.getItem('access-token')
  console.log(token)

  return new WebSocket('https://inctagram.work', token)
}

// const queryParams = {
//   query: {
//     accessToken: 'your_access_token_here',
//   },
// }
// io('https://inctagram.work', queryParams)
