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
    <div className="text-sm font-medium leading-none text-center">&copy; 2023 Browser-Based Online Riddles</div>
  </footer>
);

// const Riddle = () => (
//   <div className="bg-white shadow-lg rounded-lg p-6">
//     <h2 className="text-2xl font-bold mb-4">Riddle of the Day</h2>
//     <p className="text-lg mb-4">I'm light as a feather, but even the world's strongest man couldn't hold me for much longer than a minute. What am I?</p>
//     <form>
//       <div className="mb-4">
//         <input className="w-full px-4 py-2 rounded-lg shadow-sm text-gray-700 focus:outline-none focus:shadow-outline" type="text" placeholder="Your answer here" />
//       </div>
//       <button className="w-full px-4 py-2 font-bold text-white bg-gray-800 rounded-lg shadow-sm hover:bg-gray-700 focus:outline-none focus:shadow-outline" type="submit">Submit</button>
//     </form>
//   </div>
// );

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
