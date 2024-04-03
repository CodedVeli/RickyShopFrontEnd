import React from 'react'
import { useGetAllCategoriesQuery } from '../components/rtk/features/Apis/CategoryApi';
import Skeleton from '../components/Skeleton';
import { Link } from 'react-router-dom';
import Footer from "../components/Footer";



function Categories() {
  const { data, error, isLoading } = useGetAllCategoriesQuery();

  let categories;
  if (isLoading){
    categories =<Skeleton className=' h-[400px] w-full' count={8}/>
  } else if (error){
    categories = <p>{error.error}</p>
  } else {
    categories = data.map((category, index) => (
      <div key={index} className="bg-slate-50 p-8">
         <Link to={`/categories/${category}`}>
        <div className="">         
          <h2 className="text-xl text-gray-600">{category}</h2>
          <p className="mt-2 text-xl font-semibold text-gray-800"></p>
        </div>
        {/* <div className="mt-8 flex items-center justify-center md:mt-24">
          <img className="" src={category.image} alt="" />
        </div> */}
        </Link>
      </div>))
  }
  return (
    <>
    <section className=" mt-20 ">

  <div className="mx-auto max-w-md sm:max-w-lg md:max-w-screen-xl h-screen">
    <div className="px-4 py-8 md:px-6 md:py-12 lg:px-20">
      <h1 className="text-center text-3xl font-semibold text-gray-800 lg:text-4xl">Our Categories</h1>

      <div className="mt-8 grid grid-cols-1 gap-6 md:mt-10 md:grid-cols-3 lg:gap-8">
        
        {/* <article className="bg-slate-50 p-8">
          <div className="">
            <h2 className="text-xl text-gray-600">Mens' Scotch</h2>
            <p className="mt-2 text-xl font-semibold text-gray-800"></p>
          </div>
          <div className="mt-8 flex items-center justify-center md:mt-24">
            <img className="" src="/images/B_ordz017ZkqddwiA4v6Z.png" alt="" />
          </div>
        </article> */}
        
        {categories}
      </div>

      <div className="mt-4 grid grid-cols-1 gap-5 md:mt-6 md:grid-cols-2 md:gap-6 lg:mt-8 lg:gap-8">
        
        {/* <article className="bg-slate-50 p-8">
          <div>
            <h2 className="text-xl text-gray-600">Mens' Black</h2>
            <p className="mt-2 text-xl font-semibold text-gray-800"></p>
          </div>
          <div className="mt-28 flex items-center justify-center md:mt-3">
            <img src="/images/sVmJ8ze9vYMOTpkgCk8Xb.png" alt="" />
          </div>
        </article>
        
        <article className="bg-slate-50 p-8">
          <div>
            <h2 className="text-xl text-gray-600">Womens' Brown</h2>
            <p className="mt-2 text-xl font-semibold text-gray-800"></p>
          </div>
          <div className="mt-28 flex items-center justify-center md:mt-1">
            <img src="/images/fhf5UnwUh3E7buI1Q6gJI.png" alt="" />
          </div>
        </article> */}
      </div>
    </div>
  </div>
</section>
<Footer/>
</>

  )
}

export default Categories