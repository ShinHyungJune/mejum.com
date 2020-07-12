import React, {useEffect} from 'react';
import Tabs from '../../common/Tabs';

const InputCodeEditor = ({form, setForm, el, defaultForm}) => {
    let previewEl;
    
    useEffect(() => {

        // inital value를 받아서 iframe을 리로드 해야돼
        if(defaultForm) {
            form = defaultForm;
            
            setForm(form);
        }
        
        render();
    }, [defaultForm]);
    
    const changeForm = (event) => {
        setForm({
            ...form,
            [event.target.name] : event.target.value
        });
    };
    
    const render = () => {
        previewEl = document.querySelector("#preview");
        
        axios.post("/previews", form)
            .then(response => {
                previewEl.contentDocument.location.reload(true);
            });
    };
    
    return (
        <div className={el.props.className ? el.props.className :`input--${el.props.type ? el.props.type : el.type}`}>
            <div className="input-codeEditor-codes">
                <textarea className="input-codeEditor-html" name="html" placeholder="HTML" value={form.html} onChange={changeForm}>
                </textarea>
        
                    <textarea className="input-codeEditor-css" name="css" placeholder="CSS" value={form.css} onChange={changeForm}>
                </textarea>
        
                    <textarea className="input-codeEditor-js" name="js" placeholder="JS" value={form.js} onChange={changeForm}>
                </textarea>
            </div>
            
            <div className="input-codeEditor-preview">
                <iframe src="/previews" id="preview">
                </iframe>
            </div>
            
            <button type="button" className="input-codeEditor-btn btn-text bg-primary" onClick={render}>적용해보기</button>
        </div>
    );
};

export default InputCodeEditor;
