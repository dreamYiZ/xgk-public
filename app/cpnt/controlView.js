import useGlobalStore from '../store/useGlobal';
import classes from "./controlView.module.sass";
import ppplog from "ppplog";
import SidePanel from "./sidePanel";
import React, { useEffect, useState } from 'react';
import { MODE } from '../store/useGlobal';
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';
import { p as sp, generateLicense, loadInitConfig } from "../util/util";

function ControlView(config) {
  const { mode, setMode, version, hideWhenDisplaying, showWhenEditing, license } = useGlobalStore();

  const [keyPressCount, setKeyPressCount] = useState(0);
  const [lastKey, setLastKey] = useState(null);
  const [showPasswordPrompt, setShowPasswordPrompt] = useState(false);
  const [password, setPassword] = useState('');


  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 'f' && lastKey === 'f') {  // 将 event.key 转换为小写
        setKeyPressCount((prevCount) => prevCount + 1);
      } else {
        setKeyPressCount(1);
      }
      setLastKey(event.key.toLowerCase());
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lastKey]);

  useEffect(() => {
    if (keyPressCount >= 5) {
      setShowPasswordPrompt(true);
      setKeyPressCount(0);  // reset the count
    }
  }, [keyPressCount]);

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordSubmit = () => {
    if (password === sp) {  // replace 'correct-password' with your actual password
      setMode(MODE.EDIT);
      setShowPasswordPrompt(false);
      setPassword('');
    } else {
      alert('Incorrect password');
    }
  };


  useEffect(() => {
    // Call the POST endpoint when the component mounts
    if (license) {
      fetch('/api/gp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ password: license }) // Send license as password
      })
        .then(response => response.json())
        .then(data => {
          if (data.status === 'success') {
            return;
          } else {
            generateLicense();
          }
        })
        .catch(error => {
          console.error('Error:', error);
          generateLicense();
        });
    }

  }, [license]);



  return <div>

    {showWhenEditing() && <div className={classes['side-panel']}>

      <SidePanel />
    </div>}

    {hideWhenDisplaying() && <div className={classes.vinfo}>
      {mode === MODE.INIT && <Button onClick={() => { loadInitConfig() }}>加载配置</Button>}
      {`MODE:${mode}, VERSION:${version}`}
    </div>}

    <Dialog open={showPasswordPrompt} onClose={() => setShowPasswordPrompt(false)}>
      <DialogTitle>请输入管理员密码</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="password"
          label="密码"
          type="password"
          fullWidth
          variant="standard"
          value={password}
          onChange={handlePasswordChange}
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handlePasswordSubmit();
            }
          }}
        />

      </DialogContent>
      <DialogActions>
        <Button onClick={handlePasswordSubmit}>提交</Button>
      </DialogActions>
    </Dialog>
  </div>
}

export default ControlView;
