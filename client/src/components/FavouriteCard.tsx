import type {Favourite} from "../types/favourite.ts";
import {useState} from "react";
import {Pencil, Trash} from "lucide-react";
import LinkIcon from "./LinkIcon.tsx";
import {useEscapeModals} from "../events/keyboardEvents.ts";

interface Props {
    fav: Favourite,
    onEdit: (id: number, newFav: Favourite, storeInHistory: boolean) => void,
    onDelete: (id: number, storeInHistory: boolean) => void
}

function FavouriteCard({fav, onEdit = f => f, onDelete = f => f}: Props) {
    const [visibility, setVisibility] = useState(false);

    async function handleSub(e: any) {
        e.preventDefault();
        const {inputname, inputlink} = e.target.elements
        if (inputname.value == "" || inputlink.value == "") {
            return;
        }
        const favor = {
            id: fav.id,
            name: inputname.value,
            link: inputlink.value
        };
        onEdit(fav.id, favor, true)
        setVisibility(false)
    }

    useEscapeModals(visibility, setVisibility);

    return (
        <div>
            {
                visibility ? (
                    <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0"}>
                        <div
                            className={"bg-black/30 w-full h-full absolute flex justify-center items-center top-0 left-0"}
                            onClick={() => setVisibility(false)}></div>
                        <form id={"editFav"} onSubmit={handleSub}
                              className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[32%] bg-zinc-800 rounded-4xl z-10 border border-zinc-700/80"}>
                            <input type="hidden" name="id" value={fav.id}/>
                            <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                                <label className={"mb-2 text-lg"}>Nom</label>
                                <input type="text" name="inputname" id="inputname"
                                       className={"bg-zinc-900 p-2 w-[90%] rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                       autoComplete={"off"} required={true} defaultValue={fav.name}/>
                            </div>
                            <div className={"w-full flex flex-col justify-center items-center"}>
                                <label className={"mb-2 text-lg"}>Lien</label>
                                <input type="text" name="inputlink" id="inputlink"
                                       className={"bg-zinc-900 p-2 w-[90%] rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                       autoComplete={"off"} required={true} defaultValue={fav.link}/>
                            </div>
                            <button type="submit" className={"p-3 hover:bg-zinc-900/70 rounded-2xl text-xl"}>Confirm</button>
                        </form>
                    </div>
                ) : null
            }
            <div key={fav.id}
                 className={"bg-zinc-900 transition rounded-xl hover:bg-zinc-950/60 flex items-center justify-between overflow-hidden duration-100"}>
                <LinkIcon link={fav.link}></LinkIcon>
                <a href={fav.link} className={"py-4 w-[85%] cursor-default"}>{fav.name}</a>
                <div className={"w-fit flex  flex-row mr-2"}>
                    <button className={"p-2 hover:bg-zinc-700 rounded-2xl transition"} onClick={() => {
                        setVisibility(true)
                    }}><Pencil/></button>
                    <button className={"p-2 hover:bg-zinc-700 rounded-2xl transition"} onClick={() => {
                        onDelete(fav.id, true)
                    }}><Trash/></button>
                </div>
            </div>
        </div>
    )
}

export default FavouriteCard;