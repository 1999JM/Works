import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';

export default function loginForm() {	
  return (
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
			  label="ID"
			  multiline
			  style={{width:'100%'}}
			/>
		</div>
		<div>
			<TextField
			id="password"
			label="password"
			multiline
			style={{marginTop: '20px', width:'100%'}}
			/>
		</div>
      
		<Stack direction="row" spacing={2} style={{justifyContent: 'center', marginTop:'10px'}}>
			<Button variant="outlined" style={{width:'100%'}}>로그인</Button>
		</Stack>
    </Box>
    </div>
    
  );
}