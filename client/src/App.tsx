import './App.css'
import Favourites from "./components/Favourites.tsx";
import Widgets from "./components/Widgets.tsx";
import DateWidget from "./components/DateWidget.tsx";
import EditBackground from "./components/EditBackground.tsx";
import {useEffect, useState} from "react";
import {useControlS} from "./events/keyboardEvents.ts";

function App() {
    const [updated, setUpdated] = useState(true)

    useEffect(() => {
        const updateBackground = async () => {
            if(!updated){
                window.location.reload()
            }
        }
        updateBackground()
    }, [updated]);

    useControlS();

  return (
      <main className={`flex flex-col h-full w-full justify-center items-start bg-[url(http://localhost:8080/background/get)] bg-center`}>
          <div className={"flex flex-col h-full w-full justify-center items-start bg-zinc-950/50 bg-center"}>
              <div className={"flex flex-row w-full justify-center items-start"}>
                  <DateWidget></DateWidget>
                  <EditBackground setUpdated={setUpdated}></EditBackground>
              </div>
              <div className={"flex flex-row w-full h-full max-h-[90%] items-center justify-start"}>
                  <Favourites></Favourites>
                  <Widgets></Widgets>
              </div>
          </div>
      </main>
  )
}

export default App
