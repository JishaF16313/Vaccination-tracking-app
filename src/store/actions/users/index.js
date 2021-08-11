// Registration
export const USER_REGISTER_INIT = "USER_REGISTER_INIT"
export const USER_REGISTER_SUCCESS = "USER_REGISTER_SUCCESS"
export const USER_REGISTER_FAIL = "USER_REGISTER_FAIL"


export const userRegister = (response) => ({
    type: USER_REGISTER_INIT,
    payload: response
})

export const userRegisterFail = (response) => ({
    type: USER_REGISTER_FAIL,
    payload: response
})


