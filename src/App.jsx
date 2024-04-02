import { useState, useEffect } from 'react';
import  { Toaster } from 'react-hot-toast';
import { Route, Routes, useLocation } from 'react-router-dom';

import Cookies from 'js-cookie';
import Navbar from './components/Header';
import Home from './pages/Home';
import Categories from './pages/Categories';
import About from './pages/About';
import Contact from './pages/Contact';
import Cart from './pages/Cart';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CheckOut from './pages/CheckOut';
import ProductDetail from './pages/ProductDetail';
import ViewCategoryList from './pages/ViewCategoryList';
import ProtectedRoutes from './utils/ProtectedRoutes';
import ForgotPassword from './pages/ForgotPassword';
import OtpVerification from './pages/OtpVerification';
import UpdatePassword from './pages/UpdatePassword';

function App() {
  const [accessToken, setAccessToken] = useState("")

  const location = useLocation()
  useEffect(() =>{
    const storedAccessToken = Cookies.get("user_session");
    setAccessToken(storedAccessToken)
  }, [location.key, accessToken]);

  return (
    <>
        <Navbar accessToken={accessToken} />
        <Routes>
          <Route path="/" exact element={<Home/>} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/categories/:category" element={<ViewCategoryList />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/checkout" element={<ProtectedRoutes> <CheckOut accessToken={accessToken}/></ProtectedRoutes>}/>
          <Route path="/updatepassword" element={<ProtectedRoutes><UpdatePassword accessToken={accessToken}/></ProtectedRoutes>}/>
          <Route path="/product/:id" element={<ProductDetail/>}/>
          <Route path="/forgotpassword" element={<ForgotPassword/>}/>
          <Route path="otp_verification" element={<OtpVerification/>}/>
        </Routes>
     <Toaster
      toastOptions={
        {
          success: {
            iconTheme: {
              primary: 'black',
              secondary: 'white',
            },
          },
        }
      }
       />
    </>
  );
}

export default App;
