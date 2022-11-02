import { useState } from 'react'
import './App.css'
import {FlightList} from './components/FlightList.jsx'
import {SearchForm} from "./components/SearchForm.jsx";
import {GetFlights} from "./services/GetFlights";

function App() {

    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState();
    const [error, setError] = useState(null);

const findResultspropvalue = (props) => {
    console.log(props)
    GetFlights(props, setError, setIsLoading, setFlights)
    }

  return (
    <div className="App">
        <SearchForm findResultspropname={findResultspropvalue} />
        <FlightList flights={flights} error={error} isLoading={isLoading}/>

    </div>
  )
}

export default App
