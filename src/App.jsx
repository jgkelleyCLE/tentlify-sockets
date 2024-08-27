import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Navbar from './Components/Navbar/Navbar'
import Auth from './Pages/Auth'
import LoadDetails from './Pages/LoadDetails'
import Loads from './Pages/Loads'



function App() {


  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/load/:id" element={<LoadDetails />} />
        <Route path="/loads" element={<Loads />} />
      </Routes>
    </Router>
  )
}

export default App
