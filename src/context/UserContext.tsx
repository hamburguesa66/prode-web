import React, { PropsWithChildren, useContext, useEffect, useState } from "react";

export class Principal {
  isAuthenticated: Boolean;
  username: string | undefined;
  isAdmin: Boolean;

  constructor() {
    this.isAuthenticated = false;
    this.username = undefined;
    this.isAdmin = false;
  }
}

interface IUserContext {
    principal: Principal,
    setPrincipal: (principal: Principal) => void
}

const UserContext = React.createContext<IUserContext>({
    principal: new Principal(),
    setPrincipal: () => {}
});

export const UserProvider = ({ children } : PropsWithChildren) => {
  const [principal, setPrincipal] = useState<Principal>( () => {
    const principalJson = sessionStorage.getItem('session');
    if (principalJson) {
      return JSON.parse(principalJson);
    } else {
      return new Principal();
    }
  });

  useEffect(() => {
    sessionStorage.setItem('session', JSON.stringify(principal));
  }, [principal]);

  return (
    <UserContext.Provider value={{ principal, setPrincipal }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
