import {
    loginUrl,
    userPublicUrl,
    notificationUrl,
    uploadImageUrl,
    getTodayTasksUrl
} from "./VfscUrl";
function getDefaultHeader() {
    let defaultHeader = {
        Accept: 'application/json',
        'Content-type': 'application/json',
    }
    return defaultHeader;
}

async function post(url, body) {
    try {
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);   
    }
}

async function get(url, accessToken) {
    try {
        let response = await fetch(url,{
            method: 'GET',
            headers: {
                Authorization: 'Bearer ' + accessToken
            },
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.log(error);
    }
}

async function postAccessToken(url, body, accessToken) {
    console.log("body hans", body);
    console.log("ace token", accessToken);
    try {
        let response = await fetch(url,{
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + accessToken,
                'Content-Type': 'multipart/form-data',
            },
            body: body
        });
        let responseJson = await response.json();
        return responseJson;
    } catch (error) {
        console.error(error);   
    }
}

async function loginApi(body) {
    let loginResponse = await post(loginUrl, body);
    return loginResponse;
}

async function getPublicUser(accessToken) {
    let userResponse = await get(userPublicUrl, accessToken);
    return userResponse;
}

async function getNotification(accessToken) {
    let notification = await get(notificationUrl, accessToken);
    return notification;
}

async function uploadImage(body, accessToken) {
    let imageUpload = await postAccessToken(uploadImageUrl, body, accessToken);
    return imageUpload;
}

async function remindWork(accessToken) {
    let remindWork = await get(getTodayTasksUrl, accessToken);
    return remindWork;
}

module.exports = {
    loginApi: loginApi,
    getPublicUser: getPublicUser,
    getNotification: getNotification,
    uploadImage: uploadImage,
    remindWork: remindWork,
}