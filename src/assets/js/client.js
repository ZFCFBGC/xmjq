import axios from "axios";
import Cookies from "js-cookie";
import qs from "qs";
import { Message } from "element-ui";
// 环境的切换路径处理函数
let filterUrl = (_url) => {
  let baseUrl;
  if (process.env.NODE_ENV === "development") {
    baseUrl = "api";
  } else {
    // baseUrl = "http://39.107.103.34:81/web_demo";
    baseUrl = "http://iotlink.gpsnow.net/web_demo";
  }
  if (_url && _url.startsWith("http")) {
    return _url;
  }
  return baseUrl + _url;
};

//设置请求超时时间单位ms
axios.defaults.timeout = 10000;

//post请求默认请求头设置
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded;charset=UTF-8";

//设置请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求前做些什么
    const token = Cookies.get("token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  },
  (err) => {
    // 在请求错误的时候的逻辑处理
    return Promise.reject(err);
  }
);

//设置响应拦截器
axios.interceptors.response.use(
  (data) => {
    if (data.status && data.status == 200 && data.data.status == "error") {
      Message.error({ message: data.data.msg });
      return;
    }
    return data;
  },
  (err) => {
    // if (err.response.status == 504 || err.response.status == 404) {
    //   Message.error({ message: "服务器错误" });
    // } else if (err.response.status == 403) {
    //   Message.error({ message: "权限不足,请联系管理员!" });
    // } else if (err.response.status == 401) {
    //   Message.error({
    //     message: "登录失效，请重新登录。3s后将自动跳转到登录页"
    //   });
    // } else {
    //   Message.error({ message: "未知错误!" });
    // }
    return Promise.reject(err);
  }
);

export default {
  /**
   * get方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @header {Object} header [请求头]
   */
  get(url, params = {}, header) {
    var api = url;
    var _header = header
      ? header
      : {
          "Content-Type": "application/json;charset=UTF-8",
        };
    if (Object.keys(params).length > 0) {
      api = Cookies.get("token") ? `${api}?token=${Cookies.get("token")}` : api;
      for (let key in params) {
        if (params[key] || params[key] === 0) {
          api = `${api}&${key}=${params[key]}`;
        }
      }
    } else {
      api = Cookies.get("token") ? `${api}?token=${Cookies.get("token")}` : api;
    }
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(api),
        method: "get",
        data: params,
        headers: _header,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  /**
   * post方法，对应get请求
   * @param {String} url [请求的url地址]
   * @param {Object} params [请求时携带的参数]
   * @header {Object} header [请求头]
   */
  post(url, params = {}, header) {
    if (Cookies.get("token")) {
      params.token = Cookies.get("token");
    }
    var _header = header
      ? header
      : {
          "Content-Type": "application/x-www-form-urlencoded",
        };
    return new Promise((resolve, reject) => {
      axios({
        url: filterUrl(url),
        method: "post",
        data: qs.stringify(params),
        headers: _header,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
  //文件表格下载
  downLoad(url, params = {}) {
    var baseUrl;
    if (process.env.NODE_ENV === "development") {
      baseUrl = "http://39.107.103.34:81/web_demo/"; //测试环境
    } else {
      baseUrl = "http://39.107.103.34:81/web_demo/"; //生产环境
    }
    var api = baseUrl + url;
    if (Object.keys(params).length > 0) {
      api = Cookies.get("token") ? `${api}?token=${Cookies.get("token")}` : api;
      for (let key in params) {
        if (params[key]) {
          api = `${api}&${key}=${params[key]}`;
        }
      }
    } else {
      api = Cookies.get("token") ? `${api}?token=${Cookies.get("token")}` : api;
    }
    window.location.href = api;
  },
  //上传接口
  upload(params = {}) {
    let baseUrl;
    console.log("params:", params);
    if (process.env.NODE_ENV === "development") {
      baseUrl = "http://39.107.103.34:81/web_demo/"; //测试环境
    } else {
      baseUrl = "http://39.107.103.34:81/web_demo/"; //生产环境
    }
    let headers = params.headers
      ? headers
      : {
          "Content-Type": "multipart/form-data",
        };
    return new Promise((reject, resolve) => {
      axios({
        url: params.url,
        method: params.method,
        data: params.data,
        headers: headers,
      })
        .then((res) => {
          resolve(res.data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  },
};
