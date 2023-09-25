//添加插件文件 plugins/axios.js
import axios from 'axios'
export default axios.create({
  baseURL: process.env.baseUrl
})