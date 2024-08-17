import Header from './components/Header'
import Navbar from './components/Navbar'
import Scoreboard from './components/Scoreboard'

function App() {
  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-screen">
      <Header />
      <Scoreboard />
      <Navbar />
    </div>
  )
}

export default App