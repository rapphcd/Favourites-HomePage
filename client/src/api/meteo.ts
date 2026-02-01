import type {MeteoData} from "../types/meteodata.ts";
import axios from "axios";

export const getMeteo = async (lon: number, lat: number) : Promise<MeteoData> => {
    const response = await axios.get("http://localhost:8080/meteo", {
        params: {
            lon: lon,
            lat: lat,
        }
    });
    return response.data.meteo;
}