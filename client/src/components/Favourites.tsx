import {
    getFavourites,
    deleteFavourite,
    createFavourite,
    getFavourite,
    updateFavourites
} from "../api/favourites.ts";
import {type ReactNode, useEffect, useState} from "react";
import type {Favourite} from "../types/favourite.ts";
import FavouriteCard from "./FavouriteCard.tsx";
import AddButton from "./AddButton.tsx";
import type {Action} from "../types/action.ts";
import {useSortable} from "@dnd-kit/react/sortable";
import {DragDropProvider} from "@dnd-kit/react";

interface Props {
    id: number,
    index: number,
    children: ReactNode,
    data: Favourite
}

function Sortable({id, index, children, data}: Props) {
    const {ref} = useSortable({id, index, data});
    return (
        <li ref={ref} className={"item cursor-grab"}>{children}</li>
    )
}

function Favourites() {
    const [favourites, setFavourites] = useState<Favourite[]>([]);
    const [actionsHistory, setActionsHistory] = useState<Action[]>([]);

    useEffect(() => {
        const fetchFavourites = async () => {
            try {
                const data: Favourite[] = await getFavourites();
                setFavourites(data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchFavourites();
    }, [])

    function deleteFav(id: number, storeInHistory: boolean): void {
        const newfavs: Favourite[] = [];
        const datas = {
            name: "",
            link: ""
        };
        for (const fav in favourites) {
            if (favourites[fav].id != id) {
                newfavs.push(favourites[fav]);
            } else {
                datas.name = favourites[fav].name;
                datas.link = favourites[fav].link;
            }
        }

        deleteFavourite(id);

        setFavourites(newfavs);

        if (storeInHistory) {
            setActionsHistory([...actionsHistory, {
                type: "delete",
                datas: datas
            }]);
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
                            link: previous.link,
                            position: previous.position
                        }
                    }]);
                });
            }

            let oldFav;
            for (const fav of favourites) {
                if (fav.id === id) {
                    oldFav = fav;
                }
            }
            const newfavs: Favourite[] = [];
            for (const fav of Array.from(favourites.sort((a, b) => a.position > b.position ? 1 : -1))) {
                if (fav.id != id) {
                    if (oldFav != null && oldFav.position != newFav.position) {
                        if(newFav.position >= oldFav.position){
                            if (fav.position <= newFav.position && fav.position > oldFav.position) {
                                fav.position -= 1;
                            }
                        } else {
                            if (fav.position >= newFav.position && fav.position < oldFav.position) {
                                fav.position += 1;
                            }
                        }
                    }
                    newfavs.push(fav);
                }
            }

            newfavs.push(newFav);
            setFavourites(newfavs);
            updateFavourites(newfavs);
        } catch (err) {
            console.log(err);
        }
    }

    function createFav(toCreate: { name: string, link: string }, storeInHistory: boolean) {
        try {
            createFavourite(toCreate.name, toCreate.link).then((newFav: Favourite) => {
                setFavourites([...favourites, newFav]);

                if (storeInHistory) {
                    const action: Action = {
                        type: "create",
                        datas: {
                            id: newFav.id
                        }
                    };
                    setActionsHistory([...actionsHistory, action]);
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    function handleUndo() {
        if (actionsHistory.length === 0) return;

        const lastAction: Action | undefined = actionsHistory[actionsHistory.length - 1];

        setActionsHistory(actionsHistory.slice(0, -1));

        switch (lastAction?.type) {
            case "create": {
                const id: number = lastAction.datas.id;
                deleteFav(id, false);
                break;
            }
            case "delete": {
                const name: string = lastAction.datas.name;
                const link: string = lastAction.datas.link;
                createFav({name, link}, false);
                break;
            }
            case "edit": {
                const {id, name, link, position} = lastAction.datas;
                const restoredFav = {id, name, link, position};
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
            document.removeEventListener("keydown", keyHandler);
        }
    }, [actionsHistory]);

    const dragEndHandler = (e: any) => {
        const {source} = e.operation;
        const newFav: Favourite = {
            id: source.id,
            link: source.data.link,
            name: source.data.name,
            position: source.index+1
        };
        editFav(source.id, newFav, true);
    }

    return (
        <div
            className={"flex flex-col w-[40%] h-full max-h-[95%] justify-around backdrop-blur-lg bg-white/5 border border-white/10 items-center rounded-2xl mx-4 transition duration-75 overflow-y-scroll scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden mb-2"}>
            <div className={"flex flex-col justify-around w-full h-full p-2 gap-2"}>
                <DragDropProvider onDragEnd={dragEndHandler}>
                    <ul className={"list flex flex-col justify-start h-full gap-2 "}>
                        {
                            favourites.sort((a, b) => a.position > b.position ? 1 : -1).map((fav: Favourite, index) => {
                                return (
                                    <Sortable key={fav.id} id={fav.id} index={index} data={fav}><FavouriteCard
                                        fav={fav} onEdit={editFav} onDelete={deleteFav}></FavouriteCard></Sortable>
                                )
                            })
                        }
                    </ul>
                    <AddButton onCreate={createFav}></AddButton>
                </DragDropProvider>
            </div>
        </div>
    )
}

export default Favourites;