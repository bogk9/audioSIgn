import logo from './logo.svg';
import './App.css';
import { MainPanel } from './components/MainPanel';
import styled from 'styled-components';
import { IdentityPanel } from './components/IdentityPanel';
import { SignPanel } from './components/SignPanel';
import { useState } from 'react';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const Box = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
`


function App() {

  return (
    <Provider store={store}>
      <Box>
        <IdentityPanel />
        <SignPanel  />
        <MainPanel />
      </Box>
    </Provider>
  );
}

export default App;
