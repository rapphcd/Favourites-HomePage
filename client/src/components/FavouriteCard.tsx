import type {Favourite} from "../types/favourite.ts";
import {useState} from "react";
import {Pencil, Trash} from "lucide-react";
import LinkIcon from "./LinkIcon.tsx";
import {useEscapeModals} from "../events/keyboardEvents.ts";
import Modal from "./Modal.tsx";

interface Props {
    fav: Favourite,
    onEdit: (id: number, newFav: Favourite, storeInHistory: boolean) => void,
    onDelete: (id: number, storeInHistory: boolean) => void
}

function FavouriteCard({fav, onEdit = f => f, onDelete = f => f}: Props) {
    const [visibility, setVisibility] = useState(false);

    async function handleSub(e: any) {
        e.preventDefault();
        const {inputname, inputlink, inputpos} = e.target.elements;
        if (inputname.value == "" || inputlink.value == "" || inputpos.value == "") {
            return;
        }
        const favor = {
            id: fav.id,
            name: inputname.value,
            link: inputlink.value,
            position: parseInt(inputpos.value)
        };
        onEdit(fav.id, favor, true);
        setVisibility(false);
    }

    useEscapeModals(visibility, setVisibility);

    return (
        <div>
            {

                visibility ? (
                        <Modal setVisibility={setVisibility}>
                            <form id={"editFav"} onSubmit={handleSub}
                                  className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[32%] backdrop-blur-xl bg-white/10 rounded-4xl z-10 border border-white/10"}>
                                <input type="hidden" name="id" value={fav.id}/>
                                <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                                    <label className={"mb-2 text-lg"}>Nom</label>
                                    <input type="text" name="inputname" id="inputname"
                                           className={"backdrop-blur-xl p-2 w-[90%] rounded-xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                           autoComplete={"off"} required={true} defaultValue={fav.name}/>
                                </div>
                                <div className={"w-full flex flex-col justify-center items-center"}>
                                    <label className={"mb-2 text-lg"}>Lien</label>
                                    <input type="text" name="inputlink" id="inputlink"
                                           className={"backdrop-blur-xl p-2 w-[90%] rounded-xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                           autoComplete={"off"} required={true} defaultValue={fav.link}/>
                                </div>
                                <div className={"w-full flex flex-col justify-center items-center"}>
                                    <label className={"mb-2 text-lg"}>Position</label>
                                    <input type="number" name="inputpos" id="inputpos"
                                           className={"backdrop-blur-xl p-2 w-[90%] rounded-xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                           autoComplete={"off"} required={true} defaultValue={fav.position}/>
                                </div>
                                <button type="submit" className={"p-3 hover:backdrop-blur-xl rounded-2xl text-xl"}>Confirm</button>
                            </form>
                        </Modal>
                ) : null
            }
            <div
                 className={"backdrop-blur-lg rounded-xl hover:bg-zinc-400/10 flex items-center justify-between overflow-hidden transition-transform duration-300 ease-in-out"}>
                <LinkIcon link={fav.link}></LinkIcon>
                <a href={fav.link} className={"py-4 w-[85%] cursor-default text-nowrap overflow-hidden text-ellipsis whitespace-nowrap"}>{fav.name}</a>
                <div className={"w-fit flex  flex-row mr-2"}>
                    <button className={"p-2 hover:backdrop-blur-xl rounded-2xl transition-none"} onClick={() => {
                        setVisibility(true);
                    }}><Pencil/></button>
                    <button className={"p-2 hover:backdrop-blur-xl rounded-2xl transition-none"} onClick={() => {
                        onDelete(fav.id, true);
                    }}><Trash/></button>
                </div>
            </div>
        </div>
    )
}

export default FavouriteCard;