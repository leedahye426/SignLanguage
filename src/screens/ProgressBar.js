import {useEffect, useState} from 'react';
import Progress from "./Progress";
import { Button } from '@mui/material';


export default function ProgressBar(){
    const [percent, setPercent] = useState(0);

    useEffect(() => {
        fetch('http://localhost:8080')
          .then(response => response.json())
          .then(data => setPercent(data.percent));
      }, []);

    const increase = () =>{
        if(percent +20 > 100) return;
        setPercent(percent + 20);
    }

    const decrease =() => {
        if(percent -20 < 0) return;
        setPercent(percent - 20);
    }

    return (
        <>
        <Progress percent={percent + '%'} />
        수강률 : {percent} %
        
        </>
        
    )
}