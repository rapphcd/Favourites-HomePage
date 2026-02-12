import {useState} from "react";
import {CirclePlus} from "lucide-react";
import {useEscapeModals} from "../events/keyboardEvents.ts";
import {createPortal} from "react-dom";

interface Props {
    onCreate: (fav: {
        name: string,
        link: string
    }, storeInHistory: boolean) => void
}

function AddButton({onCreate}: Props) {
    const [visibility, setVisibility] = useState(false);

    function handleSub(e: any) {
        e.preventDefault();

        const {inputname, inputlink} = e.target.elements

        if (inputname.value == "" || inputlink.value == "") {
            return;
        }
        const toCreate = {
            name: inputname.value,
            link: inputlink.value
        };

        onCreate(toCreate, true)
        setVisibility(false)
    }

    useEscapeModals(visibility, setVisibility);

    return (
        <div>
            {
                visibility ? (
                    createPortal(<div className={"w-full h-full absolute flex justify-center items-center top-0 left-0"}>
                        <div
                            className={"bg-black/20 backdrop-blur-[2px] w-full h-full absolute flex justify-center items-center top-0 left-0"}
                            onClick={() => setVisibility(false)}></div>
                        <form id={"editFav"} onSubmit={handleSub}
                              className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[32%] backdrop-blur-xl bg-white/10 rounded-4xl z-10 border border-white/10"}>
                            <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                                <label className={"mb-2 text-lg"}>Nom</label>
                                <input type="text"
                                       className={"backdrop-blur-xl p-2 w-[90%] rounded-xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                       autoComplete={"off"} name="inputname" id="inputname" required={true}
                                       defaultValue={""}/>
                            </div>
                            <div className={"w-full flex flex-col justify-center items-center"}>
                                <label className={"mb-2 text-lg"}>Lien</label>
                                <input type="text"
                                       className={"backdrop-blur-xl p-2 w-[90%] rounded-xl focus:border-none focus:outline-1 focus:outline-white/50"}
                                       autoComplete={"off"} name="inputlink" id="inputlink" required={true}
                                       defaultValue={""}/>
                            </div>
                            <button type="submit" className={"p-3 hover:backdrop-blur-xl rounded-2xl text-xl"}>Confirm</button>
                        </form>
                    </div>, document.body)
                ) : null
            }
            <div className={" flex items-center justify-center"}>
                <div
                    className={"w-[20%] bg-zinc-900/20 hover:bg-zinc-900/30 rounded-full flex items-center justify-center overflow-hidden p-2 cursor-default transition select-none"}
                    onClick={() => {
                        setVisibility(true)
                    }}>
                    <CirclePlus/>
                </div>
            </div>
        </div>

    )
}

export default AddButton