//https://github.com/evictorero/smiles/blob/main/main.go
import {currentDateFormat} from './GetCurrentDate.js'
import {apiHeaders} from './Headers.js'
import {getDaysInMonth} from './getDaysInMonth.js'
import * as HELPERS from "../helpers"
import axios from "axios"

export const GetFlights = async (props, setError, setIsLoading, setFlights) => {


    setIsLoading(true)

    let mejoresVuelos = {
        vuelo: {
            Fecha: '',
            Millas: '',
            SmilesandMoney: '',
            Aerolinea: '',
            Duracion: '',
            Escalas: '',
            DuracionEscalas: '',
            Asientos: '',
            Cabina: '',
            Equipaje: ''
        }
    };

    let mejorOfertaDelDia = 0

    //convertimos el objeto fecha en string
    //tomamos la fecha ingresada por el usuario, la separamos para calcular cuantos dias tiene el mes para el for


    //definimos dia actual por si el usuario busca vuelos para este mes asi no buscamos dias anteriores
    const today = new Date().getDate()
    let initialDayForCounter
    if (currentDateFormat == `${props.fechaIda}`) {
        initialDayForCounter = (today + 1)
    } else {
        initialDayForCounter = 0
    }

    //Lo dejo así de declarativo para que quede mas claro, se puede resolver ambos índices en los argumentos de range

    const dayFrom = initialDayForCounter;
    const dayTo = getDaysInMonth(`${props.fechaIda}`);

    // Range devuelve un iterador, no un array. Se puede construir en array a partir de él usando el spread operator (como acá),
    // o usando new Array(range(from, to))
    const daysToIterate = [...HELPERS.range(dayFrom,dayTo)]

    // Al igual que foreach, map es una función de ejecución asíncrona. 
    const promisesArray = daysToIterate.map((i) =>{ 
            return fetch(
                `https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=${props.adults}&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}-${i}&destinationAirportCode=${props.aeropuertoDestino}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoPartida}&tripType=2&forceCongener=false&r=ar`, {headers: apiHeaders }
            ).then(res => res.json())
    })

    try {
        let flightsReturned = []

        const responseJson = await Promise.allSettled(promisesArray)

        responseJson.forEach(({value}) => {
            console.log(value)
            const shortcutPrefix = value.requestedFlightSegmentList[0]
            if (shortcutPrefix.bestPricing.miles)  {
                mejorOfertaDelDia = (value.requestedFlightSegmentList[0].bestPricing.miles)
                console.log('Mejor oferta del dia: ' + mejorOfertaDelDia)
                mejorOfertaDelDia = 0
            }

            mejoresVuelos[0] = {
                vuelo: {
                    Fecha: shortcutPrefix.flightList[0].departure.date,
                    Millas: shortcutPrefix.bestPricing.miles,
                    SmilesandMoney: shortcutPrefix.bestPricing.smilesMoney.miles + '/' + shortcutPrefix.bestPricing.smilesMoney.money,
                    Aerolinea: shortcutPrefix.flightList[0].airline.code,
                    Duracion: shortcutPrefix.flightList[0].duration.hours +':' + shortcutPrefix.flightList[0].duration.minutes,
                    Escalas: shortcutPrefix.flightList[0].stops,
                    DuracionEscalas: shortcutPrefix.flightList[0].timeStop.hours + ':' + shortcutPrefix.flightList[0].timeStop.minutes,
                    Asientos: shortcutPrefix.flightList[0].availableSeats,
                    Cabina: shortcutPrefix.flightList[0].cabin,
                    Equipaje: shortcutPrefix.flightList[0].baggage.quantity
                }
            }
            flightsReturned.push({
                Fecha: shortcutPrefix.flightList[0].departure.date,
                Millas: shortcutPrefix.bestPricing.miles,
                SmilesandMoney: shortcutPrefix.bestPricing.smilesMoney.miles + '/' + shortcutPrefix.bestPricing.smilesMoney.money,
                Aerolinea: shortcutPrefix.flightList[0].airline.code,
                Duracion: shortcutPrefix.flightList[0].duration.hours +':' + shortcutPrefix.flightList[0].duration.minutes,
                Escalas: shortcutPrefix.flightList[0].stops,
                DuracionEscalas: shortcutPrefix.flightList[0].timeStop.hours + ':' + shortcutPrefix.flightList[0].timeStop.minutes,
                Asientos: shortcutPrefix.flightList[0].availableSeats,
                Cabina: shortcutPrefix.flightList[0].cabin,
                Equipaje: shortcutPrefix.flightList[0].baggage.quantity
            })


        })
        //destructuracion ({value})

        setFlights(flightsReturned)
        
    } catch (error) {
        setError("No pudimos hacer la solicitud para obtener los datos");
        console.log(error)
    }
}