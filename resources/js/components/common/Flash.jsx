import React, {useEffect, useState} from 'react';
import {setFlash} from "../../actions/commonActions";
import {connect} from 'react-redux';

const Flash = ({flash, setFlash}) => {
    let commonClass = "flash-box animated bg-primary";
    let showClassName = commonClass + " fadeInUp";
    let hideClassName = commonClass + " fadeOutDown";
    let [className, setClassName] = useState(showClassName);
    let timer = null;

    useEffect(() => {
        
        setClassName(showClassName);

        timer = setTimeout(() => {
            setClassName(hideClassName);

            setTimeout(() => setFlash(null), 500);
        }, 4000);
    
        return () => {
            clearTimeout(timer);
        };
    }, [flash]);

    return flash ? (
        <div className={className}>{flash}</div>
    ) : null;

};

const mapState = (state) => {
    return {
        flash: state.commonStates.flash
    };
};

const mapDispatch = (dispatch) => {
    return {
        setFlash: (data) => {
            dispatch(setFlash(data));
        }
    }
};
export default connect(mapState, mapDispatch)(Flash);
