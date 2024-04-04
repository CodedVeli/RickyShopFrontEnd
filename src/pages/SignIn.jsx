import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { useAuth } from "../utils/Auth";


function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    console.log("clicked");
    try {
      const response = await axios.post(
        "https://ricky-shop-server-3.onrender.com/auth/login",
        {
          email,
          password,
        }
      );
      const access_token = response.data.access_token;
      login(access_token);
      setPassword("");
      setEmail("");
      toast.success(`${response.data.message}`);
      if (email === "eric@gmail.com") {
        navigate("/admin");
      } else {
        navigate("/");
      }
    } catch (error) {
      if (error.response) {
        
        toast.error(`${error.response.data.message}`);
      } else if (error.request) {
        
        console.log(error.request);
      } else {
        
        toast.error(`Error: ${error.message}`);
      }
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className=" mt-40 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-xl ">
      <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
          <img className="w-auto h-7 sm:h-8" src="/RickyShop.png" alt="" />
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-900 ">
          Welcome Back
        </h3>

        <p className="mt-1 text-center text-gray-500 ">
          Login or create account
        </p>

        <form onSubmit={handleSubmit}>
          <div className="w-full mt-4">
            <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            required
              className="block w-full px-4 py-2 mt-2 bg-white text-gray-700 placeholder-gray-500  border rounded-lg focus:border-[#BF9B30]  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#BF9B30]"
              type="email"
              placeholder="Email Address"
              aria-label="Email Address"
            />
          </div>

          <div className="w-full mt-4">
            <input
            required
            onChange={(e) => setPassword(e.target.value)}
            value={password}
              className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-[#BF9B30]  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#BF9B30]"
              type="password"
              placeholder="Password"
              aria-label="Password"
            />
          </div>

          <div className="flex items-center justify-between mt-4">
            <p onClick={()=>navigate("/forgotpassword")}  className="text-sm text-gray-900 hover:text-gray-500">
              Forgot Password?
            </p>

           { loading ? ( <div  className="px-6 py-2 text-sm font-medium tracking-wide text-white  transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none focus:ring focus:ring-[#BF9B30] focus:ring-opacity-50">
              Sign you in...
            </div>) : ( <button type="submit" className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none focus:ring focus:ring-[#BF9B30] focus:ring-opacity-50">  Sign In</button>)}
          </div>
        </form>
      </div>

      <div className="flex items-center justify-center py-4 text-center0 bg-gray-700/10">
        <span className="text-sm text-gray-600 dark:text-gray-900">
          Don&apos;t have an account?{" "}
        </span>

        <button
         onClick={() => navigate("/signup")}
          className="mx-2 text-sm font-bold text-gray-700  hover:underline"
        >
          Register
        </button>
      </div>
    </div>
  );
}

export default SignIn;
