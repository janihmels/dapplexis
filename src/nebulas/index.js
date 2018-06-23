

export const register = (user, transStarted, transFinished) => {
    transStarted('udshsdiuhsuhds');
    setTimeout(
        ()=> {
            localStorage.setItem('user',JSON.stringify(user));
            transFinished();         
        }
        ,3000
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