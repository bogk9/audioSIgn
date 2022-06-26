const initialState = {
    privateKey: "",
    publicKey: "",
    sign: ""
}


export const appReducer = (state = initialState, action) => {
    switch(action.type){
        case 'SET_PUBLIC_KEY':
                return {
                    ...state, 
                    publicKey: action.payload
                }
        case 'SET_PRIVATE_KEY':
                return {
                    ...state,
                    privateKey: action.payload
                }
        case "SET_SIGN":
                return {
                    ...state,
                    sign: action.payload
                }
        case "SET_KEYS": 
                return {
                    ...state,
                    privateKey: action.payload.privateKey,
                    publicKey: action.payload.publicKey
                }
        default:
                return {
                    ...state
                }
    }
}