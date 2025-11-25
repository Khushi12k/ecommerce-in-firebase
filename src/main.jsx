
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Router from '../src/Router.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Router />
  </StrictMode>,
)