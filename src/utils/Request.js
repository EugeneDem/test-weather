import Axios from 'axios'

class Request {
  static getInstance() {
    Axios.defaults.withCredentials = true;
    return Request._instance = Request._instance || new Request(); 
  }
  constructor() {
    this.api = (process.env.VUE_APP_API_TEST_DOMAIN? 'http://' + process.env.VUE_APP_API_TEST_DOMAIN : window.location.origin) + process.env.VUE_APP_API_KEY
  }
  send ({ params = '', data = {}, timeout = 1000000, api = this.api, method = 'post', progressCallback = ()=>{}, responseType = 'json' }) {

    const requestParams = {
      method,
      url: api + params,
      data,
      timeout,
      onUploadProgress: progressCallback,
      responseType
    }

    return Axios(requestParams)
    .then(response => {
      return response
    }).catch( error => error)
  }
}

export default Request.getInstance()
