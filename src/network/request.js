import axios from "axios";
import Vue from "vue";
const http = axios.create({
  baseURL: "http://kumanxuan1.f3322.net:8001/",
  timeout: 5000,
});

//请求拦截
http.interceptors.request.use(
  (config) => {
    //验证token信息
    let token = localStorage.getItem("token");
    config.headers["X-Nideshop-Token"] = token;
    return config;
  },
  (err) => err
);
//响应拦截
http.interceptors.response.use(
  (res) => {
    return res.data;
  },
  (err) => {
    return "响应出错了" + err;
  }
);

export default http;

// let btn=document.querySelector('.btnContent')
// btn.onclick=fn
// function fn(){
//   console.log('aaa')
// }
// setInterval(()=>{
//   fn()
// },1000)
