

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