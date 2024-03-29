import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { createClient } from '@supabase/supabase-js'

import ReactGA from "react-ga4";

const BACKEND_URL = 'https://cloudflare-worker-d1.zetbouaka9758.workers.dev/api/problem';

const supabaseUrl = 'https://wrvwoxshrroapcqjczdv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndydndveHNocnJvYXBjcWpjemR2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODEyOTY2ODksImV4cCI6MTk5Njg3MjY4OX0.fyWNFXkIHHJUIx9pudlqcQpae1Kiu4d5Ogdk1yIYM0w'

const supabase = createClient(supabaseUrl, supabaseKey)

const State = {
  "문제로딩중": 0,
  "문제푸는중": 1,
  "힌트1봤음": 2,
  "힌트2봤음": 3  
}

const verifiedState = {
    "정답못맞춤": 0,
    "정답맞춤": 1
}

function Problem({ title, body, author, image }) {
    if (image != "girl.png")
        return (
            <div>
                <img src={image} />
                <p className="text-lg mb-4">{body}</p>
            </div>
        );
    else
        return (
            <div>
                <p className="text-lg mb-4">{body}</p>            
                <img src="/girl.png"></img>
                <b><center>축하드립니다!</center></b>
            </div>
        );
}

function getTodayString(){
    var date = new Date();
    var year = date.getFullYear();
    var month = ("0" + (1 + date.getMonth())).slice(-2);
    var day = ("0" + date.getDate()).slice(-2);

    return year + "-" + month + "-" + day;
}

function App() {
    const [TodayProblem, setTodayProblem] = useState({});
    const [answer, setAnswer] = useState('');
    const [isloading, setisloading] = useState(true);
    const [userState, setuserState] = useState(State.문제로딩중);
    const [verified, setverified] = useState(verifiedState.정답못맞춤);
    
    useEffect(() => {
        async function fetchAndSetProblem() {
            const { data, error } = await supabase
            .from('problem')
            .select('title, body, answer')
            .eq('date', getTodayString())
            .single();

            setTodayProblem({
                title: data.title,
                body: data.body,
                author: data.author || "아카",
                answer: data.answer,
                hint1: data.hint1 || "힌트 1 없음",
                hint2: data.hint2 || "힌트 2 없음",
                image_url: data.image || ""
            })
            // setAnswer();
            setuserState(State.문제푸는중);
            ReactGA.event({
              category: "Maze",
              action: "See the problem",              
            });
        }
        fetchAndSetProblem();
    }, []);    
    
    const viewHint1 = (event) => {
        event.preventDefault();
        alert('힌트 1 : ' + TodayProblem.hint1);
        setuserState(State.힌트1봤음);
        ReactGA.event({
            category: "Maze",
            action: "See Hint1",              
        });
    }
    
    const viewHint2 = (event) => {
        event.preventDefault();
        if (userState == State.힌트1봤음 || userState == State.힌트2봤음){        
            alert('힌트 2 : ' + TodayProblem.hint2);
            setuserState(State.힌트2봤음);         
            ReactGA.event({
                category: "Maze",
                action: "See Hint2",
            });
        } else {
            alert('힌트 1을 보고오세요');
        }
    }
    
    const checkAnswer = (event) => {
        event.preventDefault();
        if (answer == TodayProblem.answer) {
            alert('맞았습니다!');
            setverified(verifiedState.정답맞춤);
            ReactGA.event({
                category: "Maze",
                action: "Success!",
            });
        } else {
            alert('틀렸습니다!');
        }
    };
    
    const TwitterShare = (event) => {
        const url = encodeURI('https://maze.akaiaoon.dev/');
        const hashtag = encodeURI('일일미궁');
        if (userState == State.힌트1봤음) {
            const text = encodeURI('오늘의 문제는 그럭저럭 쉬웠어. 너도 한번 풀어봐!');  
            window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtag}`);
        } 
        else{
            if (userState == State.힌트2봤음) {
                const text = encodeURI('오늘의 문제는 졸라 어려웠어. 너도 한번 풀어봐!');
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtag}`);
            } else {
                const text = encodeURI('오늘의 문제는 아주 쉬웠어. 너도 한번 풀어봐!');
                window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}&hashtags=${hashtag}`);
            }
        }        
    };
    if (userState == State.문제로딩중){
        return (
            <div className="bg-white shadow-lg rounded-lg p-6">    
                <h2 className="text-xl font-bold mb-4">로딩중입니다...</h2>
                잠시만 기다려주세요.
            </div>
        )
    }
    if (verified === verifiedState.정답맞춤){
        return (
            <div className="bg-white shadow-lg rounded-lg p-6">    
                <h2 className="text-2xl font-bold mb-4">넌 정답을 맞췄다</h2>
                <Problem                   
                    body="자랑해도 됩니다."
                    author={TodayProblem.author}
                    image="girl.png"
                />
                <form>
                  <div className="mb-4">
                  </div>
                  <button className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded-lg shadow-sm hover:bg-blue-700 focus:outline-none focus:shadow-outline" 
                   onClick={TwitterShare}>트위터에 공유</button>
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
            image={TodayProblem.image_url}
        />
        <form>
          <div className="mb-4">
            <input className="w-full px-4 py-2 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:shadow-outline" type="text" placeholder="Your answer here" 
                onChange={(e) => { setAnswer(e.target.value); }}/>      
            </div>      
            <div className="flex justify-between">
              <button className="w-1/2 px-4 py-2 font-bold text-white bg-blue-800 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline mr-2" onClick={viewHint1}>Hint 1</button>
              <button className="w-1/2 px-4 py-2 font-bold text-white bg-blue-800 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline ml-2" onClick={viewHint2}>Hint 2</button>
            </div>
            <br></br>
            <button className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline" onClick={checkAnswer}>제출하기</button>                   
        </form>
      </div>
        );
    }
}

export default App;