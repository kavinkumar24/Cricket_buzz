import './App.css';
import Login from './components/pages/Login';
import { Route ,Routes} from 'react-router';
import HomePage from './components/pages/Home_Page';
import AdminHome from './components/pages/Admin/Admin_home.jsx';
import Register from './components/pages/Register.jsx';
function App() {
  return (
    <Routes>
        <Route path="/" element={<Login />}/>
        <Route path="/home" element={<HomePage />} />
        <Route path="/admin_home" element={<AdminHome />} />
        <Route path="/register" element={<Register />} />
       </Routes>
  );
}

export default App;
