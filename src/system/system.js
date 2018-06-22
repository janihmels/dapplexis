import axios from 'axios';
import queryString from 'query-string';
import IS_LOCAL from "../config/"
//import base26 from 'base26';

export const callNapi = (rubric,call,input) => {
  const localHost='http://localhost:8080/';
  const productHost='https://tutnapi.appspot.com/';
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

export const callCurrinapi = (rubric,call,input) => {
  const thisHost = 'https://currinapi.appspot.com/';
  const requestData= {
    method: 'post',
    headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    url: thisHost+rubric+'/'+call,
    data: queryString.stringify(input)
  };
  const request=axios(requestData);
  return request;
}


/*
const base26 = {
    to: x => x,
    from: x=> x
};

export const ambassador = {
  encode: (running, active) => {
    const comp_aa = base26.to(378+8*active);
    const comp_bb = base26.to(running);
    return `${comp_aa}-${comp_bb}`.toUpperCase();
  },
  decode: (ambassador) => {
    const [learneridx, running] = ambassador.split('-').map( x=> base26.from(x.toLowerCase()));
    return [(learneridx-99)/33, running];
  }
}*/
