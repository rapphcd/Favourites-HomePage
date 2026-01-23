import {getFavourites, deleteFavourite} from "../api/favourites.ts";
import {useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";

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

    return (
        <div
            className={"flex flex-col w-[40%] h-[90%] justify-around bg-zinc-800 items-center rounded-2xl gradient my-4 mx-2"}>
            <div className={"flex flex-col justify-around w-[90%] h-full"}>
                {
                    favourites.map((fav: Favourite) => (
                        <div key={fav.id} className={"bg-zinc-900 rounded-xl flex items-center justify-between overflow-hidden"}>
                            <a href={fav.link} className={"p-4 w-[85%]"}>{fav.name}</a>
                            <div className={"w-fit flex flex-row"}>
                                <button className={"p-4 hover:bg-zinc-700"}>EDIT</button>
                                <button className={"p-4 hover:bg-zinc-700"} onClick={() => {
                                    deleteFav(fav.id)
                                }}>DEL</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default Favourites;