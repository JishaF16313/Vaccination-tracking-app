import axios from 'axios';

axios.defaults.baseURL = 'https://fakestoreapi.com';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

// API Servies Call
//   API_GET_SERVICE('/products',param).then((res)=>{
//   console.log("result",res)
//  });
 
//  API_POST_SERVICE('/products/1',param).then((res)=>{
//   console.log("result",res)
//  });

// Response Schema
// The response for a request contains the following information.
// {
//     // `data` is the response that was provided by the server
//     data: {},
  
//     // `status` is the HTTP status code from the server response
//     status: 200,
  
//     // `statusText` is the HTTP status message from the server response
//     statusText: 'OK',
  
//     // `headers` the HTTP headers that the server responded with
//     // All header names are lower cased and can be accessed using the bracket notation.
//     // Example: `response.headers['content-type']`
//     headers: {},
  
//     // `config` is the config that was provided to `axios` for the request
//     config: {},
  
//     // `request` is the request that generated this response
//     // It is the last ClientRequest instance in node.js (in redirects)
//     // and an XMLHttpRequest instance in the browser
//     request: {}
//   }

export const API_GET_SERVICE = async (url,config) => 
{
    try {
    const res = await axios.get(url);
    return res;
    }
    catch (error) {
        return error;
    }
}

export const API_POST_SERVICE = async (url,param,config) => 
{
    try {
    const res = await axios.post(url,param);
    return res.data;
    }
    catch (error) {
        return error;
    }
}


export const API_PUT_SERVICE = async (url,param,config) => 
{
    try {
        const res = await axios.put(url,param);
        return res;
        }
        catch (error) {
            throw error.response.data;
        }
}

export const API_DELETE_SERVICE = async (url,config) => 
{
    try {
        const res = await axios.delete(url);
        return res;
        }
        catch (error) {
            return error;
        }
}

