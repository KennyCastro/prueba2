import {Types} from "./ConstantTypes"

export interface AccionType{
    type: string,
    payload: any,
}
export default (state: any, action: AccionType)=>{
    switch(action.type){
        case Types.SEARCHBARVISIBLE: {
            return {
                ...state,
                SearchBarVisible: action.payload
            }
        }
        default: {
            return state;
        }
    }
}