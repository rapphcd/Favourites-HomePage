import {getFavourites, deleteFavourite, updateFavourite, createFavourite, getFavourite} from "../api/favourites.ts";
import {useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";
import FavouriteCard from "./FavouriteCard.tsx";
import AddButton from "./AddButton.tsx";
import type {Action} from "../types/action.ts";

function Favourites() {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const [actionsHistory, setActionsHistory] = useState<Action[]>([]);

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

    function deleteFav(id: number, storeInHistory: boolean): void {
        const newfavs: Favourite[] = [];
        const datas = {
            name: "",
            link: ""
        }
        for (const fav in favourites) {
            if (favourites[fav].id != id) {
                newfavs.push(favourites[fav]);
            } else {
                datas.name = favourites[fav].name
                datas.link = favourites[fav].link
            }
        }

        deleteFavourite(id);

        setFavourites(newfavs);

        if (storeInHistory) {
            setActionsHistory([...actionsHistory, {
                type: "delete",
                datas: datas
            }])
        }
    }

    function editFav(id: number, newFav: Favourite, storeInHistory: boolean) {
        try {
            if (storeInHistory) {
                getFavourite(id).then((previous) => {
                    setActionsHistory([...actionsHistory, {
                        type: "edit",
                        datas: {
                            id: id,
                            name: previous.name,
                            link: previous.link
                        }
                    }])
                });
            }
            const newfavs: Favourite[] = [];
            for (const fav in favourites) {
                if (favourites[fav].id != id) {
                    newfavs.push(favourites[fav]);
                }
            }
            setFavourites([...newfavs, newFav])
            updateFavourite(id, newFav);
        } catch (err) {
            console.log(err);
        }
    }

    function createFav(toCreate: { name: string, link: string }, storeInHistory: boolean) {
        try {
            createFavourite(toCreate.name, toCreate.link).then((newFav: Favourite) => {
                setFavourites([...favourites, newFav])

                if (storeInHistory) {
                    const action: Action = {
                        type: "create",
                        datas: {
                            id: newFav.id
                        }
                    }
                    setActionsHistory([...actionsHistory, action])
                }
            })
        } catch (err) {
            console.log(err)
        }
    }

    function handleUndo() {
        if (actionsHistory.length === 0) return;

        const lastAction: Action | undefined = actionsHistory[actionsHistory.length - 1]

        setActionsHistory(actionsHistory.slice(0, -1));

        switch (lastAction?.type) {
            case "create": {
                const id: number = lastAction.datas.id;
                deleteFav(id, false)
                break;
            }
            case "delete": {
                const name: string = lastAction.datas.name;
                const link: string = lastAction.datas.link;
                createFav({name, link}, false);
                break;
            }
            case "edit": {
                const {id, name, link} = lastAction.datas;
                const restoredFav = {id, name, link};
                editFav(id, restoredFav, false);
                break;
            }
            default:
                return;
        }
    }

    useEffect(() => {
        function keyHandler(e: KeyboardEvent) {
            if (e.ctrlKey && e.key === "z") {
                e.preventDefault();
                handleUndo();
            }
        }

        document.addEventListener("keydown", keyHandler);

        return () => {
            document.removeEventListener("keydown", keyHandler)
        }
    }, [actionsHistory]);

    return (
        <div
            className={"flex flex-col w-[40%] h-full max-h-[95%] justify-around backdrop-blur-lg bg-white/5 border border-white/10 items-center rounded-2xl mx-4 transition duration-75 overflow-y-scroll scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"}>
            <div className={"flex flex-col justify-around w-full h-full p-2 gap-2"}>
                <div className={"flex flex-col justify-start h-full gap-2"}>
                    {
                        favourites.map((fav: Favourite) => (
                            <FavouriteCard key={fav.id} fav={fav} onEdit={editFav} onDelete={deleteFav}></FavouriteCard>
                        ))
                    }
                </div>
                <AddButton onCreate={createFav}></AddButton>
            </div>
        </div>
    )
}

export default Favourites;