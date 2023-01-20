    export function getDaysInMonth(fechaIda) {
        let dateToString = JSON.stringify(fechaIda)
        //separamos fecha y mes del string y eliminamos las comillas
        let splitDate = dateToString.split('-')
        const yearSelected = splitDate[0].slice(1)
        const monthSelected = splitDate[1].slice(0, -1)
       // let daysInMonth = new Date(yearSelected, monthSelected, 0).getDate()
       return new Date(yearSelected, monthSelected, 0).getDate()
    }