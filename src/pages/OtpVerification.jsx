import React, {useState, useEffect} from "react";
import axios from "axios";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { useAuth } from "../utils/Auth";
import { useNavigate } from "react-router-dom";


function OtpVerification() {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const { login } = useAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
      const cookieEmail = Cookies.get("user_email");
        if (cookieEmail) {
            setEmail(cookieEmail);
        }
    }, []);

    const handleConfirm = async (e) => {
      e.preventDefault();
      const otp = Array.from(e.target.elements)
    .filter(el => el.type === 'text')
    .map(el => el.value)
    .join('');
      try {
        const response = await axios.post("http://127.0.0.1:5000/auth/verify_otp", { otp, email });
        if (response.status === 201) {
          toast.success(`${response.data.message}`);
          const access_token = response.data.access_token;
          login(access_token);
          navigate("/updatepassword");
        }
      } catch (error) {
        toast.error(`${error.response.data.message}`);
      }
    }

    const handleResendOtp = async () => {
      setLoading(true);
      try {
        const response = await axios.post("http://127.0.0.1:5000/auth/forgot_password", { email });
        if (response.status === 200) {
          toast.success(`${response.data.message}`);
          

        }
      } catch (error) {
        toast.error(`${error.response.data.message}`);
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
 

  return (
    <form onSubmit={handleConfirm} className="flex flex-1 flex-col  shadow-lg px-5 py-5  justify-center space-y-5 max-w-md mx-auto mt-28">
      <div className="flex flex-col space-y-2 text-center">
        <h2 className="text-3xl md:text-4xl font-bold">Confirm OTP</h2>
        <p className="text-md md:text-xl">Enter the OTP we just sent you.</p>
      </div>
      <div className="flex flex-col max-w-md space-y-5">
      <div className="flex justify-center gap-2 mb-6">
         <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      if (e.target.value !== "") {
        e.target.nextElementSibling.focus();
      }
    }}

    
  />
   <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      if (e.target.value !== "") {
        e.target.nextElementSibling.focus();
      }
    }}
  />
   <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      if (e.target.value !== "") {
        e.target.nextElementSibling.focus();
      }
    }}
  />
   <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      if (e.target.value !== "") {
        e.target.nextElementSibling.focus();
      }
    }}
  />
   <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      if (e.target.value !== "") {
        e.target.nextElementSibling.focus();
      }
    }}
  />
   <input
    className="w-12 h-12 text-center border rounded-md shadow-sm focus:border-black focus:ring-black"
    type="text"
    maxLength="1"
    pattern="[0-9]"
    inputMode="numeric"
    autoComplete="one-time-code"
    required
    onChange={(e) => {
      e.target.value
    }}
  />

                   </div>
        <button type="submit" className="flex items-center justify-center flex-none px-3 py-2 md:px-4 md:py-3 border-2 rounded-lg font-medium border-black bg-black text-white">
          Confirm
        </button>
        {loading ? (<div  className="inline-block align-baseline text-center cursor-pointer font-bold text-sm text-black hover:text-black ml-4" >
                Sending OTP...
            </div> ):(<div onClick={handleResendOtp} className="inline-block align-baseline text-center cursor-pointer font-bold text-sm text-black hover:text-black ml-4" >
                Resend OTP
            </div>)}
      </div>
    </form>
  );
}

export default OtpVerification;
