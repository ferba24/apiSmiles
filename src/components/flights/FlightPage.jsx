import {SearchForm} from "./SearchForm.jsx";
import {FlightList} from "./FlightList.jsx";
import {GetFlights} from "../../services/GetFlights.jsx";
import {useState} from "react";

export const FlightPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [flights, setFlights] = useState();
    const [error, setError] = useState(null);

    const findResultspropvalue = (props) => {
        console.log(props)
        GetFlights(props, setError, setIsLoading, setFlights)
    }

    return (
        <>
            <SearchForm findResultspropname={findResultspropvalue} />
            <FlightList flights={flights} error={error} isLoading={isLoading}/>
        </>
    )
}