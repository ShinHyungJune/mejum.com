import {combineReducers} from "redux";
import commonReducers from './commonReducers';
import groupReducers from './groupReducers';

export default combineReducers({
    commonStates: commonReducers,
    groupStates: groupReducers,
})
