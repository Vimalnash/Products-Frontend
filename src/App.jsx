import './App.css';
import {Routes, Route} from "react-router-dom";
import { LandingPage } from './Pages/landing';
import { SearchPage } from './Pages/search';
import { Navbar } from './Components/Navbar';
import { Searchbar } from './Components/Searchbar';

function App() {
  return (
    <div className='flex flex-col gap-4'>
      <Navbar />
      <Searchbar />
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/search' element={<SearchPage />} />
      </Routes>
    </div>
  )
}

export default App
