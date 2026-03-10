import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import AddStudents from './pages/AddStudents.jsx'
import Sidebar from './pages/Sidebar.jsx'
import Car from './pages/Car.jsx'
import Users from './pages/Users.jsx'
import MovieWatchList from './pages/MovieWatchList.jsx'
function App() {

  return (
    <>

      <BrowserRouter>
      <Sidebar />
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addstudents" element={<AddStudents />} />
            <Route path="/car" element={<Car />} />
            <Route path="/moviewatchlist" element={<MovieWatchList />} />
            <Route path="/users" element={<Users />} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
