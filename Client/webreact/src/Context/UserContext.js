import React from 'react';

const userContext = createContext({
    username: '',
    token: '',
    setUsername: () => {},
    setToken: () => {}
  })
  

export { userContext };