import {useEffect, useState} from 'react';
import Progress from "./Progress";
import { Button } from '@mui/material';
import axios from 'axios';

export default function ProgressBar(props){
    const [percent, setPercent] = useState(0);
    const { categoryId, userId } = props;

    useEffect(() => {
      console.log('categoryId:',categoryId);
      axios.get('http://localhost:8080/api/progress', {
            params: {
              categoryId: categoryId,
              memberId: userId
            }
      })
        .then(response => {
          setPercent(response.data);
        })
        .catch(error => {
          console.log('percent error', error);
        });
    }, []);

    return (
        <>
        <Progress percent={percent + '%'} />
        수강률 : {percent} %
        
        </>
        
    )
}