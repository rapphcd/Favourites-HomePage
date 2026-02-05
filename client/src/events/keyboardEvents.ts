import {useEffect} from "react";


export function useControlS(){
    useEffect(() => {
        function controlSHandler(e: KeyboardEvent){
            if(e.ctrlKey && e.key === "s"){
                e.preventDefault()
            }
        }

        document.addEventListener("keydown", controlSHandler)

        return () => {
            document.removeEventListener('keydown', controlSHandler)
        }
    }, []);
}

export function useEscapeModals(visibility: boolean, setVisibility: (value: (((prevState: boolean) => boolean) | boolean)) => void) {
    useEffect(() => {
        function escapeHandler(e: KeyboardEvent){
            if(e.key === "Escape"){
                e.preventDefault()
                if(visibility){
                    setVisibility(false)
                }
            }
        }

        document.addEventListener("keydown", escapeHandler)

        return () => {
            document.removeEventListener('keydown', escapeHandler)
        }
    }, [visibility]);
}