import * as types from '../actions/types';


/*const initialState = () => {
    const token = localStorage.getItem('token');
    const userId = localStorage.getItem('userId');
    const expirationDate = localStorage.getItem('expirationDate');
    return {
      token: token,
      userId: userId, // using email for login
      expirationDate: expirationDate,
      error: null, // response message
      loading: false,
      authRedirectPath: '/',
    };
  };*/
let initState = {
    token: localStorage.getItem('token'),
    user: null,
    isAuth: false,
    error: null,

    userId:localStorage.getItem('userId'), // using email for login
    expirationDate: localStorage.getItem('expirationDate'),
    loading: false,
    authRedirectPath: '/',

}
const AuthReducer = (state = initState, action) => {
    switch (action.type) {
        case types.AUTH_REQUEST:
            return { ...state, loading: true, error: null };
        case types.AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                userId: action.payload.userId,
                expirationDate: action.payload.expirationDate,
                loading: false,
                error: null,
            };
        case types.LOAD_USER_SUCCESS:
            return {
                ...state,
                user: action.payload,
                error: null,
            }
        case types.AUTH_FAIL:
            const error = action.payload.error || { message: action.payload.message };
            //2nd one is network or server down errors
            return {
                ...state,
                loading: false,
                error: error,
            };
        case types.AUTH_LOGOUT:
            return {
                ...state,
                token: null,
                userId: null,
                expirationDate: '',
            };




     ///////////////////////////////       
        case types.LOGIN_SUCCESS:
        case types.REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token);
            return {
                ...state,
                token: action.payload.token,
                isAuth: true,
                error: null,

            };
        case types.LOGIN_FAIL:
        case types.LOAD_USER_FAIL:
        case types.REGISTER_FAIL:
            localStorage.removeItem('token');
            return {
                ...state,
                isAuth: false,
                error: action.payload,

            };
        case types.LOGOUT:
            localStorage.removeItem('token');
            return {
                isAuth: false,
                error: null,
                user: null,
            };
        default:
            return state;
    }
}
export default AuthReducer;