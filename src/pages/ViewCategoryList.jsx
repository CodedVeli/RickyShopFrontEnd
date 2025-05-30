import React from "react";
import { useGetCategoryQuery } from "../components/rtk/features/Apis/CategoryApi";
import Skeleton from "../components/Skeleton";
import { useParams, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../components/rtk/features/CartSlice";
import Footer from "../components/Footer";


function ViewCategoryList() {
  const { category } = useParams();
  const { data, error, isFetching } = useGetCategoryQuery(category);
  const dispatch = useDispatch();
  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  let products;
  if (isFetching) {
    products = <Skeleton className=" h-[400px] w-full" count={8} />;
  } else if (error) {
    products = <p>{error}</p>;
  } else {
    products = data.map((product) => (
      <article
        key={product.id}
        className="relative flex flex-col overflow-hidden rounded-lg border"
      >
        <Link to={`/product/${product.id}`}>
          <div className="aspect-square overflow-hidden">
            <img
              className="h-full w-full object-cover transition-all duration-300 group-hover:scale-125"
              src={product.image}
              alt={product.title}
            />
          </div>
          <div className="absolute top-0 m-2 rounded-full bg-white">
            <p className="rounded-full bg-emerald-500 p-1 text-[8px] font-bold uppercase tracking-wide text-white sm:py-1 sm:px-3">
              Sale
            </p>
          </div>
          <div className="my-4 mx-auto flex w-10/12 flex-col items-start justify-between">
            <div className="mb-2 flex">
              <p className="mr-3 text-sm font-semibold">${product.price}</p>
              <del className="text-xs text-gray-400">
                ${product.price - 10}{" "}
              </del>
            </div>
            <h3 className="mb-2 text-sm text-gray-400">{product.title}</h3>
          </div>
          <button
            onClick={() => handleAddToCart(product)}
            className="group mx-auto mb-2 flex h-10 w-10/12 items-stretch overflow-hidden rounded-md text-gray-600"
          >
            <div className="flex w-full items-center justify-center bg-gray-100 text-xs uppercase transition group-hover:bg-emerald-600 group-hover:text-white">
              Add
            </div>
            <div className="flex items-center justify-center bg-gray-200 px-5 transition group-hover:bg-emerald-500 group-hover:text-white">
              +
            </div>
          </button>
        </Link>
      </article>
    ));
  }
  return (
    <>
    <div>
       <div className="mx-auto max-w-screen-xl px-4  py-16 mt-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-md text-center">
        <h2 className="font-serif text-2xl font-bold sm:text-3xl">Our Products</h2>
      </div>
      <div className="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-4 lg:mt-16">
        
        {products}
      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

export default ViewCategoryList;
