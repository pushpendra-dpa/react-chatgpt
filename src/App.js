import './App.css';
import Navigation from './Navigation';
import Example from './Example';
import Prompt from './Prompt';

function App() {
  return (
    <div className="App">
      <Navigation />
      <div className='main-screen'>
        <Example />
        <Prompt />
      </div>
    </div>
  );
}

export default App;
