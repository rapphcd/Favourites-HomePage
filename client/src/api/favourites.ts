import axios from "axios";
import type {Favourite} from "../types/favourite.ts";

export const getFavourites = async () : Promise<Favourite[]> => {
    const response = await axios.get("http://localhost:8080/favourites");
    return response.data.favourites;
}

export const deleteFavourite = async (id : number) => {
    await axios.post("http://localhost:8080/delete", {
        id: id
    });
}

export const createFavourite = async (link : string) => {
    await axios.post("http://localhost:8080/create", {
        link: link
    });
}

