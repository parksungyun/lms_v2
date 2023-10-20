import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// 엔트리포인트 -> 보통 index.js에서는 App만 부르고 App에서 코드를 수정하는 방식
// index.html에 있는 div#root
// 우리가 적는 모든 코드는 root의 자식
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);
