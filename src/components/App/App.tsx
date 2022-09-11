import React, { useEffect } from 'react';
import './App.scss';
import { SubscriptionsList } from '../SubscriptionsList/SubscriptionsList';
import { Button } from '@mui/material';
import { connectWallet, getAccount, login, logout } from '../../utils/connect-wallet';

function App() {

  useEffect(() => {
    connectWallet().then(() => {
      getAccount()?.then(r => console.log(r));
    });
  }, []);


  const handleLoginButtonClick = () => {
    login().then(res => console.log(res));
  }

  return (
    <div className="app">
      <header className="app-header">
        <h1>Subscription manager admin</h1>
        <div className="app-header-user">
          <h3>Account:</h3>
          <h3>123123123</h3>
        </div>
      </header>
      <div className="content">
        <Button onClick={handleLoginButtonClick}>Connect wallet</Button>
        <Button onClick={logout}>logout</Button>
        <SubscriptionsList />
      </div>
    </div>
  );
}

export default App;
