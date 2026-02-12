import {useEffect, useState} from "react";
import {getMeteo} from "../api/meteo.ts";
import type {MeteoData} from "../types/meteodata.ts";


function MeteoWidget() {
    const [longitude, setLongitude] = useState(-73.935242);
    const [latitude, setLatitude] = useState(40.730610);
    const [meteo, setMeteo] = useState<MeteoData>({
        city: "",
        country: "",
        description: "",
        icon: "01d",
        main: "",
        success: false,
        temp: "",
        timestamp: 0,
        lon: 0,
        lat: 0
    });

    useEffect(() => {
        const success = (position: GeolocationPosition) => {
            setLongitude(position.coords.longitude)
            setLatitude(position.coords.latitude)
        }
        navigator.geolocation.getCurrentPosition(success, () => {
            console.log('error')
        })
        const showMeteo = async () => {
            try {
                const apimeteo = await getMeteo(longitude, latitude)

                if (apimeteo.success) {
                    setMeteo(apimeteo)
                }
            } catch (e) {
                console.log(e)
            }
        }
        showMeteo()
    }, [latitude, longitude]);

    const getTempColor = (temp: number) => {
        if (temp <= 10) {
            return "text-sky-400"
        }
        if (temp >= 30) {
            return "text-red-500"
        }
        if (temp >= 25) {
            return "text-orange-400"
        }

    }

    return (
        <div
            className={" flex flex-col items-center backdrop-blur-md bg-white/5 p-5 rounded-2xl border border-white/10 text-xl cursor-default hover:scale-[100.5%] select-none transition duration-75"}>
            <div className={"flex flex-row"}>
                <div className={"flex flex-col"}>
                    <p className={`${getTempColor(Number(meteo?.temp))} text-4xl`}>
                        {meteo?.temp}°C
                    </p>
                    <p className="">
                        {meteo?.main}
                    </p>
                </div>
                <img className={"pointer-events-none"} src={`https://openweathermap.org/img/wn/${meteo?.icon}@2x.png`}
                     alt={"aa"}/>
            </div>
            <p className="text-zinc-500 text-sm">
                {meteo?.city}, {meteo?.country}
            </p>
        </div>
    )
}

export default MeteoWidget