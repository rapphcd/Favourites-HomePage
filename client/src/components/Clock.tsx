import moment, {type Moment} from 'moment';
import {useEffect, useState} from "react";

function Clock(){
    const [clock, setClock] = useState(moment().locale("fr").format("HH:mm:ss"))

    useEffect(() => {
        setInterval(() => {
            const d : Moment = moment();
            d.locale('fr');
            setClock(d.format("HH:mm:ss"))
        }, 1000);
    }, []);

    return (
        <div className={"backdrop-blur-md p-5 rounded-2xl border border-white/10 text-7xl cursor-default hover:scale-[100.5%] select-none transition duration-75"}>
            {clock}
        </div>
    )
}

export default Clock