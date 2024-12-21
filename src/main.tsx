import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './index.css'
import App from './App.tsx'
import Gen from './gen/gen.tsx'
import ReactDOM from 'react-dom/client'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/gen" element={<Gen />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
