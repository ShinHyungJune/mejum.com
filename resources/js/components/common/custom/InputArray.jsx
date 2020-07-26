import React, {useEffect, useState} from 'react';
import InputText from "../inputs/InputText";
import InputCheckbox from "../inputs/InputCheckbox";
import InputRadio from "../inputs/InputRadio";
import InputTags from "../inputs/InputTags";
import InputAvatar from "../inputs/InputAvatar";
import InputImage from "../inputs/InputImage";
import InputFile from "../inputs/InputFile";
import InputTextarea from "../inputs/InputTextarea";
import InputSelect from "../inputs/InputSelect";
import InputCodeEditor from "../inputs/InputCodeEditor";
import InputObject from "./InputObject";

const InputArray = ({form, setForm, el, mergeOnChange, children, defaultForm = {}}) => {
    let name = el.props.name;
    
    // 자식이 1개만 있을 때
    if(!Array.isArray(children))
        children = [children];
    
    let controlStates = children.map((el,index) => useState({}));

    useEffect(() => {
        form = {...form, [name] : controlStates.map(controlState => controlState[0])};
        
        setForm({
            ...form,
            [name] : controlStates.map(controlState => controlState[0])
        });
    }, []);
    
    const changeForm = (state, index) => {
        form[name][index] = state;
        
        setForm(form);
    };
    
    controlStates.map((controlState, index) => {
       useEffect(() => {
           changeForm(controlState[0], index);
       }, [controlState[0]])
    });
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            {
                React.Children.map(children, (el,index) => {
           
                    return el.type === "input" || el.type === "select" || el.type === "textarea"
                        ?
                        (
                            <div className="input--wrap">
                                {/* label */}
                                {el.props.title ? React.createElement('p', {className: "input--title"}, el.props.title) : null}
                                
                                {/* input object */}
                                {el.type === "input" && (el.props.type === "object") ? <InputObject form={controlStates[index][0]} setForm={controlStates[index][1]} el={el} parentName={name}>{el.props.children}</InputObject> : null}
    
                                {/* input array */}
                                {el.type === "input" && (el.props.type === "array") ? <InputArray form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}>{el.props.children}</InputArray> : null}
                                
                                {/* input text */}
                                {el.type === "input" && (el.props.type === "text" || el.props.type === "password") ? <InputText form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}>{el.props.children}</InputText> : null}
                
                                {/* input checkbox */}
                                {el.type === "input" && el.props.type === "checkbox" ? <InputCheckbox form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* input radio */}
                                {el.type === "input" && el.props.type === "radio" ? <InputRadio form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* input tags */}
                                {el.type === "input" && el.props.type === "tags" ? <InputTags form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* input avatar */}
                                {el.props.type === "avatar" ? <InputAvatar form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* input img */}
                                {el.props.type === "img" ? <InputImage form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* input file */}
                                {el.props.type === "file" ? <InputFile form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* textarea */}
                                {el.type === "textarea" ? <InputTextarea form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* select */}
                                {el.type === "select" ? <InputSelect form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
                
                                {/* codeEditor */}
                                {el.props.type === "codeEditor" ? <InputCodeEditor defaultForm={defaultForm} form={controlStates[index][0]} setForm={controlStates[index][1]} el={el}  parentName={name}/> : null}
    
                                {React.createElement('p', {className: "input--error"}, form.errors ? form.errors[el.props.name] : null)}
                            </div>
                        ) : (el)
                })
            }
        </div>
    );
};

export default InputArray;
