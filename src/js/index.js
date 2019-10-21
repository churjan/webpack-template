import '../scss/main.scss'
$('#info').text(_.join([1, 2, 3], '***'))

// import axios from 'axios'
// axios.defaults.baseURL = 'http://localhost:3000'
// axios.get('/api/userinfo').then(res => {
//   console.log(res)
// })
if (module.hot) {
  console.log('当前环境支持热更新')
  // 实现热更新
  module.hot.accept(/* ... */)
  // ...
}
console.log('hello webpack')
