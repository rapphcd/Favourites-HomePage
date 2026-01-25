import {useEffect, useState} from "react";
import moment, {type Moment} from "moment/moment";

function DateWidget() {

    const [date, setDate] = useState(moment().locale("fr").format("LL"))

    useEffect(() => {
        setInterval(() => {
            const d: Moment = moment();
            d.locale('fr');
            setDate(d.format("LL"))
        }, 3600000);
    }, []);

    return (
        <div className={"flex flex-col items-center w-full"}>
            <div
                className={"flex items-center justify-center w-max text-3xl mt-3 bg-zinc-800 px-5 py-2 rounded-2xl outline outline-white/10 cursor-default hover:scale-[100.5%] hover:shadow-md select-none transition duration-75"}>
                {date}
            </div>
        </div>
    )
}

export default DateWidget