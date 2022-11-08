export const GetFlights = async (props, setError, setIsLoading, setFlights) => {

    var myHeaders = new Headers();
    myHeaders.append("x-api-key", "aJqPU7xNHl9qN3NVZnPaJ208aPo2Bh2p2ZV844tw");


    setIsLoading(true)
    const llamadaAPI = `https://api-air-flightsearch-prd.smiles.com.br/v1/airlines/search?adults=1&cabinType=all&children=0&currencyCode=ARS&departureDate=${props.fechaIda}-11&destinationAirportCode=${props.aeropuertoDestino}&infants=0&isFlexibleDateChecked=false&originAirportCode=${props.aeropuertoPartida}&tripType=2&forceCongener=false&r=ar`

    try {
        const response = await fetch(llamadaAPI, {headers: myHeaders });
        if (response.ok) {
            const flights = await response.json();
            console.log(flights)
            console.log(flights.requestedFlightSegmentList)
            setFlights(flights.requestedFlightSegmentList);
            setError(null);
            setIsLoading(false);
        } else {
            setError("Hubo un error ");
        }
    } catch (error) {
        setError("No pudimos hacer la solicitud para obtener los datos");
    }

}