// eslint-disable-next-line no-unused-vars
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect, useCallback } from "react";
import { useAddOrderMutation } from "../components/rtk/features/Apis/OrderApi";
import { useLipaNaMpesaMutation } from "../components/rtk/features/Apis/MpesaApi";
import {jwtDecode} from 'jwt-decode';
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Footer from '../components/Footer'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


function CheckOut({ accessToken }) {
  const { cartItems, cartTotalAmount } = useSelector((state) => state.cart);
  const [shipping, setShipping] = useState(0);
  const [userId, setUserId] = useState('');
  const [deliveryMethod, setDeliveryMethod] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('');
  const [open, setOpen] = useState(false);
  const [phone, setPhone] = useState('');
  const navigate = useNavigate();
  const [addOrder, { isLoading, error, data }] = useAddOrderMutation();
  const [lipaNaMpesa, { isLoading: isMpesaLoading, error: mpesaError, data: mpesaData }] = useLipaNaMpesaMutation();


  const handleOpen = () => {
    setOpen(true);
    setPaymentMethod('m-pesa');
  };

  const handleClose = () => {
    setOpen(false);
    setPaymentMethod('');
  };

  useEffect(() => {
    if (accessToken) {
      const decodedToken = jwtDecode(accessToken);
      setUserId(decodedToken.sub);
    }
  }, [accessToken]);
  console.log('data:',data)

  const totalAmount = Number(cartTotalAmount).toFixed(2);
  const calculateShipping = useCallback(() => {
    let shippingCost;
    if (totalAmount <= 25 && totalAmount > 0) {
      shippingCost = 10;
    } else if (totalAmount > 25) {
      shippingCost = (totalAmount * 10) / 100;
    } else {
      shippingCost = 0;
    }
    setShipping(shippingCost);
  }, [totalAmount]);

  useEffect(() => {
    calculateShipping();
  }, [calculateShipping]);
  const accumulativeTotal = Number(totalAmount) + Number(shipping);

  const handleDeliveryChange = (e) => {
    setDeliveryMethod(e.target.value);

  };

  const handlePayment = (e) => {
    setPaymentMethod(e.target.value)
  }

  const handleMpesaPayment = (e) => {
    e.preventDefault();
    const payload = {
      phone_number: phone,
      amount: accumulativeTotal,
    };
    lipaNaMpesa(payload);
  };



  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    const order = {
      total: totalAmount,
      quantity: cartItems.length,
      status: "pending",
      user_id: userId,
      delivery_method:deliveryMethod,
      payment_method: paymentMethod,
      products: cartItems,
      shipping_cost: shipping,
    };
    addOrder({order, accessToken});
  }
  console.log('Delivery:',deliveryMethod)



useEffect(() => {
  if(error){
    toast.error(`${error.message}`)
  } else if (data) {
    toast.success(`${data.message}`)
  }if (mpesaData) {
    toast.success(`${mpesaData.message}`);
    handleClose();
    handleSubmit();
    navigate('/')
  }
}, [mpesaData]);

  console.log(mpesaError)



  return (
    <>
      <div className="flex flex-col items-center border-b bg-white py-4  mt-20 sm:flex-row sm:px-10 lg:px-20 xl:px-32">
        <a href="#" className="text-2xl font-bold text-gray-800">
          Order details
        </a>
        <div className="mt-4 py-2 text-xs sm:mt-0 sm:ml-auto sm:text-base">
          <div className="relative">
            <ul className="relative flex w-full items-center justify-between space-x-2 sm:space-x-4">
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-200 text-xs font-semibold text-emerald-700"
                  href="#"
                >
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
                      d="M5 13l4 4L19 7"
                    />
                  </svg>
                </a>
                <span className="font-semibold text-gray-900">Shop</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-600 text-xs font-semibold text-white ring ring-gray-600 ring-offset-2"
                  href="#"
                >
                  2
                </a>
                <span className="font-semibold text-gray-900">Shipping</span>
              </li>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 5l7 7-7 7"
                />
              </svg>
              <li className="flex items-center space-x-3 text-left sm:space-x-4">
                <a
                  className="flex h-6 w-6 items-center justify-center rounded-full bg-gray-400 text-xs font-semibold text-white"
                  href="#"
                >
                  3
                </a>
                <span className="font-semibold text-gray-500">Payment</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="grid sm:px-10 lg:grid-cols-2 lg:px-20 xl:px-32 mb-5">
        <div className="px-4 pt-8">
          <p className="text-xl font-medium">Order Summary</p>
          <p className="text-gray-400">
            Check your items. And select a suitable shipping method.
          </p>
          <div className="mt-8 space-y-3 rounded-lg border bg-white px-2 py-4 sm:px-6">
            {cartItems.length > 0 &&
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex flex-col rounded-lg bg-white sm:flex-row"
                >
                  <img
                    className="m-2 h-24 w-28 rounded-md border object-cover object-center"
                    src={item.image}
                    alt={item.title}
                  />
                  <div className="flex w-full flex-col px-4 py-4">
                    <span className="font-semibold">{item.title}</span>
                    <span className="float-right text-gray-400">
                      42EU - 8.5US
                    </span>
                    <p className="text-lg font-bold">${item.price}</p>
                  </div>
                </div>
              ))}
          </div>

          <p className="mt-8 text-lg font-medium">Shipping Methods</p>
          
          <div className="mt-5 grid gap-6">
           <div className="relative">
  <input
    className="peer hidden"
    id="radio_1"
    type="radio"
    name="deliveryMethod"
    checked={deliveryMethod === "G4S Delivery"}
    value="G4S Delivery"
    onChange={handleDeliveryChange}
    required
  />
  <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
  <label
    htmlFor="radio_1"
    className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
  >
    <img
      className="w-14 object-contain"
        src="data:image/png;base64,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"
      alt=""
    />
    <div className="ml-5">
      <span className="mt-2 font-semibold">G4S Delivery</span>
      <p className="text-slate-500 text-sm leading-6">
        Delivery: 1-2 Days
      </p>
    </div>
  </label>
