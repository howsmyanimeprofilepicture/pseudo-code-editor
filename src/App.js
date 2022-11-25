import React, { useEffect, useState } from "react";
import {renderElement} from "./pseudocode";
import "./App.css"
import "./pseudocode.css"
import {initialRawScript} from "./constants";
import html2canvas from 'html2canvas';


export function App() {
    const [rawScript, setRawScript] = useState(initialRawScript)
    const [rendered, setRendered ] = useState("");
    const [b64, setB64] = useState("");
    const render = (script) => {
        const target = document.createElement("pre");
        target.innerHTML = script
        setRendered(
            renderElement(target, {
                captionCount: 0
            }).outerHTML)
    }

    useEffect(()=>{
        render(rawScript)
    },[] )
    
    
    return (
    <div className="container">
        <textarea 
            className="editor"
            onChange={e => {
                e.preventDefault();
                setRawScript(e.target.value);
                console.log(rawScript)
                render(e.target.value);
            }}
            value={rawScript}
            
        >{rawScript}</textarea>
        <div className="preview" >
            <div id="rendered" dangerouslySetInnerHTML={{__html: rendered}}></div>
            <button onClick={async (e)=>{
                e.preventDefault();
                const canvas = await html2canvas(document.getElementById('rendered'));
                const base64url = canvas.toDataURL('image/png');
                console.log(base64url)
                const iframe = `<iframe src="${base64url}" frameborder="0" style="border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;" allowfullscreen></iframe>`
                const newTab = window.open();
                newTab.document.open();
                newTab.document.write(iframe);
                newTab.document.close();
            }}>Capture</button>
        </div> 

        
    </div>)
}
