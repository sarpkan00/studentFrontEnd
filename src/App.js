import './App.css';
import 'semantic-ui-css/semantic.min.css'
import "react-toastify/dist/ReactToastify.min.css"
import { useDispatch } from 'react-redux';
import { userLogin } from './store/actions/authActions';
import Dashboard from './layouts/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Cookies from 'js-cookie';


function App() {
  const dispatch = useDispatch();

  return (
    <div>
    
     <Dashboard>
     </Dashboard>
     
    </div>
  );
}

export default App;
