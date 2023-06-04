import React from 'react';
import "../css/Progress.css";

export default function Progress({percent = '0%'}){
    return <div class="outer-container">
        <div class=" inner-container" style={{'--width' : percent}}>
            {percent}
        </div>
    </div>;
}