import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <BrowserRouter>
    <div className='grid h-[100vh] w-[100vw] place-items-center bg-slate-500 overflow-x-hidden font-body'>
    <App />
    </div>
    <ToastContainer />
    </BrowserRouter>
  </React.StrictMode>,
)
