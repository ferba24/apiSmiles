import { useState } from 'react'
import './App.css'
import {FlightList} from './components/FlightList.jsx'
import {SearchForm} from "./components/SearchForm.jsx";

function App() {

  return (
    <div className="App">
        <SearchForm/>
        <FlightList/>
    </div>
  )
}

export default App
