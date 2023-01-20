//https://github.com/evictorero/smiles/blob/main/main.go
import {currentDateFormat} from './GetCurrentDate.js'
import {apiHeaders} from './Headers.js'
import {getDaysInMonth} from './getDaysInMonth.js'

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
    let initialForCounter = 0
    if (currentDateFormat == `${props.fechaIda}`) {
        initialForCounter = today
    } else {
        initialForCounter = 1
    }
    for (let i = initialForCounter; i < getDaysInMonth(`${props.fechaIda}`) ; i++) {

        const llamadaAPI = `https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=${props.adults}&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}-${i}&destinationAirportCode=${props.aeropuertoDestino}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoPartida}&tripType=2&forceCongener=false&r=ar`

        //vuelos = {...llamadaAPI, fechaFetch: `${props.fechaIda}-${i}`}
        try {
            const response = await fetch(llamadaAPI, {headers: apiHeaders });
            if (response.ok) {
                const flights = await response.json();
                setFlights(flights.requestedFlightSegmentList[0]);
                console.log(flights)

                console.log('Fecha del vuelo: ' + props.fechaIda + '-' + i )

                //comprobamos que hay oferta para ese dia y la guardamos
                if (flights.requestedFlightSegmentList[0].bestPricing.miles)  {
                    mejorOfertaDelDia = (flights.requestedFlightSegmentList[0].bestPricing.miles)
                    console.log('Mejor oferta del dia: ' + mejorOfertaDelDia)
                    mejorOfertaDelDia = 0
                }

                mejoresVuelos[0] = {
                    vuelo: {
                        Fecha: flights.flightList[0].departure.date,
                        Millas: flights.bestPricing.miles,
                        SmilesandMoney: flights.bestPricing.smilesMoney.miles + '/' + flights.bestPricing.smilesMoney.money,
                        Aerolinea: flightList[0].airline,
                        Duracion: flights.flightList[0].duration.hours +':' + flights.flightList[0].duration.minutes,
                        Escalas: flights.flightList[0].stops,
                        DuracionEscalas: flights.flightList[0].timeStop.hours + ':' + flights.flightList[12].timeStop.minutes,
                        Asientos: flights.flightList[0].availableSeats,
                        Cabina: flights.flightList[0].cabin,
                        Equipaje: flights.flightList[0].baggage.quantity
                    }
                }

                console.log({mejoresVuelos})
                setError(null);
                setIsLoading(false);
            } else {
                setError("Hubo un error ");
            }
        } catch (error) {
            setError("No pudimos hacer la solicitud para obtener los datos");
            console.log(error)
        }
    }

}