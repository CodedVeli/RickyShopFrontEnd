
function SignIn() {
  return (
    <div className=" mt-40 w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg ">
    <div className="px-6 py-4">
        <div className="flex justify-center mx-auto">
            <img className="w-auto h-7 sm:h-8" src="/RickyShop.png" alt=""/>
        </div>

        <h3 className="mt-3 text-xl font-medium text-center text-gray-900 ">Welcome Back</h3>

        <p className="mt-1 text-center text-gray-500 ">Login or create account</p>

        <form>
            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 bg-white text-gray-700 placeholder-gray-500  border rounded-lg focus:border-[#BF9B30]  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#BF9B30]" type="email" placeholder="Email Address" aria-label="Email Address" />
            </div>

            <div className="w-full mt-4">
                <input className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg focus:border-[#BF9B30]  focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-[#BF9B30]" type="password" placeholder="Password" aria-label="Password" />
            </div>

            <div className="flex items-center justify-between mt-4">
                <a href="#" className="text-sm text-gray-900 hover:text-gray-500">Forget Password?</a>

                <button className="px-6 py-2 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-black rounded-lg  focus:outline-none focus:ring focus:ring-[#BF9B30] focus:ring-opacity-50">
                    Sign In
                </button>
            </div>
        </form>
    </div>

    <div className="flex items-center justify-center py-4 text-center0 bg-gray-700/10">
        <span className="text-sm text-gray-600 dark:text-gray-900">Don't have an account? </span>

        <a href="#" className="mx-2 text-sm font-bold text-gray-700  hover:underline">Register</a>
    </div>
</div>
  )
}

export default SignIn