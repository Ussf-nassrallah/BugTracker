import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.scss';

import Register from './Components/Authentication/Register/Register';
import Login from './Components/Authentication/Login/Login';
import Dashboard from './Components/Dashboard/Dashboard';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/dashboard' Component={Dashboard} />
          <Route path='/register' Component={Register} />
          <Route path='/login' Component={Login} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
