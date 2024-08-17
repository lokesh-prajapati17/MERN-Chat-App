const host = "http://localhost:7000"

export const AllApis = {
    registerApi:`${host}/api/auth/register`,
    loginApi:`${host}/api/auth/login`,
    avatarApi:`${host}/api/avatar`,
    allContacts:`${host}/api/allContact`,
    allProfiles: `${host}/api/avatars`,
    currentProfile:`${host}/api/avatars/id`,
    getUserProfile:`${host}/api/avatars`,
    updateUserProfile: `${host}/api/auth/update`,
    updateUserProfilePictureApi : `${host}/api/avatar`,
    sendMessageApi:`${host}/api/addmessage`,
    getAllMessageApi : `${host}/api/getmessage`
}