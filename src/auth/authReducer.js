import { types } from "../types/types";
import {cerrarSesion} from '../api/auth'



export const authReducer = (state = {}, action) =>{

    switch (action.type) {
        case types.login:
            return {
                ...action.payload,
                logged:true
            }

            case types.logout:
                cerrarSesion()
                return {
                    logged: false
                }
            
    
        default:
            return state;
    }

}