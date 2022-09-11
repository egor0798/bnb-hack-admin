import React, { useContext, useEffect } from 'react';
import './App.scss';
import { SubscriptionsList } from '../SubscriptionsList/SubscriptionsList';
import { connectWallet, login, logout } from '../../utils/connect-wallet';
import { AccountContext } from '../../store/AccountProvider';
import { Button } from 'antd';
import "antd/dist/antd.dark.css";

function App() {
  const { account, setAccount } = useContext(AccountContext);

  useEffect(() => {
    connectWallet().then(r => setAccount(r?.account || null));
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>Subscription manager admin</h1>
        <div className="app-header-user">
          {account && <Button type='primary' danger onClick={logout}>Logout</Button>}
          <h3>Account:</h3>
          <h3>{account || '--'}</h3>
        </div>
      </header>
      <div className="content">
        {account && <SubscriptionsList />}
      </div>
    </div>
  );
}

export default App;
