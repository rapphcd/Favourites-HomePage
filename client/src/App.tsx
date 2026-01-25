import './App.css'
import Favourites from "./components/Favourites.tsx";
import Widgets from "./components/Widgets.tsx";
import DateWidget from "./components/DateWidget.tsx";

function App() {

  return (
      <main className={"flex flex-col h-full w-full justify-center items-start"}>
          <DateWidget></DateWidget>
          <div className={"flex flex-row w-full h-full items-center justify-start"}>
              <Favourites></Favourites>
              <Widgets></Widgets>
          </div>
      </main>
  )
}

export default App
