export const setPrivateKey = (payload) => {
    return {
        type: "SET_PRIVATE_KEY",
        payload: payload
    }
}

export const setPublicKey = (payload) => {
    return {
        type: "SET_PUBLIC_KEY",
        payload: payload
    }
}

export const setKeys =  (payload) => {
    return{
        type: "SET_KEYS",
        payload: payload
    }
}

export const setSign = (payload) => {
    return {
        type: "SET_SIGN",
        payload: payload
    }
}

