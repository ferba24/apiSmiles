//import {useForm} from "./FormScript.jsx";
import { useForm } from "react-hook-form";

const Form = () => {
    const {values, handleChange, handleSubmit} = useForm();
}


export function SearchForm() {
    return (
        <>
            <form onSubmit=${() => console.log(handleSubmit)}>
                <label htmlFor="fecha-ida"> </label>
                <input
                    type="text"
                    name="fecha-vuelta"
                    id="fecha-ida"
                    value={values.fecha-ida}
                    onChange={handleChange}
                />
                <label htmlFor="fecha-vuelta"> </label>
                <input
                    type="text"
                    name="fecha-vuelta"
                    id="fecha-vuelta"
                    value={values.fecha-vuelta}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="aeropuertoIda"
                    name="aeropuertoIda"
                    value={aeropuertoIda}
                    onChange={handleChange}
                />
                <input
                    type="text"
                    id="aeropuertoVuelta"
                    name="aeropuertoVuelta"
                    value={aeropuertoVuelta}
                    onChange={handleChange}
                />
                <input
                    type="submit"
                    value="Buscar"/>
            </form>
        </>
    )
}