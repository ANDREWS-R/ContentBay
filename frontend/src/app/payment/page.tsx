"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function PaymentPage() {

  const router = useRouter();

  const searchParams = useSearchParams();

  const title = searchParams.get("title");
  const price = searchParams.get("price");
  const ideaId = searchParams.get("id");

  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");

  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {

    // EMPTY CHECK
    if (!cardNumber || !expiry || !cvv) {
      alert("Please fill all payment fields.");
      return;
    }

    // CARD NUMBER VALIDATION
    if (cardNumber.length !== 16) {
      alert("Card number must be 16 digits.");
      return;
    }

    // EXPIRY VALIDATION
    const expiryRegex = /^(0[1-9]|1[0-2])\/\d{2}$/;

    if (!expiryRegex.test(expiry)) {
      alert("Enter valid expiry date (MM/YY).");
      return;
    }

    // CVV VALIDATION
    if (cvv.length !== 3) {
      alert("CVV must be 3 digits.");
      return;
    }

    try {

      setLoading(true);

      // GET CURRENT USER
      const user = JSON.parse(
        localStorage.getItem("user") || "{}"
      );

      // PURCHASE REQUEST
      const response = await fetch(
        `http://localhost:5000/api/ideas/${ideaId}/purchase`,
        {
          method: "PUT",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            purchasedBy: user.username,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {

        alert(data.message);

        setLoading(false);

        return;
      }

      setTimeout(() => {

        alert("Payment successful!");

        router.push("/marketplace");

      }, 1500);

    } catch (error) {

      console.log(error);

      alert("Something went wrong");

      setLoading(false);

    }

  };

  return (

    <ProtectedRoute>

      <main className="min-h-screen bg-black text-white overflow-hidden flex items-center justify-center px-6">

        {/* BACKGROUND GLOWS */}
        <div className="absolute top-0 left-0 w-[400px] h-[400px] bg-orange-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-pink-500/10 rounded-full blur-3xl" />

        {/* PAYMENT CARD */}
        <div className="relative z-10 w-full max-w-xl bg-white/[0.03] border border-white/10 rounded-[40px] p-10 backdrop-blur-2xl text-center">

          {/* LOGO */}
          <div className="w-16 h-16 mx-auto rounded-3xl bg-gradient-to-br from-orange-400 to-pink-500 flex items-center justify-center text-2xl font-black">
            C
          </div>

          {/* TITLE */}
          <h1 className="text-5xl font-black mt-8">
            Secure Checkout
          </h1>

          <p className="text-gray-400 text-lg mt-5 leading-relaxed">
            Complete your purchase to access this creative idea.
          </p>

          {/* PAYMENT BOX */}
          <div className="mt-10 bg-white/[0.04] border border-white/10 rounded-[30px] p-8 text-left">

            {/* IDEA INFO */}
            <div className="flex items-center justify-between mb-8">

              <div>
                <p className="text-gray-500 text-sm">
                  Purchasing
                </p>

                <h2 className="text-2xl font-bold mt-1">
                  {title || "Creative Idea"}
                </h2>
              </div>

              <div className="text-right">
                <p className="text-gray-500 text-sm">
                  Price
                </p>

                <h2 className="text-3xl font-black">
                  ${price || "0"}
                </h2>
              </div>

            </div>

            {/* PAYMENT INPUTS */}
            <div className="space-y-4">

              {/* CARD NUMBER */}
              <input
                type="text"
                placeholder="Card Number"
                value={cardNumber}
                maxLength={16}
                inputMode="numeric"
                onChange={(e) => {

                  // ALLOW ONLY NUMBERS
                  const value = e.target.value.replace(/\D/g, "");

                  setCardNumber(value);

                }}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
              />

              {/* EXPIRY + CVV */}
              <div className="grid grid-cols-2 gap-4">

                {/* EXPIRY */}
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={expiry}
                  maxLength={5}
                  inputMode="numeric"
                  onChange={(e) => {

                    let value = e.target.value.replace(/\D/g, "");

                    // LIMIT MONTH
                    if (value.length >= 2) {

                      const month = Number(
                        value.slice(0, 2)
                      );

                      if (month > 12) {
                        return;
                      }

                    }

                    // AUTO ADD "/"
                    if (value.length >= 3) {

                      value =
                        value.slice(0, 2) +
                        "/" +
                        value.slice(2, 4);

                    }

                    setExpiry(value);

                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
                />

                {/* CVV */}
                <input
                  type="password"
                  placeholder="CVV"
                  value={cvv}
                  maxLength={3}
                  inputMode="numeric"
                  onChange={(e) => {

                    // ALLOW ONLY NUMBERS
                    const value = e.target.value.replace(/\D/g, "");

                    setCvv(value);

                  }}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 outline-none focus:border-orange-400 transition"
                />

              </div>

            </div>

            {/* PAY BUTTON */}
            <button
              onClick={handlePayment}
              disabled={loading}
              className="w-full mt-8 bg-gradient-to-r from-orange-400 to-pink-500 py-4 rounded-2xl font-semibold hover:opacity-90 transition disabled:opacity-60"
            >
              {loading ? "Processing Payment..." : `Pay $${price || "0"}`}
            </button>

          </div>

          {/* BACK BUTTON */}
          <Link
            href="/marketplace"
            className="inline-block mt-8 text-gray-400 hover:text-white transition"
          >
            Back to Marketplace
          </Link>

        </div>

      </main>

    </ProtectedRoute>

  );
}