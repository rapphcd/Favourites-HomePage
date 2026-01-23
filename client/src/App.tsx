import './App.css'
import Favourites from "./components/Favourites.tsx";

function App() {

  return (
      <main className={"flex flex-col w-full h-full items-start justify-center"}>
          <Favourites></Favourites>
      </main>
  )
}

export default App
