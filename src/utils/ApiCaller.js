import {BASE_URL,HEADER_DATA} from './baseUrl'


export default (endpoint, method = "get", body, headers = HEADER_DATA) =>{
  console.log(body,"------bodyyyyyyy")
  console.log(endpoint)
 return (fetch(`${BASE_URL}${endpoint}`, {
    headers,
    method,
    body: JSON.stringify(body),
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      }else{
        return false;
      }
      // if (response.status === 201) {
      //   return response.json();
      // }

      // return response;
    })
    .catch(() => ({
      status: 100,
      message: "Ooops network error! Check your net connection",
    })))
}
 