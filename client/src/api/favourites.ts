import axios from "axios";
import type {Favourite} from "../types/favourite.ts";

export const getFavourites = async () : Promise<Favourite[]> => {
    const response = await axios.get("http://localhost:8080/favourites");
    return response.data.favourites;
}

export const getFavourite = async (id: number) : Promise<Favourite> => {
    const response = await axios.get(`http://localhost:8080/favourites/${id}`);
    return response.data.favourite;
}

export const deleteFavourite = async (id : number) => {
    await axios.delete(`http://localhost:8080/favourites/delete/${id}`);
}

export const createFavourite = async (name: string, link : string) : Promise<Favourite> => {
    const res= await axios.post("http://localhost:8080/favourites/create", {
        link: link,
        name: name,
    });
    return res.data;
}

export const updateFavourites = async (updated : Favourite[]) => {
    await axios.put(`http://localhost:8080/favourites/update/`, {
        updated: updated,
    });
}

export const getExportedFavourites = async () => {
    const res = await axios.get("http://localhost:8080/favourites/export", {
        responseType: 'blob'
    })
    return res;
}


export const importFavourites = async (file: File) => {
    const data = new FormData();
    data.append('file', file);
    const res = await axios.post("http://localhost:8080/favourites/import", data, {
        headers: {
            "Content-Type": "multipart/form-data"
        }
    });
    return res.status;
}
