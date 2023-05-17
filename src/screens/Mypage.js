import React from 'react'
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import ProgressBar from './ProgressBar';
import { Container } from '@mui/system';

const info = {
    name : '문지혜',
    email : 'kjljh1217@naver.com',
}

const cate = {
    name : '학교',
    description : '졸업 > 학교 > 수업',
}

const Mypage = () => {


  return (
    <Container>
        <Card sx={{ justifyItems:'center' }}>
            <CardContent sx={{ textAlign:'center'}}>
                <Typography component="h2" variant="h5" sx={{mb:1, mt:1}}>
                학습자 : {info.name}
                </Typography>
                <Typography variant="subtitle1">
                {info.email}
                </Typography>
            </CardContent>   
        </Card>

        <Card sx={{ display: 'flex' , my: 3.5}}>
            <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                    카테고리 : {cate.name}
                </Typography>
                <Typography variant="subtitle1" >
                {cate.description}
                </Typography>
                <ProgressBar/>
            </CardContent>   
        </Card>

        <Card sx={{ display: 'flex' , my: 3.5}}>
            <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                    카테고리 : {cate.name}
                </Typography>
                <Typography variant="subtitle1">
                {cate.description}
                </Typography>
                <ProgressBar/>
            </CardContent>   
        </Card>

        <Card sx={{ display: 'flex' , my: 3.5}}>
            <CardContent sx={{ flex: 1 }}>
                <Typography component="h2" variant="h5">
                    카테고리 : {cate.name}
                </Typography>
                <Typography variant="subtitle1">
                {cate.description}
                </Typography>
                <ProgressBar/>
            </CardContent>   
        </Card>

    </Container>
  )
}

export default Mypage