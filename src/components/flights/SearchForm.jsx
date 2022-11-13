import {useState} from "react";
import {currentDateFormat} from '../../services/GetCurrentDate.js'
import { ArrowUturnLeftIcon, ArrowLongRightIcon,BeakerIcon } from '@heroicons/react/24/solid'

const cssField = "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
const cssLabel = "block text-sm font-medium text-gray-700"

const cssInput = "w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"

const cssButton = "flex mx-auto text-white bg-indigo-500 border-0 py-2 px-8 focus:outline-none hover:bg-indigo-600 rounded text-lg"

export function SearchForm(props) {

    const prueba2 = new Date().toISOString().split('T')[0]

    const [datos, setDatos] = useState({
        fechaIda: currentDateFormat,
        fechaVuelta: '',
        aeropuertoPartida: '',
        aeropuertoDestino: '',
        adults: '1',
        kids: '0',
        babies: '0'
    })

    const handleSubmit = (event) => {
        if (event) event.preventDefault();
        props.findResultspropname(datos)
    };
    const handleInputChange = (event) => {
        // console.log(event.target.name)
        // console.log(event.target.value)
        setDatos(
            {
            ...datos,
            [event.target.name] : event.target.value
        }
        )
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container px-2 py-2 mx-auto">
                    <div className="lg:w-1/1 md:w-2/3 mx-auto">
                        <div className="flex flex-wrap -m-2">

                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="fecha-ida" className={cssLabel}>➡ Ida</label>
                                    <input
                                        type="month"
                                        name="fechaIda"
                                        id="fechaIda"
                                        max="2028-01"
                                        min={currentDateFormat}
                                        className={cssInput}
                                        value={datos.fechaIda}
                                        onChange={handleInputChange}
                                        required

                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>↩ Vuelta (opcional)</label>
                                    <input
                                        type="month"
                                        name="fechaVuelta"
                                        id="fechaVuelta"
                                        className={cssField}
                                        onChange={handleInputChange}
                                    />
                                </div>
                        </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>Aeropuerto Partida</label>
                                    <input
                                        type="text"
                                        id="aeropuertoPartida"
                                        name="aeropuertoPartida"
                                        className={cssField}
                                        value={datos.aeropuertoPartida}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/2">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>Aeropuerto Destino</label>
                                    <input
                                        type="text"
                                        id="aeropuertoDestino"
                                        name="aeropuertoDestino"
                                        className={cssField}
                                        value={datos.aeropuertoDestino}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/6">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>🧑 Adultos</label>
                                    <input
                                        type="number"
                                        id="adults"
                                        name="adults"
                                        className={cssField}
                                        value={datos.adults}
                                        onChange={handleInputChange}
                                        required
                                        min="1"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/6">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>🧒 Niños</label>
                                    <input
                                        type="number"
                                        id="kids"
                                        name="kids"
                                        className={cssField}
                                        value={datos.kids}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-1/6">
                                <div className="relative">
                                    <label htmlFor="fecha-vuelta" className={cssLabel}>👶 Bebes</label>
                                    <input
                                        type="number"
                                        id="baby"
                                        name="baby"
                                        className={cssField}
                                        value={datos.babies}
                                        onChange={handleInputChange}
                                        min="0"
                                    />
                                </div>
                            </div>
                            <div className="p-2 w-3/6 justify-end flex-col flex">
                                <div className="relative">
                                    <label htmlFor="classes" className={cssLabel}>💺 Clase</label>
                                    <select name="classes"
                                            id="classes"
                                            onChange={handleInputChange}
                                            className={`bg-gray-100 ${cssField}` }  >
                                        <option value="allClasses">Todas las clases</option>
                                        <option value="economic">Economica</option>
                                        <option value="executive">Ejecutiva</option>

                                    </select>
                                </div>
                            </div>


                            <div className="p-2 w-full">
                                <input
                                    type="submit"
                                    value="Buscar ✈"
                                    className={cssButton}
                                />
                            </div>
                            <div className="p-2 w-full pt-2 mt-8 border-t border-gray-200 text-center">
                            </div>
                        </div>
                    </div>
                </div>

            </form>
        </>
    )
}