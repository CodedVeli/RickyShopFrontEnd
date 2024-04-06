import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { PiAddressBookThin } from "react-icons/pi";
import { FaPhoneAlt } from "react-icons/fa";
import { FaCity } from "react-icons/fa";
import axios from "axios";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

function SignUp() {

  const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword]= useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [address, setAddress] = useState("")
    const [city, setCity] = useState("")
    const [phone, setPhone] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSignup = async (event) => {
      console.log('clicked')
      setLoading(true)
      event.preventDefault();
  {/*    if (!password) {
        toast.error("Password cannot be empty");
        return;
    }

    if (password.length < 8) {
        toast.error("Password should be at least 8 characters");
        return;
    }


    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return;
    }*/}
  
      try {
          
          const response = await axios.post('https://ricky-shop-server-3.onrender.com/auth/register', { name, email, password, address, city, phone});
          toast.success(` ${response.data.message}`);
          setName("");
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setAddress("");
          setCity("");
          setPhone("");
          Cookies.set("user_email_signup", email, { expires: 1, path: "/", sameSite: 'None', secure: true });  
          navigate('/signupotpverification');
      } catch (error) {

          toast.error(` ${error.response.data.message}`);
      } finally {
          setLoading(false)
      }
  };
  return (
    <section  className="bg-white   mt-5 ">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto shadow-xl">
        <form onSubmit={handleSignup} className="w-full max-w-md">
          <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="/RickyShop.png" alt="" />
          </div>

          <div className="flex items-center justify-center mt-6">
            

            <p
              className="w-1/3 pb-4 font-medium text-center text-gray-800 capitalize border-b-2 border-black "
            >
              sign up
            </p>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11   focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

      

          <div className="relative flex items-center mt-6">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
            </span>

            <input
              type="email"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11  focus:border-blue-400  focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

         {/* <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 "
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>*/}

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            <PiAddressBookThin  className="w-6 h-6 mx-3 text-gray-300 " />

            </span>

            <input
              type="address"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            <FaCity  className="w-6 h-6 mx-3 text-gray-300 " />
            
            </span>

            <input
              type="city"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
            <FaPhoneAlt className="w-4 h-4 mx-3 text-gray-300 " />
            
            </span>

            <input
              type="phone"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg  focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>




          <div className="mt-6">
           {loading ? ( <div  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-center text-white  transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Signing you up...
            </div>) : ( <button type="submit" className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
              Sign Up
            </button>)}

            <div className="mt-6 text-center ">
              <button
                onClick={() => navigate("/signin")}
                className="text-sm text-black hover:underline "
              >
                Already have an account?
              </button>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
}

export default SignUp;
