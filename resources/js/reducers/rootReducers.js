import {combineReducers} from "redux";
import commonReducers from './commonReducers';
import targetReducers from './targetReducers';

export default combineReducers({
    commonStates: commonReducers,
    targetStates: targetReducers,
})
