import {type ChangeEvent, type FormEvent, type SetStateAction, useState} from "react";
import { Import } from 'lucide-react';
import Modal from "./Modal.tsx";
import {useEscapeModals} from "../events/keyboardEvents.ts";
import * as React from "react";
import {importFavourites} from "../api/favourites.ts";

interface Props {
    setUpdated: React.Dispatch<SetStateAction<boolean>>
}

function ImportFavourites({ setUpdated } : Props) {
    const [visibility, setVisibility] = useState(false);
    const [file, setFile] = useState<File | null>(null);

    const handleSub = async (e: FormEvent)=> {
        e.preventDefault()
        if(!file) return;
        setVisibility(false)
        setUpdated(false)
        await importFavourites(file)
    }

    const changeHandler = (e : ChangeEvent<HTMLInputElement>) => {
        if(e.currentTarget.files){
            if(e.currentTarget.files[0].type != 'application/json'){
                e.preventDefault();
                return;
            }
            setFile(e.currentTarget.files[0])
        }
    }

    useEscapeModals(visibility, setVisibility);

    return (
        <div>
            {
                visibility ? (
                    <Modal setVisibility={setVisibility}>
                        <form id={"editBackground"} onSubmit={handleSub} className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[25%] backdrop-blur-xl bg-white/10 rounded-4xl z-10 border border-white/10"}>
                            <div className={"w-full flex flex-col justify-center items-center mt-2"}>
                                <label className={"mb-2 text-lg"}>Importer des favoris</label>
                                <input onInput={changeHandler} type="file" accept={"application/json"} name="import" id="import" className={"backdrop-blur-xl p-2 w-[90%] cursor-pointer rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"} autoComplete={"off"} required={true} />
                            </div>
                            <button type="submit" className={"p-3 hover:bg-white/5 rounded-2xl text-xl"}>Confirm</button>
                        </form>
                    </Modal>
                ) : null
            }
            <button className={"backdrop-blur-lg bg-white/5 text-white p-2 rounded-lg border border-white/10 cursor-pointer hover:scale-[102%] hover:backdrop-blur-md select-none transition duration-75"} onClick={() => setVisibility(true)}><Import /></button>
        </div>
    )
}

export default ImportFavourites;