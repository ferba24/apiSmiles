import React, { useEffect, useState } from "react";
import {SearchForm} from "./SearchForm.jsx";

//sacado de https://www.escuelafrontend.com/articulos/data-fetching-con-react

//"https://api-prd-airlines-carousel.smiles.com.br/v1/airlines/carousel/pricing?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=2022-11-21&destinationAirportCode=MIA&infants=0&isFlexibleDateChecked=false&originAirportCode=EZE&tripType=2&forceCongener=false&r=ar"

//https://www.smiles.com.ar/emission?originAirportCode=AEP&destinationAirportCode=SCL&departureDate=1680937200000&adults=1&infants=0&children=0&cabinType=all&tripType=2

//https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&departureDate=2023-04-08&destinationAirportCode=SCL&infants=0&originAirportCode=AEP&tripType=2&forceCongener=false&r=ar

export function FlightList(props) {
    const [isLoading, setIsLoading] = useState(true);
    const [flights, setFlights] = useState(null);
    const [error, setError] = useState(null);
    const llamadaAPI = `https://api-prd-airlines-carousel.smiles.com.br/v1/airlines/carousel/pricing?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}destinationAirportCode=${props.aeropuertoVuelta}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoIda}&tripType=2&forceCongener=false&r=ar`

    useEffect(() => {
        if (isLoading) {
            async function fetchData() {
                try {
                    const response = await fetch(llamadaAPI);
                    if (response.ok) {
                        const flights = await response.json();
                        console.log(flights.bestPricingSegmentList[0].calendarDayList)
                        setFlights(flights.bestPricingSegmentList[0].calendarDayList);
                        setError(null);
                        setIsLoading(false);
                    } else {
                        setError("Hubo un error al obtener los puntos");
                    }
                } catch (error) {
                    setError("No pudimos hacer la solicitud para obtener los puntos");
                }
            }
            fetchData();
        }
    }, [isLoading]);
    const getFlights = () => {
        setIsLoading(true);
    };
    if (error) {
        return (
            <div className="App">
                <h1>{error}</h1>
                <button onClick={getFlights}>Volver a intentarlo</button>
            </div>
        );
    }
    if (isLoading) {
        return (
            <div className="App">
                <h1>Cargando...</h1>
            </div>
        );
    }
    return (
        <div className="App">
            <button onClick={randomDog}>
                ¡Buscar!{" "}
                <span role="img" aria-label="airplane">
          ✈️
        </span>
            </button>

            <div className='vuelos'>
                {flights.map((flight) => (
                    flight.miles
                ))}
                {flights.map((flight) => (
                    flight.date
                ))}
            </div>

        </div>
    );
}
