

export const register = (user, transStarted, transFinished) => {
    const commprojects = [
        {id: 989, source: 'en', target: 'fr', strings: ['bark','bite','wag']},
        {id: 899, source: 'en', target: 'es', strings: ['find','ignore','decide']}
    ];
    transStarted('udshsdiuhsuhds');
    setTimeout(
        ()=> {
            localStorage.setItem('user',JSON.stringify(user));
            localStorage.setItem('projects',JSON.stringify([]));
            localStorage.setItem('commprojects',JSON.stringify(commprojects));
            transFinished();         
        }
        ,900
    );
};

export const getUser = callback => {
    let user = JSON.parse(localStorage.getItem('user'));
    if(user) user = Object.keys(user).length ? user : null;
    callback(user);
};

export const unregister = callback => {
    localStorage.removeItem('user');
    callback();
}

export const getUserProjects = callback => {
    setTimeout(
        () => {
            let projects = JSON.parse(localStorage.getItem('projects'));
            callback(projects);        
        }
    , 900);
}

export const getCommunityProjects = callback => {
    setTimeout(
        () => {
            let projects = JSON.parse(localStorage.getItem('commprojects'));
            callback(projects);        
        }
    , 900);
}

export const submitNew = (source, target, strings, callback) => {
    let projects = JSON.parse(localStorage.getItem('projects'));
    const id = Date.now();
    setTimeout(
        () => {
            projects.push({id, source, target, strings});
            localStorage.setItem('projects',JSON.stringify(projects));
            callback(projects);
        }
    , 3300);
}

export const getProject = (pid, callback) => {

    const project = {
        pid: 989,
        whoami: 33,
        source: 'en',
        target: 'fr',
        strings: {
            403: { 
                id: 403,
                text: 'Bird',
                transStrObjs: [{
                        text: 'Tsipor',
                        posVotes: { 33:true },
                        negVotes: { 38:true, 98:true }
                    }, {
                        text: 'Sus',
                        posVotes: { 38:true, 98:true, 989:true },
                        negVotes: { 99:true }
                    }]
            },
            388: {
                id: 388,
                text: 'Chipmunk',
                transStrObjs: [{
                        text: 'Snai',
                        posVotes: { 33:true },
                        negVotes: { 38:true, 98:true }
                    }, {
                        text: 'Pil',
                        posVotes: { 38:true, 98:true, 989:true },
                        negVotes: { 99:true }
                    }]
            }
        }
    };

    setTimeout( ()=> {
        callback(project);
    },900);
}



export const submitChanges = (changes, pid, callback) => {
    console.log("Here are the changes made:", changes, pid);
    setTimeout(
        () => {
            callback();
        }
    , 3300);
}