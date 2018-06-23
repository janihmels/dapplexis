import Neb from "nebulas";
import HttpRequest from "nebulas";
import NebPay from "nebpay.js";
var nebPay = new NebPay();
var neb = new Neb.Neb();
//var httpRequest = new HttpRequest.HttpRequest();
neb.setRequest(new HttpRequest.HttpRequest("http://localhost:8685"));
const dappAddress = "n1pM1Zzmdby2MJG2iJd4EvgDd52tUaVcH4F";

export const register = (user, callback) => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "register";
    const jsonParametersStr = JSON.stringify([user.languages, {"nick" : user.nick}]);
    const callArgs = jsonParametersStr;
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
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
    
    //localStorage.setItem('user',JSON.stringify(user));
    //callback(); 
};

export const getUser = callback => {
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
                const user = {"nick": result.props.nick, languages: result.languages};
                callback(user);
            } else {
                callback(null);
            }
        
        
        
        // for (var i=0; i<result.projects.length; ++i) {
        //     var project = result.projects[i];
        //     console.log(project);
        //     $('#my_dapps tr:last').after('<tr><td>' + project.sourceLanguage + '</td><td>' + project.targetLanguage + '</td><td>' + project.id + '</td></tr>');
        // }
        
        
    }});
    //let user = null;
    //let user = JSON.parse(localStorage.getItem('user'));
    //if(user) user = Object.keys(user).length ? user : null;
    //let user = {nick: 'Willi', langauges:['en']};
    //callback(user);
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