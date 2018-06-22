import axios from 'axios';
import queryString from 'query-string';
import IS_LOCAL from "../config/"

export default function callNapi(rubric,call,input) {
  const localHost='http://localhost:8080/';
  const productHost='https://tookeenapi.appspot.com/';
  const thisHost = (IS_LOCAL) ? localHost : productHost;

  const requestData= {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: thisHost+rubric+'/'+call,
    data: queryString.stringify(input)
  };
  const request=axios(requestData);
  return request;
}
