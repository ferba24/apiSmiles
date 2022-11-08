import React, { useEffect, useState } from "react";
import DataTable from 'react-data-table-component';

//sacado de https://www.escuelafrontend.com/articulos/data-fetching-con-react

//"https://api-prd-airlines-carousel.smiles.com.br/v1/airlines/carousel/pricing?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=2022-11-21&destinationAirportCode=MIA&infants=0&isFlexibleDateChecked=false&originAirportCode=EZE&tripType=2&forceCongener=false&r=ar"

//https://www.smiles.com.ar/emission?originAirportCode=AEP&destinationAirportCode=SCL&departureDate=1680937200000&adults=1&infants=0&children=0&cabinType=all&tripType=2

//https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&departureDate=2023-04-08&destinationAirportCode=SCL&infants=0&originAirportCode=AEP&tripType=2&forceCongener=false&r=ar

const columns = [
    {
        name: 'Vuelo',
        selector: row => row.title,
    },
    {
        name: 'Millas',
        selector: row => row.year,
    },
];

const data = [
    {
        millas: '26 junio',
        year: '36243234',
    }
]


export function FlightList(props) {

    if (props.error) {
        return (
            <div className="App">
                <h1>{props.error}</h1>
            </div>
        );
    }
    if (props.isLoading) {
        return (
            <div className="App">
                <h1>Cargando...</h1>
            </div>
        );
    }

    if (!props.flights) {
        return 'No encontramos vuelos'
    }
    return (
        <>
            <div className="App">
                <h3 className="text-3xl font-bold tracking-tight sm:text-4x1">Resultados</h3>
                <DataTable
                    columns={columns}
                    data={data}
                />
                <ul className='vuelos'>
                    {props.flights.map((flight) => (
                       <li>{flight.miles}<br />{flight.date}</li>
                    ))}
                </ul>

            </div>
        </>
    );
}