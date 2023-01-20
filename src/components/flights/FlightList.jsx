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
                <div aria-label="Cargando..." role="status" className="flex items-center space-x-2">
                    <svg className="h-6 w-6 animate-spin stroke-gray-500" viewBox="0 0 256 256">
                        <line x1="128" y1="32" x2="128" y2="64" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="24"></line>
                        <line
                            x1="195.9"
                            y1="60.1"
                            x2="173.3"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="224" y1="128" x2="192" y2="128" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="24"></line>
                        <line
                            x1="195.9"
                            y1="195.9"
                            x2="173.3"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="128" y1="224" x2="128" y2="192" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="24"></line>
                        <line
                            x1="60.1"
                            y1="195.9"
                            x2="82.7"
                            y2="173.3"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"></line>
                        <line x1="32" y1="128" x2="64" y2="128" strokeLinecap="round" strokeLinejoin="round"
                              strokeWidth="24"></line>
                        <line
                            x1="60.1"
                            y1="60.1"
                            x2="82.7"
                            y2="82.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="24"></line>
                    </svg>
                    <span className="text-base font-medium text-gray-500">Cargando lista de vuelos...</span>
                </div>
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
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                                                Fecha
                                            </th>
                                            <th scope="col" className="px-2 py-1.5 text-left text-sm font-semibold text-gray-900">
                                                Millas
                                            </th>
                                            <th scope="col" className="px-2 py-1.5 text-left text-sm font-semibold text-gray-900">
                                                Smiles & Money
                                            </th>
                                            <th scope="col" className="px-2 py-1.5 text-left text-sm font-semibold text-gray-900">
                                                Aerolinea
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Duracion
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Escalas
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Duracion Escalas
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Asientos
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Cabina
                                            </th>
                                            <th scope="col" className="py-1.5 pl-2 pr-2 text-left text-sm font-semibold text-gray-900 sm:pr-6">
                                                Equipaje
                                            </th>

                                        </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-200 bg-white">
                                        {people.map((person) => (
                                            <tr key={person.email} className="divide-x divide-gray-200">
                                                <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm font-medium text-gray-900 sm:pl-6">
                                                    {props.flights.flightList[0].departure.date}
                                                </td>
                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.bestPricing.miles}</td>
                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.bestPricing.smilesMoney.money} + {props.flights.bestPricing.smilesMoney.miles}</td>
                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.flightList[0].airline.name}</td>

                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.flightList[0].duration.hours}:{props.flights.flightList[0].duration.minutes}</td>
                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.flightList[0].stops}</td>
                                                <td className="whitespace-nowrap p-2 text-sm text-gray-500">{props.flights.flightList[0].timeStop.hours}:{props.flights.flightList[0].timeStop.minutes}</td>
                                                <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-6">{props.flights.flightList[0].availableSeats}</td>
                                                <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-6">{props.flights.flightList[0].cabin}</td>
                                                <td className="whitespace-nowrap py-2 pl-2 pr-2 text-sm text-gray-500 sm:pr-6">{props.flights.flightList[0].baggage.quantity}</td>
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
