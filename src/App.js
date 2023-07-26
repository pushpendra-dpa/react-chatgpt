import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';
import Chats from './Chats';
import { useState } from 'react';

function App() {
  const [state, setState] = useState({ isNewSession: true })
  return (
    <div className="App">
      <Navigation />
      <div className='main-screen'>
        {state.isNewSession ? <Example /> : <Chats />}
        <Prompt setState={setState} state={state} />
      </div>
    </div>
  );
}

export default App;
