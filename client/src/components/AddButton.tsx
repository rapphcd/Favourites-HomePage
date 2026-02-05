import {useState} from "react";
import {CirclePlus} from "lucide-react";
import {useEscapeModals} from "../events/keyboardEvents.ts";

interface Props {
    onCreate: (fav : {
        name: string,
        link: string
    }, storeInHistory: boolean) => void
}

function AddButton({onCreate} : Props){
    const [visibility, setVisibility] = useState(false);

    function handleSub(e : any){
        e.preventDefault();

        const {inputname,inputlink} = e.target.elements

        if( inputname.value == "" || inputlink.value == "") {
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
                    <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0"}>
                        <div className={"bg-black/30 w-full h-full absolute flex justify-center items-center top-0 left-0"} onClick={()=>setVisibility(false)}></div>
                        <form id={"editFav"} onSubmit={handleSub} className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[30%] bg-zinc-800 rounded-4xl z-10 border border-zinc-700/80"}>
                            <input type="text" className={"bg-zinc-900 p-2 w-[90%] rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"} autoComplete={"off"} name="inputname" id="inputname" required={true} defaultValue={""}/>
                            <input type="text" className={"bg-zinc-900 p-2 w-[90%] rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"} autoComplete={"off"} name="inputlink" id="inputlink" required={true} defaultValue={""}/>
                            <button type="submit">Confirm</button>
                        </form>
                    </div>
                ) : null
            }
            <div className={" flex items-center justify-center"}>
                <div className={"w-[20%] bg-zinc-900 hover:bg-zinc-950/60 rounded-full flex items-center justify-center overflow-hidden p-2 cursor-default transition select-none"} onClick={()=>{setVisibility(true)}}>
                    <CirclePlus />
                </div>
            </div>
        </div>

    )
}

export default AddButton