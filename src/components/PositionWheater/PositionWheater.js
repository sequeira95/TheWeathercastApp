import React, { useEffect, useRef, useState } from 'react'
import ForecastWheather from '../ForecastWheather/ForecastWheather';
import Spinner from '../spiner/Spinner';
import { AiOutlineArrowLeft,AiOutlineArrowRight } from "react-icons/ai";
import './style.css'

const APIURL={
    key:"59f140c79b74023cb8a9cb40726e4bb5"
}
function PositionWheater(){
    const [searches, setSearches] =useState('')
    const [city,setCity] = useState({})
    const [forecast, setForecast] = useState({})

    const search = (evt) =>{
        evt.preventDefault()
            fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searches}&limit=5&units=metric&appid=${APIURL.key}&lang=sp,es`)
                .then(res=>res.json())
                .then(data=>{
                    setCity(data)
                })
                .catch(error=>alert("We have a problem, please try again later"))

        evt.preventDefault()
            fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${searches}&units=metric&appid=${APIURL.key}&lang=sp, es`)
                .then(response=>response.json())
                .then(forecastData=>{
                    setForecast(forecastData)
                })
                .catch(error=>alert("We have a problem, please try again later"))

        
    }
    const onIput=(evt)=>{
        setSearches(evt.target.value)
    }

    const positionData = (position)=>{
        const {latitude, longitude}= position.coords;
        fetch(`https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${latitude}&lon=${longitude}&appid=${APIURL.key}&lang=sp`)
            .then(res=>res.json())
            .then(data=>setCity(data))
            .catch(error=>alert("We have a problem, please try again later"))
        
        fetch(`https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=${latitude}&lon=${longitude}&appid=${APIURL.key}&lang=sp`)
            .then(response=>response.json())
            .then(forecastData=>{
                setForecast(forecastData)
            })
            .catch(error=>alert("We have a problem, please try again later"))
    }

    useEffect (()=>{

        navigator.geolocation.getCurrentPosition(positionData)
    }, [])

    const dateInfo =(d)=>{
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    
    let day = days[d.getDay()]
    let date = d.getDate()
    let month = months[d.getMonth()]
    let year = d.getFullYear()

    return `${day} ${date} ${month} ${year}`
    }
    const slide=useRef(null)

    const next= () =>{
        if(slide.current){
            slide.current.scrollLeft+= 400
        }
    }
    const previous = ()=>{
        if(slide.current){
            slide.current.scrollLeft-= 400
        }
    }
    let wheaterBackground = (city && city.weather && city.weather[0] && city.weather[0].main) || "Clouds"
    let isWeatherKnow ={
        "Clouds":true,
        "Rain":true,
        "Haze":true,
        "Snow":true,
        "Clear":true,
        "Drizzle":true
    }
    
    return(
        <div className={`container ${isWeatherKnow[wheaterBackground]? wheaterBackground:"Clouds"}`}>
            <div className='searchContainer'>
                <form onSubmit={search}>
                    <input type="text"
                    className='searchBar'
                    placeholder='Search...'
                    onInput={onIput}/>
                </form>
            </div>
        {city.name ?
        <div>
            <div>
                <div className='locationContainer'>
                    <div className='location'>
                        {city.name},{city.sys.country}
                        </div>
                    <div className='date'>
                        {dateInfo(new Date())}
                    </div>
                </div>
                <div className='wheaterContainer'>
                    <div className='temp'>
                        {city.main.temp}°c
                    </div>
                    <div className='wheater'>
                        {city.weather[0].main}
                    </div>
                </div>
            </div>
        </div>
        : <Spinner/>}
        {/* prueba card */}
        <div className='forecastFather'>
        <button className='btnLeft' onClick={previous}><AiOutlineArrowLeft/></button>
        <div className='forecastContainer' ref={slide}>
        {forecast.list ?forecast.list.map((e)=>{
            return<>
        <ForecastWheather className="scroll"
        key={e.dt}
        day={e.dt_txt} 
        temp={e.main.temp}
        wheater={e.weather[0].main}/>
        </>})
        :<Spinner/>}
        </div>
        <button className='btnRigth' onClick={next}><AiOutlineArrowRight/></button>
        </div>
        </div>
        
    )
}
export default React.memo(PositionWheater)