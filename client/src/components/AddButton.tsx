import {useState} from "react";
import type {Favourite} from "../types/favourite.ts";

interface Props {
    favourites: Favourite[],
    setFavourites: (fav: Favourite[]) => void,
    onCreate: (fav : {
        name: string,
        link: string
    }) => Promise<Favourite>
}

function AddButton({favourites ,setFavourites = f => f, onCreate} : Props){
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


        const create = async () => {
            try {
                await onCreate(toCreate).then((newFav : Favourite) => {
                    setFavourites([...favourites, newFav])
                })
            } catch (err){
                console.log(err)
            }
        };
        create()
        setVisibility(false)
    }

    return (
        <div>
            {
                visibility ? (
                    <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0"}>
                        <div className={"bg-black/30 w-full h-full absolute flex justify-center items-center top-0 left-0"} onClick={()=>setVisibility(false)}></div>
                        <form id={"editFav"} onSubmit={handleSub} className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[50%] bg-zinc-800 rounded-4xl z-10 outline outline-white/20"}>
                            <input type="text" name="inputname" id="inputname" required={true} defaultValue={""}/>
                            <input type="text" name="inputlink" id="inputlink" required={true} defaultValue={""}/>
                            <button type="submit">Confirm</button>
                        </form>
                    </div>
                ) : null
            }
            <div className={" flex items-center justify-center"}>
                <div className={"w-[20%] bg-zinc-900 rounded-full flex items-center justify-center overflow-hidden p-2 cursor-default"} onClick={()=>{setVisibility(true)}}>
                    +
                </div>
            </div>
        </div>

    )
}

export default AddButton