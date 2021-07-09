import React, {useReducer} from "react";
import AppContext from "./AppContext";
import AppReducer , {AccionType} from "./AppReducer";
import {Types} from "./ConstantTypes";


const DataState = (props: any) => {
    const InitialState= {
        SearchBarVisible: false
    }

    const [state, dispacth] = useReducer(AppReducer, InitialState);
    const changeSearchBarVisble = (value: Boolean) => {
        dispacth({type: Types.SEARCHBARVISIBLE, payload: value});
    }
    return (
        <AppContext.Provider  value={{SearchBarVisible: state.SearchBarVisible, changeSearchBarVisble}}>
            {props.children}
        </AppContext.Provider>
    )
}
export default DataState;