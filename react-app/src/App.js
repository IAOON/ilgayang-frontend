import logo from './logo.svg';
import './App.css';
import axios from 'axios';

const BACKEND_URL = "https://heroku-deploy-test-gcuad.run.goorm.io/judge";

async function APICall () { 
    // when react first renders then it called componentDidMount()
    const response = await axios.post(BACKEND_URL,
                                     {"id":1, "answer": "test"});
    console.log(response.data);
}

function App() {
    return (
    <div className="App">
      <header className="App-header">
          <button onClick={APICall}>Axios Test</button>
      </header>
    </div>
  );
}

export default App;
