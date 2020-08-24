import store from './store';
import setUpInterceptor from './utilities/interceptors';
import {setPop, setFlash, setBlockedUrl, logout} from "./actions/commonActions";

if('serviceWorker' in navigator){
    navigator.serviceWorker.register("/sw.js", {scope: '.'})
        .then((response) => console.log("service worker registered", response))
        .catch((error) => console.log("service worker not registered", error));
}

setUpInterceptor();

window.store = store;

window.setPop = (name) => {
    store.dispatch(setPop(name));
};

window.logout = (name) => {
    store.dispatch(logout(name));
};

window.setFlash = (message) => {
    store.dispatch(setFlash(message));
};

window.setBlockedUrl = (url) => {
    store.dispatch(setBlockedUrl(url));
};

window.naver = {
    key:"gEf2Obm290rhS5luowhC",
    secret: "qy8flzFjTF",
    couldKey: "ue3zysm2ng",
    couldSecret: "RsUwfvXmRh3FZgyvwrLFJW8ToLd4vz7isBbPlwri",
    findWayDomain: "http://m.map.naver.com/route.nhn"
};
window.dataURLtoFile = (url, fileName) => {
    
    var arr = url.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);
    
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], fileName, {type:mime});
};

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./Index');
