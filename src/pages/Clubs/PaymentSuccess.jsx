import axios from "axios";
import React, { useEffect } from "react";
import { Link, useSearchParams } from "react-router";
import { RiWechatPayFill } from "react-icons/ri";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  useEffect(() => {
    if (sessionId) {
      axios.post(`${import.meta.env.VITE_API_URL}/payment-success`, {
        sessionId,
      });
    }
  }, [sessionId]);

  return (
    <>
      <div className="flex flex-col items-center justify-center h-screen ">
        <div className="bg-white p-10 rounded-lg shadow-lg text-center">
          <RiWechatPayFill className="w-16 h-16 text-green-500 mx-auto mb-2" />
          <h1 className="text-3xl font-bold text-pink-600 mb-2">
            Payment Successful!
          </h1>
          <Link
            to="/clubs"
            className="inline-block bg-sky-600 text-white font-semibold py-2 px-4 rounded hover:bg-pink-600 transition duration-300 mt-6"
          >
            Go to Clubs
          </Link>
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
