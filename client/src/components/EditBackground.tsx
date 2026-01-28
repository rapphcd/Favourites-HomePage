import {useState} from "react";

function EditBackground(){
    const [visibility, setVisibility] = useState(false);

    const handleSub = (e: any)=> {
        e.preventDefault()
    }


    return (
        <div>
            {
                visibility ? (
                    <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0"}>
                        <div className={"bg-black/30 w-full h-full absolute flex justify-center items-center top-0 left-0"} onClick={()=>setVisibility(false)}></div>
                        <form id={"editBackground"} onSubmit={handleSub} className={"flex flex-col justify-around items-center transition ease-in-out animate-modalopen size-[30%] bg-zinc-800 rounded-4xl z-10 border border-zinc-700/80"}>
                            <input type="file" name="background" id="background" className={"bg-zinc-900 p-2 w-[90%] cursor-pointer rounded-2xl focus:border-none focus:outline-1 focus:outline-white/50"} autoComplete={"off"} required={true} />
                            <button type="submit">Confirm</button>
                        </form>
                    </div>
                ) : null
            }
            <div className={"flex bg-zinc-600 text-zinc-400 absolute right-2 top-2 p-2 rounded-lg cursor-pointer hover:scale-[102%] select-none transition duration-75"}>
                <button className={"cursor-pointer"} onClick={() => {setVisibility(true)}}>ED</button>
            </div>
        </div>
    )
}

export default EditBackground