import {useState, type ChangeEvent, type SetStateAction} from "react";
import {editBackground} from "../api/background.ts";
import * as React from "react";
import {Settings2} from "lucide-react";
import {useEscapeModals} from "../events/keyboardEvents.ts";

interface Props {
    setUpdated: React.Dispatch<SetStateAction<boolean>>
}

function EditBackground({ setUpdated } : Props){
    const [visibility, setVisibility] = useState<boolean>(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSub = async (e: any)=> {
        e.preventDefault()
        if(!file) return;
        setVisibility(false)
        setUpdated(false)
        await editBackground(file)
    }

    const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files){
            setFile(e.currentTarget.files[0])
        }
    }

    useEscapeModals(visibility, setVisibility);

    return (
        <div>
            {
                visibility ? (
                    <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0 z-10"}>
                        <div className={"bg-black/20 backdrop-blur-[2px] w-full h-full absolute flex justify-center items-center top-0 left-0"} onClick={()=>setVisibility(false)}></div>
                        <form id={"editBackground"} onSubmit={handleSub} className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[25%] backdrop-blur-xl bg-white/10 rounded-4xl z-10 border border-white/10"}>
                            <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                                <label className={"mb-2 text-lg"}>Arrière-plan</label>
                                <input onInput={changeHandler} type="file" name="background" id="background" className={"backdrop-blur-xl p-2 w-[90%] cursor-pointer rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"} autoComplete={"off"} required={true} />
                            </div>
                            <button type="submit" className={"p-3 hover:bg-white/5 rounded-2xl text-xl"}>Confirm</button>
                        </form>
                    </div>
                ) : null
            }
            <button className={"backdrop-blur-lg text-white absolute right-2 top-2 p-2 rounded-lg border border-white/10 cursor-pointer hover:scale-[102%] hover:backdrop-blur-none select-none transition duration-75"} onClick={() => {setVisibility(true)}}><Settings2 /></button>
        </div>
    )
}

export default EditBackground