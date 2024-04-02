import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import axios from 'axios'
import Cookies from 'js-cookie';


function UpdatePassword({accessToken}) {

    const [password, setPassword]= useState("")
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const cookieEmail = Cookies.get("user_email");
          if (cookieEmail) {
              setEmail(cookieEmail);
          }
      }, []);


    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        if (!password) {
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
        }
        try {
            const response = await axios.patch('http://localhost:5000/auth/update_password', { password, email },
            { headers: { Authorization: `Bearer ${accessToken}` } }

            );
            
            toast.success(` ${response.data.message}`);
            setPassword("");
            setConfirmPassword("");
            Cookies.remove("user_email", { path: "/", sameSite: 'None', secure: true });
            navigate("/")
        }
        catch (error) {
            toast.error(` ${error.response.data.message}`);
        } finally {
            setLoading(false);
        }
    }
    
    return (
    <section className="antialiased bg-slate-200/10 mt-40">
    <div className="max-w-lg mx-auto my-10 bg-white p-8 rounded-xl shadow-lg shadow-slate-300">
      <h1 className="text-4xl font-medium">Update password</h1>
      <p className="text-slate-500 pt-2">Fill up the form to reset the password</p>

      <form onSubmit={handleSubmit} className="my-10">
        <div className="flex flex-col space-y-5">
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Enter password</p>
            <input
              required
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Enter password"
            />
          </label>
          <label htmlFor="email">
            <p className="font-medium text-slate-700 pb-2">Confirm password</p>
            <input
              required
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
              placeholder="Confirm password"
            />
          </label>

          { loading ? (<div  className="w-full py-3 font-medium text-white bg-black hover:bg-black rounded-lg border-black hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Please wait...</span>
          </div>) : (<button type="submit" className="w-full py-3 font-medium text-white bg-black hover:bg-slate-800 rounded-lg border-slate-800 hover:shadow inline-flex space-x-2 items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 5.25a3 3 0 013 3m3 0a6 6 0 01-7.029 5.912c-.563-.097-1.159.026-1.563.43L10.5 17.25H8.25v2.25H6v2.25H2.25v-2.818c0-.597.237-1.17.659-1.591l6.499-6.499c.404-.404.527-1 .43-1.563A6 6 0 1121.75 8.25z"
              />
            </svg>

            <span>Update password</span>
          </button>)} 

          {/* <p className="text-center">
            Not registered yet?{" "}
            <p
             onClick={() => navigate('/signup')}
              className="text-slate-800 cursor-pointer font-medium inline-flex space-x-1 items-center"
            >
              <span>Register now </span>
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-4 w-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </span>
            </p>
          </p> */}
        </div>
      </form>
    </div>
  </section>
  )
}

export default UpdatePassword