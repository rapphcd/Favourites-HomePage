import {getFavourites, deleteFavourite, updateFavourite, createFavourite} from "../api/favourites.ts";
import {useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";
import FavouriteCard from "./FavouriteCard.tsx";
import AddButton from "./AddButton.tsx";

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

    function createFav(newFav : { name: string, link: string}) : Promise<Favourite> {
        return createFavourite(newFav.name, newFav.link);
    }

    return (
        <div className={"flex flex-col w-[30%] h-full max-h-[95%] justify-around bg-zinc-800 outline outline-white/10 items-center rounded-2xl m-4"} >
            <div className={"flex flex-col justify-around w-full h-full p-2"}>
                <div className={"flex flex-col justify-start h-full gap-2"}>
                    {
                        favourites.map((fav: Favourite) => (
                            <FavouriteCard key={fav.id} fav={fav} onEdit={editFav} onDelete={deleteFav}></FavouriteCard>
                        ))
                    }
                </div>
                <AddButton favourites={favourites} setFavourites={setFavourites} onCreate={createFav}></AddButton>
            </div>
        </div>
    )
}

export default Favourites;