import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';

const BACKEND_URL = 'https://cloudflare-worker-d1.zetbouaka9758.workers.dev/api/problem';

const State = {
  "문제로딩중": 0,
  "문제푸는중": 1,
  "정답맞춤": 2,
};

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
    const [userState, setuserState] = useState(State.문제로딩중);
    useEffect(() => {
        async function fetchAndSetProblem() {
            URL = BACKEND_URL + "/" + getTodayString();
            const result = await axios.get(URL);
            setTodayProblem({
                title: result.data[0].title,
                body: result.data[0].body,
                author: result.data[0].author,
                answer: result.data[0].answer,
            })
            setAnswer(result[0].data.answer);
            setuserState(State.문제푸는중);
        }
        fetchAndSetProblem();
    }, []);    

    const checkAnswer = (event) => {
        event.preventDefault();
        if (answer == TodayProblem.answer) {
            alert('맞았습니다!');
            setuserState(State.정답맞춤);            
        } else {
            alert('틀렸습니다!');
        }
    };
    
    const TwitterShare = (event) => {
        const url = encodeURI('https://maze.can-u-solve.today/');
        const text = encodeURI('오늘의 문제는 너무 쉬웠어. 너희도 한번 풀어봐!');
        window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
    };
    
    if (userState == State.정답맞춤){
        return (
            <div className="bg-white shadow-lg rounded-lg p-6">    
                <h2 className="text-2xl font-bold mb-4">넌 정답을 맞췄다</h2>
                <Problem                   
                    body="자랑해도 된다"
                    author={TodayProblem.author}
                />
                <form>
                  <div className="mb-4">
                  </div>
                  <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline" 
                   onClick={TwitterShare}>트위터에서 자랑하기</button>
                </form>
              </div>
         );
    }else{
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
}

export default App;