import {getFavourites, deleteFavourite, updateFavourite} from "../api/favourites.ts";
import {useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";
import FavouriteCard from "./FavouriteCard.tsx";

function Favourites() {
    const [favourites, setFavourites] = useState<Favourite[]>([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const data: Favourite[] = await getFavourites();
                setFavourites(data);
            } catch (error) {
                console.log(error)
            }
        }
        fetchFavourites();
    }, [])

    function deleteFav(id : number) : void{
        const newfavs : Favourite[] = [];
        for (const fav in favourites) {
            if(favourites[fav].id != id){
                newfavs.push(favourites[fav]);
            }
        }
        deleteFavourite(id);
        setFavourites(newfavs);
    }

    function editFav(id: number, newFav : Favourite){
        try {
            updateFavourite(id,newFav);
        } catch (err){
            console.log(err);
        }
    }

    return (
        <div className={"flex flex-col w-[40%] h-[90%] justify-around bg-zinc-800 items-center rounded-2xl gradient my-4 mx-2"} >
            <div className={"flex flex-col justify-around w-[90%] h-full"}>
                {
                    favourites.map((fav: Favourite) => (
                        <FavouriteCard key={fav.id} fav={fav} onEdit={editFav} onDelete={deleteFav}></FavouriteCard>
                    ))
                }
            </div>
        </div>
    )
}

export default Favourites;