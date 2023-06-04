import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox'; 
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { fetchSession } from '../sessionApi';

const SignIn = ({onLoginSuccess}) => {
  const[email, setEmail] = useState('');
  const[passwd, setPassword] = useState('');

  const handleLogin  = (e) => {
      // 이메일과 비밀번호를 서버로 전송
      axios.post('/api/login', { email, passwd })
        .then((response) => {
          // 서버로부터의 응답 처리
          console.log('로그인 요청');

          const sessionID = response.data; //세션 ID를 응답 헤더에서 가져옴
          console.log('sessionID: ', sessionID);
          fetchSession(sessionID)
            .then((sessionInfo) => {
              console.log('세션 요청 ');
              console.log('sessionInfo:', sessionInfo);
              onLoginSuccess(sessionInfo);
            })
            .catch((error) => {
              console.error('세션 정보 요청 실패', error.response.data);
            });
          document.location.href="/";
        })
        .catch((error) => {
          // 에러 처리
          console.log('로그인 실패');
          console.error(error);
        });
  };


  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleLogin(email, passwd);
  };

  return (
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: 'url(img/수어지교.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={handleSubmit}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                value={email} // 입력된 이메일 값을 상태로 설정
                onChange={handleEmailChange} // 이메일 값이 변경될 때 상태 변경 함수 호출
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="passwd"
                label="Password"
                type="passwd"
                id="passwd"
                autoComplete="current-password"
                value={passwd}
                onChange={handlePasswordChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="아이디 저장하기"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Button
                type="submit"
                fullWidth
                sx={{ mt: 1, mb: 2 }}
                href="/SignUp"
              >
                새로 오셨다면 ? 회원가입
              </Button>
            </Box>
          </Box>
        </Grid>
      </Grid>
  );
};

export default SignIn;