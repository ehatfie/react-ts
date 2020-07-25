import React from 'react';
import logo from './logo.svg';
import TestComponent from './components/TestComponent';
import TestTable from './components/TestTable';
import InputForm from './components/InputForm';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <TestComponent />
      </header>
      <body>
        <InputForm />
      </body>
    </div>
  );
}

export default App;




/*        <p>
          Edit <code>src/App.tsx</code> and save to reload. CHOO CHOO
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        */