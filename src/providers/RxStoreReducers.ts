import { Action } from "@ngrx/store";

export const reducerActionTypes = {
    'SIGN_IN' : 'SIGN_IN',
    'SIGN_OUT' : 'SIGN_OUT',
    'CONSTRUCT_MENU' : 'CONSTRUCT_MENU' 
};

export function myAppReducer(state : any, action : Action){

    let newState = null;
    switch (action.type){
        case reducerActionTypes.SIGN_IN : 
            newState = {eve : action.type, user : action.payload};
            break;
        case reducerActionTypes.SIGN_OUT : 
            newState = {eve : action.type, user : null};
            break;
        case reducerActionTypes.CONSTRUCT_MENU :
            newState = {eve : action.type, userType : action.payload};
            break;
    }

    return newState;
}
