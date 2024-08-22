import logo from './logo.svg';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import { BrowserRouter as Router, Route, Routes, BrowserRouter } from 'react-router-dom';
import HomePage from './components/LandingPage/HomePage';

function App() {
  return (
    <div className="">
     {/* <Dashboard/> */}
     <HomePage/>
     
    </div>
  )
}

export default App;
