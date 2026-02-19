import {Download} from "lucide-react";
import {getExportedFavourites} from "../api/favourites.ts";

function Export() {

    const downloadExportedFile = async () => {
        const res = await getExportedFavourites();
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");

        link.href = url;
        link.setAttribute('download', 'favourites.json');
        document.body.appendChild(link);
        link.click();

        link.parentNode?.removeChild(link);
        window.URL.revokeObjectURL(url);
    }

    return (
        <div>
            <button className={"backdrop-blur-lg bg-white/5 text-white p-2 rounded-lg border border-white/10 cursor-pointer hover:scale-[102%] hover:backdrop-blur-md select-none transition duration-75"} onClick={() => downloadExportedFile()}><Download /></button>
        </div>
    )
}

export default Export;