import axios from "axios";
import type {Favourite} from "../types/favourite.ts";

export const getFavourites = async () : Promise<Favourite[]> => {
    const response = await axios.get("http://localhost:8080/favourites");
    return response.data.favourites;
}

export const deleteFavourite = async (id : number) => {
    await axios.delete(`http://localhost:8080/delete/${id}`);
}

export const createFavourite = async (link : string, name: string) => {
    await axios.post("http://localhost:8080/create", {
        link: link,
        name: name,
    });
}

export const updateFavourite = async (id: number, updated : Favourite) => {
    await axios.put(`http://localhost:8080/update/${id}`, {
        updated: updated,
    });
}

