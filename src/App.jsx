import Header from "./components/Header";
import Scoreboard from './components/Scoreboard'

export default function App() {
    return (
        <div className="flex flex-col items-center justify-center w-screen min-h-screen">
            <Header />
            <Scoreboard />
        </div>
    )
}
