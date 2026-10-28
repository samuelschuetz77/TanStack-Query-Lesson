import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './style.css'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query'


// LESSON STAGE 1: Add QueryClient and QueryClientProvider here.
const qClient = new QueryClient()


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
   <QueryClientProvider client ={qClient}>
    <App />
   </QueryClientProvider>
  </React.StrictMode>,
)
