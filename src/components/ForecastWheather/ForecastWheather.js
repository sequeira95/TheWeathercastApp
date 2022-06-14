import React, { useEffect, useState } from 'react'
import'./style.css'

export default function ForecastWheather({
    day,
    temp,
    wheater
}){
    const[dia, setDia] = useState("")
    const [hour, setHour]=useState("")
    useEffect(()=>{
        let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        setDia(days[new Date (day).getDay()])
        setHour([new Date(day).getHours()])
    },[day])

    let wheaterOpcion = wheater
    


    
    return(
        <>
        <div >
            <article className="box weather">
            <div className="icon bubble black">
                <div className="spin">
                    <div className="weatherIcon">
                        <div className={wheaterOpcion}>
                            <div className="inner"></div>
                        </div>
                    </div>
                </div>
            </div>
            
            <h1>{dia},<br></br>{hour}H</h1>
            <span className="temperature">{temp}&deg;</span>
            <span className="high-low">{wheater}</span>
            </article>
        </div>
        </>
    )
}