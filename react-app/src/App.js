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
        <lr>
            <p><b>{title}</b></p>
            <p>Asked by {author}</p>
            <br></br>
            <p>{body}</p>
        </lr>
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
        <div className="App">
            <header className="App-Header"></header>
            <div className="Problem">
                <Problem
                    title={TodayProblem.title}
                    body={TodayProblem.body}
                    author={TodayProblem.author}
                />
            </div>
            <div className="submit">
                <input
                    type="text"
                    id="test"
                    onChange={(e) => {
                        setAnswer(e.target.value);
                    }}
                />
                <button onClick={checkAnswer}>제출하기</button>
            </div>
        </div>
    );
}

export default App;