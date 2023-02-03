import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Programacion from './pages/Programacion';
import Home from './pages/Home';
import reportWebVitals from './reportWebVitals';
import './index.scss';

console.log(
  '%c radionopal.com ',
  `font-weight: bold;
  font-size: 40px;
  color: #365ABD;
  text-shadow: 3px -3px 0 #FFD2C3,
  6px -6px 0 #3F6845,
  9px -9px 0 #FF6F61`,
);
console.log(
  '%c /* \n‍ https://github.com/pesinasiller/radionopal\n */',
  'font-size: 15px; color: blue;',
);

const element = document.getElementById('root');
const root = ReactDOM.createRoot(element);

function MainRouter() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/programacion" element={<Programacion />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </HashRouter>
  );
}
function AudioElement() {
  return (
    <audio id="audio-player" type="audio/mpeg">
      <source src={process.env.REACT_APP_STREAM_URL} />
    </audio>
  );
}

root.render(
  <React.StrictMode>
    <AudioElement />
    <MainRouter />
  </React.StrictMode>,
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
