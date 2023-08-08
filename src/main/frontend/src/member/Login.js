import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';


export default function LoginForm() {

    const navigate = useNavigate();

    const [showAlert, setShowAlert] = useState(false);

    const [loginInfo, setLoginInfo] = useState({
        'id': '',
        'password': '',
    });

    const [errorMessage, setErrorMessage] = useState(null);

    const inputChange = (event) => {
        setLoginInfo({
              ...loginInfo,
              [event.target.name]: event.target.value,
        });
    };
    const membersLogin = () => {
        console.log("로그인 요청");
        // Axios를 사용하여 POST 요청 보내기
        axios.post('/login', loginInfo,{
            headers:{
                "Content-Type" : "application/x-www-form-urlencoded"
            }
        })
        .then((response) => {
            // 성공적으로 응답을 받았을 때 실행되는 부분
            navigate('/home', {  'Authorization': response.headers.get('Authorization'),})
        })
        .catch((error) => {
            // 요청이 실패했을 때 실행되는 부분
            setErrorMessage(error.response.data);
            setShowAlert(true);
        });
    };
    return (
    <>
        {showAlert && (
            <Alert severity="error">{errorMessage}</Alert>
        )}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh'
        }}>
    <Box
      component="form"
      sx={{
        width:300,
        height:300,
        padding:'25px',
        border: 1,
        borderWidth: '3px',
        borderColor: 'black',
        borderRadius: '16px'
      }}
      noValidate
      autoComplete="off"
    >
    <div style={{textAlign:'center'}}>
        <img src={'/image/jmWorkLogo.jpg'} width='150' height='130'/>
    </div>
        <div>
            <TextField
              id="id"
              name="id"
              label="ID"
              multiline
              style={{width:'100%'}}
              onChange={inputChange} />
        </div>
        <div>
            <TextField
            id="password"
            name="password"
            label="password"
            type="password"
            style={{marginTop: '20px', width:'100%'}}
            onChange={inputChange} />
        </div>
        <Stack direction="row" spacing={2} style={{justifyContent: 'center', marginTop:'10px'}}>
            <Button variant="outlined" style={{width:'100%'}} onClick={membersLogin}>로그인</Button>
        </Stack>
    </Box>
    </div>
    </>
  );
}