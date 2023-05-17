import {useEffect, useState} from 'react';
import Progress from "./Progress";
import { Button } from '@mui/material';


export default function ProgressBar(){
    const [percent, setPercent] = useState(0);

    const increase = () =>{
        if(percent +20 > 100) return;
        setPercent(percent + 20);
    }

    const decrease =() => {
        if(percent -20 < 0) return;
        setPercent(percent - 20);
    }

    useEffect(()=>{
        console.log(percent);
    }, [percent]);

    return (
        <>
        <Progress percent={percent + '%'} />
        <Button variant="outlined" color="success" onClick={increase} sx={{mr:3, mt:1}}>완료</Button>
        <Button variant="outlined" color="error" onClick={decrease} sx={{mr:3, mt:1}}>재수강</Button>
        수강률 : {percent} %
        
        </>
        
    )
}