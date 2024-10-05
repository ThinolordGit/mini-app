
import React from 'react';
import { tl_rend } from '../@assets/tlBootstrap/JS/tl-js';
import './widgets.css';
import ICON from '../utils/utils';


export function Icon ({icon=ICON.image,className="tl_ico",onClick=()=>{},...rest}) {
    return (
        <i className={"tl_ico bx "+icon} {...rest}></i>
    )
}

export function TextField ({isvalid=true,prefixIcon="",type="text",className="",label='Entre ici...',onClick=()=>{},onInput=()=>{},onFocus=()=>{},onBlur=()=>{},canShow=false,...rest}) {
    function onShow(e) {
        const eyeball = e.QSs('eyeball');
        
        if (eyeball.containsClass('closed')) {
            eyeball.removeClass('closed');
            e.previousElementSibling.type = "password"
        }
        else {
            eyeball.addClass('closed');
            e.previousElementSibling.type = "text"
        }
            
    }
    function whenClicked(e) {
        onClick(e.target)
    }
    function whenInputed(e) {
        onInput(e.target)
    }
    function whenFocused(e) {
        onFocus(e.target)
    }
    function whenBlured(e) {
        onBlur(e.target)
    }
    return (
        <div className="inputer" valid={isvalid ? "true" : "false"}>
            {prefixIcon !== "" && prefixIcon !== null && prefixIcon !== undefined ? <Icon style={{marginLeft:15}} icon={prefixIcon}/>:<i style={{marginLeft:8}}></i>}
            <input onBlur={whenBlured} onClick={whenClicked} onFocus={whenFocused} onInput={whenInputed} placeholder={label} className={className} type={type} {...rest}/>
            {type === "password" && canShow ? <svg onClick={(e) => {onShow(e.target)}} className="eye" width="25" height="40" viewBox="0 0 100 80" xmlns="http://www.w3.org/2000/svg"><g>{/* <ellipse id="eyeball" cx="50" cy="25" rx="40" ry="20" fill="#ffffff" stroke="#000" strokeWidth="2"/> */}<g className="eyeball"><path className="upperEye" d="M 10 39.5 Q 50 0 90 39.5" fill="none" stroke="var(--primary-color)" strokeWidth="3"/><path className="lowerEye" d="M 10 39.5 Q 50 80 90 39.5" fill="none" stroke="#000" strokeWidth="2"/></g><ellipse className="pupil" cx="50" cy="50" rx="10" ry="10" fill="none" stroke="#000" strokeWidth="2"/></g></svg> : <></>}
        </div>
    );
}
export function Button ({children="button",onClick=()=>{},onMouseDown=()=>{},onMouseUp=()=>{},type="button",className="",...rest}) {
    function whenClicked(e) {
        onClick(e.target)
    }
    function whenMouseon(e) {
        onMouseDown(e.target)
    }
    function whenMouseup(e) {
        onMouseUp(e.target)
    }
    return (
        <button onMouseUp={whenMouseup} onMouseDown={whenMouseon} onClick={whenClicked} type={type} className={"SButton "+className} {...rest}>{children}</button>
    );
}
export function CheckBox ({id='',checked=false,onChange=()=>{},label="checkbox",className="",...rest}) {
    const forIndice = id!=='' && id!==undefined && id!==null ? id : 'labled'+tl_rend(0,5000)
    function whenChanged (e) {
        onChange(e.checked)
    }
    return (
        <div className='tl-checkbox'>
            <input id={forIndice} onChange={(e)=>{whenChanged(e.target)}} placeholder={label} className="d-none" type="checkbox" {...rest}/>
            <div className='box'></div>
            <label htmlFor={forIndice} {...rest}>{label}</label>
        </div>
    );
}

