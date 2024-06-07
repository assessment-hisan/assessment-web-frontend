import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import firebase from 'firebase/compat/app';
import 'firebase/compat/storage';
import { firebaseConfig } from './utils/constants.js';
import Modal from 'react-modal';

Modal.setAppElement('#root'); 
firebase.initializeApp(firebaseConfig)
export const storage = firebase.storage()
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
