import React, { useEffect, useState } from "react";

//sacado de https://www.escuelafrontend.com/articulos/data-fetching-con-react

//"https://api-prd-airlines-carousel.smiles.com.br/v1/airlines/carousel/pricing?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=2022-11-21&destinationAirportCode=MIA&infants=0&isFlexibleDateChecked=false&originAirportCode=EZE&tripType=2&forceCongener=false&r=ar"

//https://www.smiles.com.ar/emission?originAirportCode=AEP&destinationAirportCode=SCL&departureDate=1680937200000&adults=1&infants=0&children=0&cabinType=all&tripType=2

//https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&departureDate=2023-04-08&destinationAirportCode=SCL&infants=0&originAirportCode=AEP&tripType=2&forceCongener=false&r=ar

const people = [
    { name: 'Lindsay Walton', title: 'Front-end Developer', email: 'lindsay.walton@example.com', role: 'Member' },
    // More people...
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
                <div className="px-4 sm:px-6 lg:px-8">
                    <div className="mt-8 flex flex-col">
                        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                                <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
                                    <table className="min-w-full divide-y divide-gray-300">
                                        <thead className="bg-gray-50">
                                        <tr className="divide-x divide-gray-200">
                                            <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Fecha
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Puntos
                                            </th>
                                            <th scope="col" className="px-4 py-3.5 text-left text-sm font-semibold text-gray-900">
                                                Aerolinea
                                            </th>
                                            <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Escalas
                                            </th>
                                            <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Duracion {props.flights.bestPricing.miles}
                                            </th>
                                            <th scope="col" className="py-3.5 pl-4 pr-4 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Asientos
                                            </th>
                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {people.map((person) => (
                                            <tr key={person.email} className="divide-x divide-gray-200">
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm font-medium text-gray-900 sm:pl-6">

                                                </td>
                                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.title}</td>
                                                <td className="whitespace-nowrap p-4 text-sm text-gray-500">{person.email}</td>
                                                <td className="whitespace-nowrap py-4 pl-4 pr-4 text-sm text-gray-500 sm:pr-6">{person.role}</td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </>
    );
}
