import React from 'react';
import ReactDOM from 'react-dom/client';

import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import ReactGA from 'react-ga4';

ReactGA.initialize("G-3FQ4ETDJR6");

const Opengraph = () => (
    <div>        
        <title>일일미궁 - 매일매일 미궁게임</title>
        <meta property="og:title" content="일일미궁 - 매일매일 미궁게임" />
        <meta property="og:description" content="매일매일 퀴즈 하나를 해결하자!" />        
    </div>
);

const Header = () => (
  <header className="flex items-center justify-between px-4 py-3 bg-gray-900 text-white">
    <div className="font-bold text-xl">일일미궁 - 매일매일 미궁 게임</div>
    <nav>
      <a className="inline-block px-3 py-2 font-medium leading-none text-white hover:text-gray-300" href="#">Home</a>
    </nav>
  </header>
);

const Footer = () => (
  <footer className="px-4 py-3 bg-gray-900 text-white mt-10">
    <div className="text-sm font-medium leading-none text-center">
        <p>&copy; 2023 Browser-Based Online Riddles</p>
        문의: <a href="https://twitter.com/akastwit">트위터 @akastwit</a>
        <p>정답을 맞추시면 트위터에 공유하기 버튼이 생깁니다!</p>
    </div>
  </footer>
);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(        
  <React.StrictMode>
    <Opengraph />
    <div className="bg-gray-200">
      <Header />
      <main className="max-w-sm mx-auto mt-10">
        <App />
      </main>
    </div>
    <Footer />        
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
