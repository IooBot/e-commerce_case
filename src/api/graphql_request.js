import { request } from 'graphql-request'
import URL from './url_config'


export const graphqls=(schema,variables)=>{
   
    //console.log(URL.HTTP_DATA_URL)
    const http_request=URL.HTTP_DATA_URL
      
    return request(http_request, schema,variables).then(data =>data).catch(data=>data)
    
}

