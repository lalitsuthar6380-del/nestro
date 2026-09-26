"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

import Breadcrumb from "@/components/website/checkout/Breadcrumb";
import CheckoutSteps from "@/components/website/checkout/CheckoutSteps";
import DeliveryOptions from "@/components/website/checkout/DeliveryOptions";
import OrderSummary from "@/components/website/checkout/OrderSummary";
import CheckoutActions from "@/components/website/checkout/CheckoutActions";
import SavedAddresses from "@/components/website/profile/SaveAddresses";

import { client } from "@/utils/helper";
import { toast } from "sonner";
import { useRazorpay } from "react-razorpay";

export default function CheckoutPage() {
  const router = useRouter();

  const { Razorpay } = useRazorpay();

  const cart = useSelector((store) => store.cart);

  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [placingOrder, setPlacingOrder] = useState(false);

  const razorpayKey =
    process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;

  // =========================
  // PLACE ORDER
  // =========================
  const handlePlaceOrder = async () => {
    try {
      if (!selectedAddress) {
        toast.error("Please select a delivery address");
        return;
      }

      if (!paymentMethod) {
        toast.error("Please select a payment method");
        return;
      }

      if (!cart?.items?.length) {
        toast.error("Your cart is empty");
        return;
      }

      setPlacingOrder(true);

      const shippingAddress = {
        fullName: selectedAddress.fullName,
        mobile: selectedAddress.mobile,
        pincode: selectedAddress.pincode,
        addressLine: selectedAddress.addressLine,
        city: selectedAddress.city,
        state: selectedAddress.state,
        country: selectedAddress.country || "India",
      };

      const orderData = {
        shippingAddress,
        payment_method: paymentMethod,
      };

      // =========================
      // SYNC CART
      // =========================
      await client.post("cart/sync", {
        items: JSON.stringify(
          cart.items.map((item) => ({
            productId: item._id,
            qty: item.qty,
          }))
        ),
      });

      console.log("ORDER DATA:", orderData);

      // =========================
      // PLACE ORDER
      // =========================
      const response = await client.post(
        "order/place",
        orderData
      );

      console.log(
        "ORDER RESPONSE:",
        response.data
      );

      // =========================
      // COD
      // =========================
      if (paymentMethod === "cod") {
        if (response.data?.success) {
          toast.success("Order placed successfully");

          router.push(
            `/thankyou/${response.data.orderId}`
          );

          return;
        }

        toast.error(
          response.data?.message ||
          "Unable to place order"
        );

        return;
      }

      // =========================
      // ONLINE PAYMENT
      // =========================
      if (paymentMethod === "online") {
        console.log(
          "RAZORPAY KEY:",
          razorpayKey
        );

        console.log(
          "RAZORPAY INSTANCE:",
          Razorpay
        );

        if (!razorpayKey) {
          toast.error(
            "Razorpay Key is missing"
          );

          console.error(
            "NEXT_PUBLIC_RAZORPAY_KEY_ID is undefined"
          );

          return;
        }

        if (!Razorpay) {
          toast.error(
            "Razorpay is not loaded"
          );

          return;
        }

        if (!response.data?.orderId) {
          toast.error(
            "Razorpay Order ID is missing"
          );

          console.error(
            "Missing Razorpay Order ID:",
            response.data
          );

          return;
        }

        const options = {
          key: razorpayKey,

          amount: response.data.amount,

          currency:
            response.data.currency || "INR",

          name: "Nestro",

          description:
            "Nestro Order Payment",

          order_id:
            response.data.orderId,

          handler: async (paymentResponse) => {
            client.post("order/verify", paymentResponse).then((verify_response) => {
              
            }).catch((error) => {

            })

            alert(
              "Payment Successful!"
            );
          },

          prefill: {
            contact:
              selectedAddress.mobile ||
              "7877711866",
          },

          theme: {
            color: "#F37254",
          },
        };

        console.log(
          "RAZORPAY OPTIONS:",
          options
        );

        const razorpayInstance =
          new Razorpay(options);

        razorpayInstance.open();

        return;
      }

      toast.error(
        "Invalid payment method"
      );

    } catch (error) {
      console.error(
        "PLACE ORDER ERROR:",
        error
      );

      console.error(
        "SERVER RESPONSE:",
        error?.response?.data
      );

      toast.error(
        error?.response?.data?.message ||
        "Unable to place order"
      );

    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F3EFE8]">

      {/* BREADCRUMB */}
      <Breadcrumb />

      {/* CHECKOUT STEPS */}
      <CheckoutSteps activeStep={1} />

      <div className="max-w-[1440px] mx-auto px-6 md:px-10 pb-16">

        <div className="grid grid-cols-1 lg:grid-cols-[1.6fr_1fr] gap-6 items-start">

          {/* LEFT SIDE */}
          <div className="space-y-6">

            {/* SAVED ADDRESSES */}
            <SavedAddresses
              onSelectAddress={
                setSelectedAddress
              }
            />

            {/* PAYMENT METHOD */}
            <DeliveryOptions
              paymentMethod={
                paymentMethod
              }
              setPaymentMethod={
                setPaymentMethod
              }
            />

          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">

            {/* ORDER SUMMARY */}
            <OrderSummary />

            {/* PLACE ORDER */}
            <CheckoutActions
              onPlaceOrder={
                handlePlaceOrder
              }
            />

          </div>

        </div>

      </div>

    </div>
  );
}