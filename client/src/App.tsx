import './App.css'
import Favourites from "./components/Favourites.tsx";
import Widgets from "./components/Widgets.tsx";

function App() {

  return (
      <main className={"flex flex-col h-full w-full"}>
          <div className={"flex flex-row w-full h-full items-center justify-start"}>
              <Favourites></Favourites>
              <Widgets></Widgets>
          </div>
      </main>
  )
}

export default App
