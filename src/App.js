import React, { useEffect, useState } from "react";
import {renderElement} from "./pseudocode";
import "./App.css"
import "./pseudocode.css"
import {initialRawScript} from "./constants";
import html2canvas from 'html2canvas';
import highlighting from "./highlighting";

export function App() {
    const [rawScript, setRawScript] = useState(initialRawScript)
    const [rendered, setRendered ] = useState("");
    const [b64, setB64] = useState("");
    const render = (script) => {
        const target = document.createElement("pre");
        target.innerHTML = script       
        
        try{
            const result = renderElement(target, {
                captionCount: 0
            })
            setRendered(result.outerHTML)
        }
        catch(e){
            setRendered("Parsing Error!! 🤬🤬")
            console.log(e)
        }
    }

    useEffect(()=>{
        render(rawScript)
    },[] )


    
    
    
    return (
    <div className="container">
        <div className="editor">
            <pre
                className="hl" 
                dangerouslySetInnerHTML={{__html: highlighting(rawScript)}}/>
        <textarea 
            onChange={e => {
                e.preventDefault();
                setRawScript(e.target.value);
                render(e.target.value);
            }}
            value={rawScript}
            onKeyDown={e => {
                if (e.key != "Tab") return;
                
                e.preventDefault();
                const tempLoc = e.target.selectionStart;
                const s = (
                    rawScript.slice(0, tempLoc) 
                    + "    " 
                    + rawScript.slice(tempLoc)
                );
                
                e.target.value = s;
                e.target.focus();
                e.target.setSelectionRange(tempLoc+4, tempLoc+4);
                render(s);
                setRawScript(s);
            }}
        >{rawScript}</textarea>
        
        </div>

        
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
