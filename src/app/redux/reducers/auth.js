import { SET_AUTHED_USER, UNSET_AUTHED_USER } from "../actions/auth";

const authUser = (state = { authenticated: false }, action) => {
    switch (action.type) {
        case SET_AUTHED_USER:
            {
                return {...state, authenticated: true, data: action.user };
            }
        case UNSET_AUTHED_USER:
            {
                return {...state, authenticated: false, data: {} };
            }
        default:
            {
                return state;
            }
    }
};
export default authUser;