import { createRoot } from 'react-dom/client'
import {BrowserRouter ,Routes, Route} from 'react-router-dom';
import {CookiesProvider} from 'react-cookie';
import Signup from "./auth/signup/Signup";
import Login from "./auth/login/Login";
import Forgot from './auth/Forgot/Forgot';
import ResetPass from './auth/ResetPass/ResetPass';
import Home from './Home';


createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <CookiesProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<Home />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgotCredentials" element={<Forgot />} />
        <Route path="/reset-password/:token" element={<ResetPass />} />
      </Routes>
  </CookiesProvider>
  </BrowserRouter>,
)
