export const LoginStart = (userCredentials) => ({
    type: "LOGIN_START",
});

export const LoginSucces = (user) => ({
    type: "LOGIN_SUCCES",
    payload: user
});

export const LoginFailed = (error) => ({
    type: "LOGIN_FAILED",
    payload: error
});

export const Follow = (idUser) => ({
    type: "FOLLOW",
    payload: idUser
});

export const Unfollow = (idUser) => ({
    type: "UNFOLLOW",
    payload: idUser
});
export const Update = (user) => ({
    type: "UPDATE",
    payload: user
});
