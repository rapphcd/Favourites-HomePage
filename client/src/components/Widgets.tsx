import Clock from "./Clock.tsx";


function Widgets() {
    return (
        <div className={"w-full h-full max-h-[95%] flex flex-row justify-end items-center m-4 mt-0"}>
            <div className={"h-full flex flex-col justify-between items-center"}>
                <Clock></Clock>
            </div>
        </div>
    )
}

export default Widgets