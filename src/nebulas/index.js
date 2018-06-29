import Neb from "nebulas";
import HttpRequest from "nebulas";
import NebPay from "nebpay.js";
var nebPay = new NebPay();
var neb = new Neb.Neb();
//var httpRequest = new HttpRequest.HttpRequest();
neb.setRequest(new HttpRequest.HttpRequest("http://localhost:8685"));
const dappAddress = "n1t1SnVVZuPXE5ZenJubsXxUrEUfhs3Dm6w";

export const register = (user, transStarted, transFinished) => {    
    const to = dappAddress;
    const value = "0";
    const callFunction = "register";
    const jsonParametersStr = JSON.stringify([user.languages, {"nick" : user.nick}]);
    const callArgs = jsonParametersStr;
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
            const hash_value = resp.txhash;    
            transStarted(hash_value);
            let reload_trans = setInterval(function(){
                neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                    const result_trans = receipt.status;        
                    if (result_trans == 1) {
                        console.log("success");
                        clearInterval(reload_trans); 
                        transFinished();  
                    } else if (result_trans == 2) {
                        console.log("pending");
                    } else {
                        console.log("fail")
                    }
            })}, 1000);
            
    // const commprojects = [
    //     {id: 989, source: 'en', target: 'fr', strings: ['bark','bite','wag']},
    //     {id: 899, source: 'en', target: 'es', strings: ['find','ignore','decide']}
    // ];
    // transStarted('udshsdiuhsuhds');
    // setTimeout(
    //     ()=> {
    //         localStorage.setItem('user',JSON.stringify(user));
    //         localStorage.setItem('projects',JSON.stringify([]));
    //         localStorage.setItem('commprojects',JSON.stringify(commprojects));
    //         transFinished();         

        }
    });
}
    //localStorage.setItem('user',JSON.stringify(user));
    //callback(); 

export const getUser = callback => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "getUser";
    const callArgs = "[]"; 
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
        qrcode: {showQRCode: false},
        listener:      function (serialNumber, resp) {
            console.log(resp);
            if (resp.result != 'null' && resp.execute_err === '') {
                var result = JSON.parse(resp.result);
                const user = {"nick": result.props.nick, languages: result.languages};
                console.log("--------------bbb");
                console.log(user);
                callback(user);
            } else {
                callback(null);
            }    
    }});
};

export const unregister = callback => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "unregister";
    const jsonParametersStr = JSON.stringify([]);
    const callArgs = jsonParametersStr;
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
            
                console.log("------------------");
                console.log(resp);
                const hash_value = resp.txhash;    
                let reload_trans = setInterval(function(){
                    neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                        const result_trans = receipt.status;        
                        if (result_trans == 1) {
                            console.log("success");
                            clearInterval(reload_trans); 
                            callback();  
                        } else if (result_trans == 2) {
                            console.log("pending");
                        } else {
                            console.log("fail")
                        }
                })}, 1000);
                
        }
    });
}
    


export const getUserProjects = callback => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "getUser";
    const callArgs = "[]"; 
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
        qrcode: {showQRCode: false},
        listener:      function (serialNumber, resp) {
            console.log(resp);
            if (resp.result != 'null') {
                var result = JSON.parse(resp.result);
                console.log("----------HTT");
                console.log(result.projects);
                let outProjects = [];
                for (let i=0; i<result.projects.length; ++i) {
                    const proj = result.projects[i];
                    outProjects.push({id: proj.id, source: proj.sourceLanguage, target: proj.targetLanguage, strings: proj.stringIds});
                }
                callback(outProjects);
            } else {
                callback(null);
            }
    }});
    
    // setTimeout(
    //     () => {
    //         let projects = JSON.parse(localStorage.getItem('projects'));
    //         callback(projects);        
    //     }
    // , 900);
}

export const getCommunityProjects = callback => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "getProjectsForUser";
    const callArgs = "[]"; 
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
        qrcode: {showQRCode: false},
        listener:      function (serialNumber, resp) {
            console.log(resp);
            if (resp.result != 'null') {
                var result = JSON.parse(resp.result);
                console.log("----------HTT");
                console.log(result);
                let outProjects = [];
                for (let i=0; i<result.length; ++i) {
                    const proj = result[i];
                    outProjects.push({id: proj.id, source: proj.sourceLanguage, target: proj.targetLanguage, strings: proj.stringIds});
                }
                callback(outProjects);
            } else {
                callback(null);
            }
    }});
    // setTimeout(
    //     () => {
    //         let projects = JSON.parse(localStorage.getItem('commprojects'));
    //         callback(projects);        
    //     }
    // , 900);
}

export const submitNew = (source, target, strings, callback) => {
    var to = dappAddress;
    var value = "0";
    var callFunction = "addTranslationProject";
    var jsonProjectDetails = JSON.stringify({});
    
    var callArgs = "[\"" + source + "\",\"" + target + "\"," + JSON.stringify(strings) + "," + jsonProjectDetails + "]";
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
            
            console.log("------------------");
            console.log(resp);
            const hash_value = resp.txhash;    
            let reload_trans = setInterval(function(){
                neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                    const result_trans = receipt.status;        
                    if (result_trans == 1) {
                        console.log("success");
                        clearInterval(reload_trans); 
                        getUserProjects(callback);  
                    } else if (result_trans == 2) {
                        console.log("pending");
                    } else {
                        console.log("fail")
                    }
            })}, 1000);
            
    }});
    // let projects = JSON.parse(localStorage.getItem('projects'));
    // const id = Date.now();
    // setTimeout(
    //     () => {
    //         projects.push({id, source, target, strings});
    //         localStorage.setItem('projects',JSON.stringify(projects));
    //         callback(projects);
    //     }
    // , 3300);
}