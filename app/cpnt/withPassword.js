"use client";
// withPassword.js
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import { p as sp } from "../util/util";
import { Alert } from '@mui/material';
import { Snackbar } from '@mui/material';

export default function withPassword(WrappedComponent) {
  return function WithPassword(props) {
    const [password, setPassword] = useState('');
    const [showContent, setShowContent] = useState(false);
    const [alert, setAlert] = useState({ open: false, message: '' });

    const correctPassword = sp;

    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    const handleConfirmClick = () => {
      if (password === correctPassword) {
        setShowContent(true);
        setAlert({ open: true, message: '密码正确！' });
        setTimeout(() => setAlert({ open: false, message: '' }), 3000);  // Alert will disappear after 3 seconds
      } else {
        setAlert({ open: true, message: '密码错误！' });
        setTimeout(() => setAlert({ open: false, message: '' }), 3000);  // Alert will disappear after 3 seconds
      }
    };

    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
      setAlert({ ...alert, open: false });
    };

    return (
      <div>
        <Modal
          open={!showContent}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', backgroundColor: 'white', padding: '1em', textAlign: 'center' }}>
            <h2>管理员登录</h2>
            <TextField
              type="password"
              label="密码"
              variant="outlined"
              value={password}
              onChange={handlePasswordChange}
            />
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={handleConfirmClick}>
              确认
            </Button>
          </div>
        </Modal>
        <Snackbar open={alert.open} autoHideDuration={6000} onClose={handleClose}>
          <Alert onClose={handleClose} severity={password === correctPassword ? 'success' : 'error'} sx={{ width: '100%' }}>
            {alert.message}
          </Alert>
        </Snackbar>
        {showContent && <WrappedComponent {...props} />}
      </div>
    );
  };
}
