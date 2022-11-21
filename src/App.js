
import './App.css';
import Form from './Components/Form';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';
import {BrowserRouter as Router, Routes , Route} from 'react-router-dom'
import Home from './Components/Home';
import User from './Components/User';
import Cart from './Components/Cart';
import Signup from './Components/Signup';
import Admin from './Components/Admin';

function App() {
  return (
 <Router>
  <Routes>
    <Route path='/'element={<Home/>}/>
    <Route path='/admin'element={<Admin/>}/>
    <Route path='/signup'element={<Signup/>}/>
    <Route path='/form'element={<Form/>}/>
    <Route path='/user'element={<User/>}/>
    <Route path='/mycart'element={<Cart/>}/>



  </Routes>
 </Router>

    );
}

export default App;
