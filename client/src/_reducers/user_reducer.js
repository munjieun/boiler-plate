import {
    LOGIN_USER,
    REGISTER_USER,
    AUTH_USER
} from '../_actions/types';



export default function (state = {}, action) {
    switch (action.type) {
        case LOGIN_USER:
            return {...state, loginSuccess: action.payload} //...(스프레드 오퍼레이터) 위에 있는 state를 그대로 가져옴, 현재 빈 상태
            break;
        case REGISTER_USER:
            return {...state, register: action.payload} //action.payload는 서버에서 가져온 응답
            break;
        case AUTH_USER:
            return {...state, userData: action.payload} //auth로 부터 온 action.payload에 모든 유저의 정보가 담겨 있음
            break; 
        default:
            return state;
    }
}