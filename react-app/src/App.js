import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = 'https://cloudflare-worker-d1.zetbouaka9758.workers.dev/api/problem';

async function APICall(data) {
    console.log(data);
}

function Problem({ title, body, author }) {
    return (        
        <p className="text-lg mb-4">{body}</p>        
    );
}

function getTodayString(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + month + day;
}

function App() {
    const [TodayProblem, setTodayProblem] = useState({});
    const [answer, setAnswer] = useState('');
    const [isloading, setisloading] = useState(true);

    useEffect(() => {
        async function fetchAndSetProblem() {
            URL = BACKEND_URL + "/" + getTodayString();
            const result = await axios.get(URL);
            console.log(result.data[0]);
            setTodayProblem({
                title: result.data[0].title,
                body: result.data[0].body,
                author: result.data[0].author,
                answer: result.data[0].answer,
            })
            setAnswer(result[0].data.answer);
            setisloading(false);
        }
        fetchAndSetProblem();
    }, []);
    // useEffect(() => {
    // setTodayProblem({
    //   title: today_problem.title,
    //   body: today_problem.body,
    //   author: today_problem.author,
    // })
    // console.log("rendering~");
    // }, []);

    const handleChange = ({ target: { value } }) => setAnswer(value);

    const checkAnswer = (event) => {
        event.preventDefault();
        if (answer == TodayProblem.answer) {
            alert('맞았습니다!');
        } else {
            alert('틀렸습니다!');
        }
        console.log(answer);
        console.log(TodayProblem.answer);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios({
            method: 'post',
            url: BACKEND_URL,
            data: { id: 1, answer: answer },
        }).then((res) => {
            if (res.data.result == true) {
                alert('맞았습니다!');
            } else {
                alert('틀렸습니다!');
            }            
        });
    };

    return (
        <div className="bg-white shadow-lg rounded-lg p-6">
    <h2 className="text-2xl font-bold mb-4">{TodayProblem.title}</h2>
    <Problem                   
        body={TodayProblem.body}
        author={TodayProblem.author}
    />
    <form>
      <div className="mb-4">
        <input className="w-full px-4 py-2 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:shadow-outline" type="text" placeholder="Your answer here" 
        onChange={(e) => { setAnswer(e.target.value); }}/>      
        </div>      
        <button className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline" onClick={checkAnswer}>제출하기</button>       
    </form>
  </div>
    );
}

export default App;