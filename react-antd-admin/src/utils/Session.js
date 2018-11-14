import AppData from '../AppData';

const LOGIN_COOKIE_NAME = 'sessionId';

export function isAuthenticated() {
    console.log("isAuthenticated:" + (AppData.sellerInfo != null));
    return AppData.sellerInfo != null;
    //return _getCookie(LOGIN_COOKIE_NAME)
}

//保存登录的Cookie
export function saveLoginCookie(token) {
    _setCookie(LOGIN_COOKIE_NAME, token);
}

//注销
export function logout() {
    _setCookie(LOGIN_COOKIE_NAME, '', 0);
}

//获取保存的token
export function getLoginCookie() {
    return _getCookie(LOGIN_COOKIE_NAME);
}

function _getCookie(name) {
    let start, end;
    console.log("document.cookie:" + document.cookie);
    if (document.cookie.length > 0) {
        start = document.cookie.indexOf(name + '=');
        if (start !== -1) {
            start = start + name.length + 1;
            end = document.cookie.indexOf(';', start);
            if (end === -1) {
                end = document.cookie.length
            }
            return decodeURIComponent(document.cookie.substring(start, end))
        }
    }
    return ''
}

function _setCookie(name, value, expire) {
    let date = new Date();
    date.setDate(date.getDate() + expire);
    document.cookie = name + '=' + encodeURIComponent(value) + '; path=/' +
        (expire ? ';expires=' + date.toUTCString() : '')
}