import {useEffect, useState} from "react";
import {getMeteo} from "../api/meteo.ts";
import type {MeteoData} from "../types/meteodata.ts";


function MeteoWidget() {
    const [meteo, setMeteo] = useState<MeteoData>({
        city: "",
        country: "",
        description: "",
        icon: "",
        main: "",
        success: false,
        temp: ""
    });

    useEffect(() => {
        const showMeteo = async () => {
            try {
                const apimeteo = await getMeteo(1.9086066, 47.9027336)

                if(meteo.success){
                    setMeteo(apimeteo)
                }
            } catch (e) {
                console.log(e)
            }
        }
        showMeteo()
    }, []);

    return (
        <div className={"bg-zinc-800 p-5 rounded-2xl outline outline-white/10 text-xl cursor-default hover:scale-[100.5%] hover:shadow-md select-none transition duration-75"}>
            {meteo?.temp}<br/>
            {meteo?.city}<br/>
            {meteo?.country}<br/>
            {meteo?.icon}<br/>
            {meteo?.main}<br/>
            {meteo?.description}<br/>
        </div>
    )
}

export default MeteoWidget