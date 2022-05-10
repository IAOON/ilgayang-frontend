import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState } from 'react';

const BACKEND_URL = 'https://heroku-deploy-test-gcuad.run.goorm.io/judge';

async function APICall() {
    // when react first renders then it called componentDidMount()
    const response = await axios.post(BACKEND_URL, { id: 1, answer: 'test' });
    console.log(response.data);
}

async function Submit(event) {
    event.preventDefault();

    const response = await axios.post(BACKEND_URL, { id: 1, answer: 'test2' });

    // alert(`제출한 답 : ${answer}`);

    if (response.data.result == true) {
        alert('정답입니다!');
    } else {
        alert('잘못된 답입니다.');
    }
}

function App() {
    const [answer, setAnswer] = useState('');

    const handleChange = ({ target: { value } }) => setAnswer(value);

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: BACKEND_URL,
            data: { id: 1, answer: answer },
        }).then((res) => {
            console.log(res.data);
            if (res.data.result == true) {
                alert("맞았습니다!")
            }else{
                alert("틀렸습니다!")
            }
        });
    };

    return (
        <div className="App">
            <header className="App-header">
                <button onClick={APICall}>Axios Test</button>

                <form onSubmit={handleSubmit}>
                    <input name="answer" value={answer} onChange={handleChange} />
                    <button type="submit">제출</button>
                </form>
            </header>
        </div>
    );
}

export default App;