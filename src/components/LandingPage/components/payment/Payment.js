import React, { useEffect, useState } from "react";
import { baseUrl } from "../../../../ApiPath";
import { useLocation, useNavigate } from "react-router-dom";
import { load } from "@cashfreepayments/cashfree-js";

function Payment() {
  const location = useLocation();
  const [subscriberId, setSubscriberId] = useState();
  const [packageId, setPackageId] = useState();
  const [orderDetail, setOrderDetail] = useState();
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const subscriberId = queryParams.get("subscriberId");
    const packageId = queryParams.get("packageId");

    console.log("Subscriber ID:", subscriberId);
    setSubscriberId(subscriberId);

    console.log("Package ID:", packageId);
    setPackageId(packageId);
    handleOrder(subscriberId, packageId);
    // Add your payment processing logic here using subscriberId and packageId
  }, [location]);
  const handleOrder = async (subscriberId, packageId) => {
    console.log();

    try {
      // Assuming `subscriberId` and `packageId` are available within the scope
      const response = await fetch(`${baseUrl}/subscribers/create-order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subscriberID: parseInt(subscriberId),
          packageID: packageId,
        }),
      });

      if (!response.ok) {
        throw new Error(`Failed to create order: ${response.statusText}`);
      }

      const json = await response.json();
      console.log("json", json);

      // Load Cashfree
      const cashfree = await load({
        mode: "sandbox", // or "production"
      });

      let checkoutOptions = {
        paymentSessionId: json.paymentSessionID,
        redirectTarget: "_modal", // optional (_self, _blank, or _top)
        returnUrl: `https://saathi.etheriumtech.com/payment/status?order_id=${json.orderID}`,
      };

      cashfree.checkout(checkoutOptions).then((result) => {
        console.log("result ", result);

        if (result.error) {
          // This will be true whenever user clicks on close icon inside the modal or any error happens during the payment
          alert("User divya it is working");
          console.log(
            "User has closed the popup or there is some payment error, Check for Payment Status"
          );
          console.log(result.error);
        }
        if (result.redirect) {
          // This will be true when the payment redirection page couldnt be opened in the same window
          // This is an exceptional case only when the page is opened inside an inAppBrowser
          // In this case the customer will be redirected to return url once payment is completed
          console.log("Payment will be redirected");
        }
        if (result.paymentDetails) {
          // This will be called whenever the payment is completed irrespective of transaction status
          console.log("Payment has been completed, Check for Payment Status");
          console.log(result.paymentDetails.paymentMessage);
          navigate("/payment/success"); // Change to your desired route
        }
      });

      // Set order details after successful payment initialization
      setOrderDetail(json);
    } catch (error) {
      console.error("Order creation error:", error);
    }
  };

  return <div className=" flex bg-white"></div>;
}

export default Payment;
