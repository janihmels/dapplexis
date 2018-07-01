import Neb from "nebulas";
import HttpRequest from "nebulas";
import NebPay from "nebpay.js";
var nebPay = new NebPay();
var neb = new Neb.Neb();
//var httpRequest = new HttpRequest.HttpRequest();
//neb.setRequest(new HttpRequest.HttpRequest("http://localhost:8685"));

neb.setRequest(new HttpRequest.HttpRequest("https://mainnet.nebulas.io")); //testneb1
const dappAddress = "n1rgYhizqJxTyeG5jY7CFBxXuy66UqwX9GG";

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
                        console.log("call to nebpay completed successfully");
                        clearInterval(reload_trans); 
                        transFinished();  
                    } else if (result_trans == 2) {
                        console.log("call to nebapy is pending");
                    } else {
                        console.log("call to nebpay failed")
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
            if (resp.result != 'null' && resp.execute_err === '') {
                var result = JSON.parse(resp.result);
                const user = {"nick": result.props.nick, languages: result.languages};
                callback(user);
            } else {
                callback(null);
            }    
    }});
    callback(null);
};

export const unregister = callback => {
    const to = dappAddress;
    const value = "0";
    const callFunction = "unregister";
    const jsonParametersStr = JSON.stringify([]);
    const callArgs = jsonParametersStr;
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
            
                const hash_value = resp.txhash;    
                let reload_trans = setInterval(function(){
                    neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                        const result_trans = receipt.status;        
                        if (result_trans == 1) {
                            console.log("call to nebpay completed successfully");
                            clearInterval(reload_trans); 
                            callback();  
                        } else if (result_trans == 2) {
                            console.log("call to nebpay is pending");
                        } else {
                            console.log("call to nebpay failed")
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
            if (resp.result != 'null') {
                var result = JSON.parse(resp.result);
                let outProjects = [];
                for (let i=0; i<result.projects.length; ++i) {
                    const proj = result.projects[i];
             
                    let numTranslated = 0;
                    for (let i=0; i<proj.stringIds.length; ++i){
                        let stringTranslations = proj.translationsArr[i];
                        // Iterate over all translation strings and check if one of them has positive vote count
                        for (let transStrId in stringTranslations) {
                            let [posVotes, negVotes] = stringTranslations[transStrId];
                            if (Object.keys(posVotes).length - Object.keys(negVotes).length > 0) {
                                numTranslated += 1;
                                break;
                            }
                        }
                    }
                    outProjects.push({id: proj.id, source: proj.sourceLanguage, target: proj.targetLanguage, strings: proj.stringIds, ntranslated: numTranslated});
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
            if (resp.result != 'null') {
                var result = JSON.parse(resp.result);
                let outProjects = [];
                for (let i=0; i<result.length; ++i) {
                    const proj = result[i];
                    let numTranslated = 0;
                    for (let i=0; i<proj.stringIds.length; ++i){
                        let stringTranslations = proj.translationsArr[i];
                        // Iterate over all translation strings and check if one of them has positive vote count
                        for (let transStrId in stringTranslations) {
                            let [posVotes, negVotes] = stringTranslations[transStrId];
                            if (Object.keys(posVotes).length - Object.keys(negVotes).length > 0) {
                                numTranslated += 1;
                                break;
                            }
                        }
                    }
                    
                    outProjects.push({id: proj.id, source: proj.sourceLanguage, target: proj.targetLanguage, strings: proj.stringIds, ntranslated: numTranslated});
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
            const hash_value = resp.txhash;    
            let reload_trans = setInterval(function(){
                neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                    const result_trans = receipt.status;        
                    if (result_trans == 1) {
                        console.log("call to nebpay completed successfully");
                        clearInterval(reload_trans); 
                        getUserProjects(callback);  
                    } else if (result_trans == 2) {
                        console.log("call to nebpay is pending");
                    } else {
                        console.log("call to nebpay failed")
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

export const getProject = (pid, callback) => {
    
  
    const to = dappAddress;
    const value = "0";
    const callFunction = "getProject";
    if(isNaN(pid)) {
        return;
    }
    const callArgs = "[" + pid + "]"; 
    nebPay.simulateCall(to, value, callFunction, callArgs, { 
        qrcode: {showQRCode: false},
        listener:      function (serialNumber, resp) {
            if (resp.result != 'null') {
                var result = JSON.parse(resp.result);
                let stringsDict = {};
                for (let i=0; i<result.stringObjs.length; ++i) {
                    let stringObjId = result.stringObjs[i].id;
                    let stringObj = result.stringObjs[i];
                    let newTransStringObj = [];
                    for (let key in stringObj.transStringObjs) {
                        if (stringObj.transStringObjs.hasOwnProperty(key)) {           
                            let [posVotes, negVotes] = stringObj.transStringObjs[key];
                            newTransStringObj.push({text: key, posVotes: posVotes, negVotes: negVotes})
                        }
                    }
                    stringObj.transStringObjs = newTransStringObj;
                    stringsDict[stringObjId] = stringObj;
                }
                let outProj = {pid: pid, 
                                whoami: result.whoami,
                                source: result.sourceLanguage,
                                target: result.targetLanguage,
                                strings: stringsDict}
                callback(outProj);
            } else {
                callback(null);
            }
    }});

    // const project = {
    //     pid: 989,
    //     whoami: 33,
    //     source: 'en',
    //     target: 'fr',
    //     strings: {
    //         403: { 
    //             id: 403,
    //             text: 'Bird',
    //             transStrObjs: [{
    //                     text: 'Tsipor',
    //                     posVotes: { 33:true },
    //                     negVotes: { 38:true, 98:true }
    //                 }, {
    //                     text: 'Sus',
    //                     posVotes: { 38:true, 98:true, 989:true },
    //                     negVotes: { 99:true }
    //                 }]
    //         },
    //         388: {
    //             id: 388,
    //             text: 'Chipmunk',
    //             transStrObjs: [{
    //                     text: 'Snai',
    //                     posVotes: { 33:true },
    //                     negVotes: { 38:true, 98:true }
    //                 }, {
    //                     text: 'Pil',
    //                     posVotes: { 38:true, 98:true, 989:true },
    //                     negVotes: { 99:true }
    //                 }]
    //         }
    //     }
    // };

    // setTimeout( ()=> {
    //     callback(project);
    // },900);
}



export const submitChanges = (changes, pid, callback) => {
    var to = dappAddress;
    var value = "0";
    var callFunction = "updateProjectStrings";
    
    
    var callArgs = JSON.stringify([pid, changes.ids, changes.meanings, changes.plusminus]);
    
    nebPay.call(to, value, callFunction, callArgs, {    
        listener: (serialNum, resp)=>{
            const hash_value = resp.txhash;    
            let reload_trans = setInterval(function(){
                neb.api.getTransactionReceipt({hash: hash_value}).then(function(receipt) {        
                    const result_trans = receipt.status;        
                    if (result_trans == 1) {
                        console.log("call to nebpay completed successfully");
                        clearInterval(reload_trans); 
                        callback();  
                    } else if (result_trans == 2) {
                        console.log("call to nebpay is pending");
                    } else {
                        console.log("call to nebpay failed");
                    }
            })}, 1000);
            
    }});
    // console.log("Here are the changes made:", changes);
    // setTimeout(
    //     () => {
    //         callback();
    //     }
    // , 3300);
}