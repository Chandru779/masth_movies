import './components/style.css';
import './components/spinner.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage';
import MainPage from './components/MainPage';
import AnimePage from './components/AnimePage';


function App() {
  return (
    <>
     <div className="h-screen bg-light">
     <Router>
       <Routes>
           <Route exact path="/" element={<LandingPage />} />
           <Route path="/anime/:id" element={<AnimePage />} />
           <Route path="/mainpage" element={<MainPage /> } />
         </Routes>
     </Router>
     </div>
    </>
  );
}

export default App;