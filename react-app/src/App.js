import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

import today_problem from './problems/20220515.json';

const BACKEND_URL = 'https://';

async function APICall(data) {
    console.log(data);
}

function Problem({ title, body, author }) {
  return (
      <li>
          <p>문제 타이틀 : {title}</p>
          <p>문제 내용 : {body}</p>
          <p>문제 만든 사람 : {author}</p>
      </li>
  );
}

function App() {
    const [TodayProblem, setTodayProblem] = useState({});
    const [answer, setAnswer] = useState('');

    useEffect(() => {
      setTodayProblem({
        title: today_problem.title,
        body: today_problem.body,
        author: today_problem.author,
      })
      console.log("rendering~");
    }, []);

    const handleChange = ({ target: { value } }) => setAnswer(value);
    
    const checkAnswer= (event) => {
        event.preventDefault();
    
        console.log(answer);
        console.log(today_problem.answer);
        
        if (answer == today_problem.answer){
            alert('맞았습니다!'); 
        }else{
            alert('틀렸습니다!');
        }
    }

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
            <div className="Problem">
                <Problem title={TodayProblem.title} body={TodayProblem.body} author={TodayProblem.author}/>
            </div>
            <div className="submit">
                <input type="text" id="test" onChange={(e) => {setAnswer(e.target.value)}}/>
                <button onClick={checkAnswer}>제출하기</button>
            </div>
            </header>
        </div>
    );
}

export default App;