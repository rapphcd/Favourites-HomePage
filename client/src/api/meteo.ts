import type {MeteoData} from "../types/meteodata.ts";
import axios from "axios";

export const getMeteo = async (lon: number, lat: number) : Promise<MeteoData> => {
    const key : string = import.meta.env.VITE_API_KEY;

    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&units=metric&lon=${lon}&appid=${key}`)

    if(response.data.cod != 200){

        const error = {
            success: false,
            temp: "",
            main: "",
            description: "",
            city: "",
            country: "",
            icon: "",
        }

        return error;
    } else {

        const datas = {
            success: true,
            temp: response.data.main.temp,
            main: response.data.weather[0].main,
            description: response.data.weather[0].description,
            city: response.data.name,
            country: response.data.sys.country,
            icon: response.data.weather[0].icon,
        }

        return datas;
    }
}