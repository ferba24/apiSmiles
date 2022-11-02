import {useState} from "react";

let todayDate = new Date().toLocaleDateString('es-CL', { year:"numeric", month:"numeric", day:"numeric"})

export function SearchForm(props) {
    const prueba2 = new Date().toISOString().split('T')[0]
    const [datos, setDatos] = useState({
        fechaIda: prueba2,
        fechaVuelta: prueba2,
        aeropuertoPartida: '',
        aeropuertoDestino: ''
    })

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        props.findResultspropname(datos)
    };
    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos({
            ...datos,
            [event.target.name] : event.target.value
        })
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="fecha-ida"> </label>
                <input
                    type="text"
                    name="fechaIda"
                    id="fechaIda"
                    value={datos.fechaIda}
                    onChange={handleInputChange}
                />
                <label htmlFor="fecha-vuelta"> </label>
                <input
                    type="text"
                    name="fechaVuelta"
                    id="fechaVuelta"
                    value={datos.fechaVuelta}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    id="aeropuertoPartida"
                    name="aeropuertoPartida"
                    value={datos.aeropuertoPartida}
                    onChange={handleInputChange}
                />
                <input
                    type="text"
                    id="aeropuertoDestino"
                    name="aeropuertoDestino"
                    value={datos.aeropuertoDestino}
                    onChange={handleInputChange}
                />
                <input
                    type="submit"
                    value="Buscar ✈"/>
            </form>
        </>
    )
}