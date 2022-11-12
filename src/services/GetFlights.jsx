export const GetFlights = async (props, setError, setIsLoading, setFlights) => {

    let myHeaders = new Headers();
    myHeaders.append("x-api-key", "aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw");
    myHeaders.append("Region", "ARGENTINA");

    setIsLoading(true)

    const splitDateTemporary = `${props.fechaIda.split('-')}`
    //volvemos a separar la fecha porque si no, posicion 0 es solo 1 caracter y no 2022
    const splitDate = splitDateTemporary.split(',')
    const yearSelected = splitDate[0]
    const monthSelected = splitDate[1]
    const getNumberDaysInMonth = new Date(yearSelected, monthSelected, 0).getDate()

    let vuelos = []
    const llamadaAPI = `https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}-12&destinationAirportCode=${props.aeropuertoDestino}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoPartida}&tripType=2&forceCongener=false&r=ar`


    try {
        const response = await fetch(llamadaAPI, {headers: myHeaders });
        if (response.ok) {
            const flights = await response.json();
            console.log(flights.requestedFlightSegmentList[0].flightList)
            console.log(flights.requestedFlightSegmentList)
            //obtener tamaño del objeto
            console.log(Object.keys(flights.requestedFlightSegmentList[0].flightList).length)




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