import { PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { Row, Col } from "react-bootstrap";
import { CheckCircleOutlined } from "@ant-design/icons";

export default function CheckoutForm({email, name, image}) {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    //console.log(email, name, image)
    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }
    setIsProcessing(true);
    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${process.env.NEXT_PUBLIC_URL}/paySuccess?email=${email}&name=${name}&image=${image}`,
        receipt_email:email
      },
    });

    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message);
    } else {
      setMessage("An unexpected error occured.");
    }

    setIsProcessing(false);
  };

  return (
    <form id="payment-form" onSubmit={handleSubmit}>
      <Row>
        <Col md={12} className="text-center" >
        <img src={'/stripe/stripe-logo.png'} height={50}  alt="Stripe"/>
          <p className="mb-0 pb-0 silver-2-txt">Protected Checkout<CheckCircleOutlined className="mx-2" style={{color:'green', position:'relative', top:1}} /></p>
        </Col>
      </Row>
      <PaymentElement id="payment-element" className="my-4" />
      <Row>
        <Col md={12}>
        <button className="btn-custom-2" style={{width:'100%'}} disabled={isProcessing || !stripe || !elements} id="submit">
          <span id="button-text">
            {isProcessing ? "Processing ... " : "Checkout"}
          </span>
        </button>
        <p className="silver-2-txt mt-3">By confirming checkout, you allow Ticketsvalley to charge your card for this payment in accordance with our terms {"&"} conditions.</p>
        </Col>
      </Row>
      {/* Show any error or success messages */}
      {message && <div style={{color:'crimson'}}>{message}</div>}
    </form>
  );
}