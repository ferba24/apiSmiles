import {currentDateFormat} from './GetCurrentDate.js'

export const GetFlights = async (props, setError, setIsLoading, setFlights) => {

    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw");
    myHeaders.append("Region", "ARGENTINA");


    let vuelos = []


    setIsLoading(true)
        //convertimos el objeto fecha en string
        let dateToString = JSON.stringify(`${props.fechaIda}`)
        //tomamos la fecha ingresada por el usuario, la separamos para calcular cuantos dias tiene el mes
        let splitDate = dateToString.split('-')
        //separamos fecha y mes del string
        const yearSelected = splitDate[0]
        const monthSelected = splitDate[1]
        let getNumberDaysInMonth = new Date(yearSelected, monthSelected, 0).getDate()

        //definimos dia actual por si el usuario busca vuelos para este mes asi no buscamos dias anteriores
            const today = new Date().getDate()
            let initialCounter = 0


            if (currentDateFormat == `${props.fechaIda}`) {
                initialCounter = today
            } else {
                initialCounter = 1
            }

        for (let i = initialCounter; i < getNumberDaysInMonth ; i++) {
            console.log('contador dias: ' + i)
            const llamadaAPI = `https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}-${i}&destinationAirportCode=${props.aeropuertoDestino}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoPartida}&tripType=2&forceCongener=false&r=ar`

            try {
                const response = await fetch(llamadaAPI, {headers: myHeaders });
                if (response.ok) {
                    const flights = await response.json();
                    console.log(flights.requestedFlightSegmentList[0].flightList)
                    console.log(flights.requestedFlightSegmentList)
                    //obtener tamaño del objeto
                    console.log(Object.keys(flights.requestedFlightSegmentList[0].flightList).length)

                    vuelos.push(flights)

                    setFlights(flights.requestedFlightSegmentList[0]);
                    setError(null);
                    setIsLoading(false);
                } else {
                    setError("Hubo un error ");
                }
            } catch (error) {
                setError("No pudimos hacer la solicitud para obtener los datos");
            }
        }



}