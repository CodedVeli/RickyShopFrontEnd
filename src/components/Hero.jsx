import React from 'react'

function Hero() {
  return (
    <div className="container px-6 py-16 mt-20 mx-auto">
    <div className="items-center lg:flex">
      <div className="w-full lg:w-1/2">
        <div className="lg:max-w-lg">
          <h1 className="text-3xl font-semibold text-gray-800/85  lg:text-4xl">
            Best place to choose <br /> your{" "}
            <span className=" text-[#BF9B30] font-bold ">clothes</span>
          </h1>

          <p className="mt-3 text-gray-400 ">
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Porro
            beatae error laborum ab amet sunt recusandae? Reiciendis natus
            perspiciatis optio.
          </p>

          <a href="#" className="group mt-3  flex w-44 cursor-pointer select-none items-center justify-center rounded-md bg-black px-6 py-2 text-white transition">
    <span className="group flex w-full items-center justify-center rounded py-1 text-center font-bold"> Shop now </span>
    <svg className="flex-0 group-hover:w-6 ml-4 h-6 w-0 transition-all" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
      <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
    </svg>
  </a>
        </div>
      </div>

      <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2">
        <img
          className="lg:w-[600px] lg:h-[600px] lg:max-w-3xl rounded-md "
          src="/gifts.jpg"
          alt="gifts"
        />
      </div>
    </div>
  </div>
  )
}

export default Hero