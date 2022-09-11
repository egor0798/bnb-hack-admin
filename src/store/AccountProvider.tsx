import React, { PropsWithChildren, useState } from 'react';

type AccountType = string | null;

export interface IAccountContext {
  account: AccountType;
  setAccount: (value: AccountType) => void;
}

export const AccountContext = React.createContext<IAccountContext>({account: null, setAccount: () => undefined});

export const AccountProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [account, setAccount] = useState<AccountType>(null);
  return (
    <AccountContext.Provider value={{ account, setAccount }}>
      {children}
    </AccountContext.Provider>
  )
}
