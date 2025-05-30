import { useState, useEffect,useCallback } from "react";
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart, clearCartItem } from "../components/rtk/features/CartSlice";
import Footer from "../components/Footer";

function Cart() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [shipping, setShipping] = useState(0);

    const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);   
    const totalAmount = Number(cartTotalAmount).toFixed(2)
    const calculateShipping = useCallback(() => {
      let shippingCost;
      if (totalAmount <= 25 && totalAmount > 0){
        shippingCost = 10;
      } else if (totalAmount > 25) {
        shippingCost = totalAmount * 10 / 100;
      } else {
        shippingCost = 0;
      }
      setShipping(shippingCost);
    }, [totalAmount]); 
  
    useEffect(() => {
      calculateShipping();
    }, [calculateShipping]);

    const accumulativeTotal = Number(totalAmount) + Number(shipping);
  return (
    <>
    <section className=" bg-gray-100 py-24 sm:py-24 lg:py-24">
  <div className="mx-auto px-4 sm:px-6 lg:px-8 h-screen">
    <div className="flex items-center justify-center">
      <h1 className="text-2xl font-semibold text-gray-900">Your Cart</h1>
    </div>

    <div className="mx-auto mt-8 max-w-2xl md:mt-12">
      <div className="bg-white shadow">
        <div className="px-4 py-6 sm:px-8 sm:py-10">
          <div className="flow-root">
            <ul className="-my-8">
             {cartItems.length === 0 ? <div className="text-center text-gray-400">Cart is empty</div> : cartItems.map((item) => (
             
              <li key={item.id} className="flex flex-col space-y-3 py-6 text-left sm:flex-row sm:space-x-5 sm:space-y-0">
              <div className="shrink-0">
                <img className="h-24 w-24 max-w-full rounded-lg object-cover" src={item.image} alt={item.title} />
              </div>

              <div className="relative flex flex-1 flex-col justify-between">
                <div className="sm:col-gap-5 sm:grid sm:grid-cols-2">
                  <div className="pr-8 sm:pr-5">
                    <div className="text-base font-semibold text-gray-900">{item.title}</div>
                    {/* <p className="mx-0 mt-1 mb-0 text-sm text-gray-400">36EU - 4US</p> */}
                  </div>

                  <div className="mt-4 flex items-end justify-between sm:mt-0 sm:items-start sm:justify-end">
                    <div className="shrink-0 w-20 text-base font-semibold text-gray-900 sm:order-2 sm:ml-8 sm:text-right">${Number(item.totalPrice.toFixed(2))}</div>

                    <div className="sm:order-1">
                      <div className="mx-auto flex h-8 items-stretch text-gray-600">
                        <button  onClick={() => dispatch(removeFromCart(item.id))} className="flex items-center justify-center rounded-l-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">-</button>
                        <div className="flex w-full items-center justify-center bg-gray-100 px-4 text-xs uppercase transition">{item.quantity}</div>
                        <button onClick={() => dispatch(addToCart(item))} className="flex items-center justify-center rounded-r-md bg-gray-200 px-4 transition hover:bg-black hover:text-white">+</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="absolute top-0 right-0 flex sm:bottom-0 sm:top-auto">
                  <button onClick={() => dispatch(clearCartItem(item.id))} className="flex rounded p-2 text-center text-gray-500 transition-all duration-200 ease-in-out focus:shadow hover:text-gray-900">
                    <svg className="block h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" className=""></path>
                    </svg>
                  </button>
                </div>
              </div>
            </li>
             ))}
              
            </ul>
          </div>

          <div className="mt-6 border-t border-b py-2">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Subtotal</p>
              <p className="text-lg font-semibold text-gray-900">${totalAmount}</p>
            </div>
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-400">Shipping</p>
              <p className="text-lg font-semibold text-gray-900">${Number(shipping.toFixed(2))}</p>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between">
            <p className="text-sm font-medium text-gray-900">Total</p>
            <p className="text-2xl font-semibold text-gray-900"><span className="text-xs font-normal text-gray-400">USD</span> {Number(accumulativeTotal.toFixed(2))}</p>
          </div>

          <div className="mt-6 text-center">
            {cartItems.length === 0 && <div></div>}
            {cartItems.length > 0 && <button onClick={() => navigate('/checkout')}  className="group inline-flex w-full items-center justify-center rounded-md bg-gray-900 px-6 py-4 text-lg font-semibold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800">
              Checkout
              <svg xmlns="http://www.w3.org/2000/svg" className="group-hover:ml-8 ml-4 h-6 w-6 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </button>}
          </div>
        </div>
      </div>
    </div>
  </div>
 
</section>
<Footer/>

</>

  )
}

export default Cart