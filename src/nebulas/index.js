

export const register = (user, callback) => {
    localStorage.setItem('user',JSON.stringify(user));
    callback(); 
};

export const getUser = callback => {
    //let user = null;
    let user = JSON.parse(localStorage.getItem('user'));
    if(user) user = Object.keys(user).length ? user : null;
    //let user = {nick: 'Willi', langauges:['en']};
    callback(user);
};

export const unregister = callback => {
    localStorage.removeItem('user');
    callback();
}