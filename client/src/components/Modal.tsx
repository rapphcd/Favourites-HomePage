import type {Dispatch, ReactNode, SetStateAction} from "react";
import {createPortal} from "react-dom";

interface Props {
    children: ReactNode,
    setVisibility: Dispatch<SetStateAction<boolean>>
}

function Modal({ children, setVisibility } : Props) {
    return (
        createPortal(
            <div className={"w-full h-full absolute flex justify-center items-center top-0 left-0 z-10"}>
                <div className={"bg-black/20 backdrop-blur-[2px] w-full h-full absolute flex justify-center items-center top-0 left-0"} onClick={()=>setVisibility(false)}></div>
                {children}
            </div>,
            document.body
        )
    )
}

export default Modal;