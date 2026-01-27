import './App.css'
import Favourites from "./components/Favourites.tsx";
import Widgets from "./components/Widgets.tsx";
import DateWidget from "./components/DateWidget.tsx";

function App() {

  return (
      <main className={"flex flex-col h-full w-full justify-center items-start bg-[url(./assets/bg.jpg)] bg-center"}>
          <div className={"flex flex-col h-full w-full justify-center items-start bg-zinc-950/50 bg-center"}>
              <DateWidget></DateWidget>
              <div className={"flex flex-row w-full h-full items-center justify-start"}>
                  <Favourites></Favourites>
                  <Widgets></Widgets>
              </div>
          </div>
      </main>
  )
}

export default App