</div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_2"
                type="radio"
                name="deliveryMethod"
                checked={deliveryMethod === "BPS Delivery"}
                value="BPS Delivery"
                onChange={handleDeliveryChange}
                required
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_2"
              >
                <img
                  className="w-14 object-contain"
                  src="https://bpskenya.co.ke/wp-content/uploads/2023/10/cropped-WhatsApp-Image-2023-09-19-at-2.06.29-PM-removebg-preview-1.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">BPS Delivery</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Delivery: 1-3 Days
                  </p>
                </div>
              </label>
            </div>
            <div className="relative">
              <input
                className="peer hidden"
                id="radio_3"
                type="radio"
                name="deliveryMethod"
                required
                checked={deliveryMethod === "pick-up"}
                value="pick-up"
                onChange={handleDeliveryChange}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_3"
              >
                <img
                  className="w-14 object-contain"
                  src="/Ricky-Shop.png"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">Pick Up</span>
                  <p className="text-slate-500 text-sm leading-6 lg:break-inside-avoid break-inside-auto">
                    Delivery: Pick up at the store <br/> within 5 days
                  </p>
                </div>
              </label>
            </div>
            
          </div>
        </div>
        <div className="mt-10 bg-gray-50 px-4 pt-8 lg:mt-0">
          <p className="text-xl font-medium">Payment Method</p>
          <p className="text-gray-400">
            Complete your order by providing your payment details.
          </p>
          <div className="">
            <div className=" mt-5 space-y-5">
            <div onClick={handleOpen} className="relative">
              <input
                className="peer hidden"
                id="radio_5"
                type="radio"
                name="paymentMethod"
                required
                checked={paymentMethod === "m-pesa"}
                value="m-pesa"
                onChange={handlePayment}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_5"
              >
                <img
                  className="w-20 object-contain"
                  src="data:image/png;base64,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"

                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">M-pesa</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Pay with M-pesa, an stk push will be <br/> sent to your phone
                  </p>
                </div>
              </label>
           
            </div>
            <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
          <img
                  className="w-20 object-contain"
                  src="data:image/png;base64,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"

                  alt=""
                />
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          <div className="antialiased bg-slate-200/10 ">
      <div className="max-w-lg mx-auto my-10 bg-white p-5 rounded-xl shadow-lg shadow-slate-300">
        <h1 className="lg:text-4xl md:text-3xl text-2xl font-medium ">Lipa na M-pesa</h1>
        <p className="text-slate-500 mt-1">Fill up the form with no. starting 07 xx xxx xxx to propt the stk-push</p>

        <div className="my-10">
          <div className="flex flex-col space-y-5">
            <label htmlFor="email">
              <p className="font-medium text-slate-700 pb-2">Mpesa Phone No.</p>
              <input
                id="phone"
                name="phone"
                required
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full py-3 border border-slate-200 rounded-lg px-3 focus:outline-none focus:border-slate-500 hover:shadow"
                placeholder="07xx xxx xxx"
              />
            </label>

            { isMpesaLoading ? (<div  className="w-full py-3 font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg border-green-800 hover:shadow inline-flex space-x-2 items-center justify-center">
              

              <span>Please wait...</span>
            </div>) : (<button onClick={handleMpesaPayment} className="w-full py-3 font-medium text-white bg-green-700 hover:bg-green-800 rounded-lg border-green-800 hover:shadow inline-flex space-x-2 items-center justify-center">
            

              <span>Pay </span>
            </button>)} 

           
          </div>
        </div>
      </div>
    </div>
          </Typography>
        </Box>
      </Modal>
    </div>
            
             <div className="relative">
              <input
                className="peer hidden"
                id="radio_4"
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                required
                onChange={handlePayment}
              />
              <span className="peer-checked:border-gray-700 absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-8 border-gray-300 bg-white"></span>
              <label
                className="peer-checked:border-2 peer-checked:border-gray-700 peer-checked:bg-gray-50 flex cursor-pointer select-none rounded-lg border border-gray-300 p-4"
                htmlFor="radio_4"
              >
                <img
                  className="w-14 object-contain"
                  src="data:image/jpeg;base64,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"
                  alt=""
                />
                <div className="ml-5">
                  <span className="mt-2 font-semibold">COD</span>
                  <p className="text-slate-500 text-sm leading-6">
                    Pay on delivery
                  </p>
                </div>
              </label>
            </div>
            </div>
            

            <div className="mt-6 border-t border-b py-2">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Subtotal</p>
                <p className="font-semibold text-gray-900">${totalAmount}</p>
              </div>
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-gray-900">Shipping</p>
                <p className="font-semibold text-gray-900">
                  ${Number(shipping.toFixed(2))}
                </p>
              </div>
            </div>
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm font-medium text-gray-900">Total</p>
              <p className="text-2xl font-semibold text-gray-900">
                ${Number(accumulativeTotal.toFixed(2))}
              </p>
            </div>
          </div>
          {isLoading ? (<div className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Placing Order...
          </div>):(<button type="submit" className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
            Place Order
          </button>)}
        </div>
      </form>
      <Footer/>
    </>
  );
}

export default CheckOut;
