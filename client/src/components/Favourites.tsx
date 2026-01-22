import { getFavourites } from "../api/favourites.ts";
import {useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";

function Favourites(){
    const [favourites, setFavourites] = useState<Favourite[]>([]);

    useEffect(()=> {
        const fetchFavourites = async () => {
            try {
                const data : Favourite[] = await getFavourites();
                setFavourites(data);
            } catch (error){
                console.log(error)
            }
        }
        fetchFavourites();
    }, [])

    return (
        <div className={"flex flex-col"}>
                {
                    favourites.map((fav : Favourite) => (
                        <a key={fav.id} href={fav.link}>{fav.link}</a>
                    ))
                }
        </div>
    )
}

export default Favourites;