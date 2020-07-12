import React, {useState} from 'react';

const Tabs = ({children}) => {
    let [activeIndex, setActiveIndex] = useState(0);

    const switchTab = (index) => {
        setActiveIndex(index);
    };

    return (
        <div className="tabs">
            <div className="tabs__buttons">
                {children.map((tab, index) => (<button type="button" key={index} className={index === activeIndex ? "tabs__buttons__button active" : "tabs__buttons__button"} onClick={() => switchTab(index)}>{tab.props.name}</button>))}
            </div>

            <div className="tabs__contents">
                {children.map((tab, index) => (<div className={index === activeIndex ? "tabs__contents__content active" : "tabs__contents__content"} key={index}>{tab.props.children}</div>))}
            </div>
        </div>
    );
};

export default Tabs;
