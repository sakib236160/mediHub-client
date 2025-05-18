import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import "./CheckoutForm.css";
import Button from "../Shared/Button/Button";
import { useEffect, useState, useContext } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { AuthContext } from "../../providers/AuthProvider"; 

const CheckoutForm = ({ closeModal, submitInfo, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [userRole, setUserRole] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const { user } = useContext(AuthContext); 

  // Get user role
  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const { data } = await axiosSecure.get(`/users/role/${user?.email}`);
        setUserRole(data?.role);
      } catch (error) {
        console.error("Failed to fetch user role:", error);
      }
    };

    if (user?.email) {
      fetchUserRole();
    }
  }, [user?.email, axiosSecure]);

  // Get Stripe payment intent
  useEffect(() => {
    if (submitInfo?.fees && submitInfo?.campId) {
      getPaymentIntent();
    }
  }, [submitInfo]);

  const getPaymentIntent = async () => {
    try {
      const { data } = await axiosSecure.post("/create-payment-intent", {
        fees: submitInfo?.fees,
        campId: submitInfo?.campId,
      });
      setClientSecret(data.clientSecret);
    } catch (err) {
      console.error("Error creating payment intent:", err);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      console.warn("Stripe or Elements not loaded yet");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      console.warn("Card Element not found");
      return;
    }

    try {
      // Step 1: Create payment method
      const { error: pmError, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (pmError) {
        console.error("Payment Method Error:", pmError);
        toast.error(pmError.message);
        return;
      }

      // Step 2: Confirm card payment
      const { paymentIntent, error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: submitInfo?.customer?.name || "No Name",
            email: submitInfo?.customer?.email || "noemail@example.com",
          },
        },
      });

      if (confirmError) {
        console.error("Confirm Payment Error:", confirmError);
        toast.error(confirmError.message);
        return;
      }

      // Step 3: If payment successful, save order and update participant count
      if (paymentIntent.status === "succeeded") {
        const paymentData = {
          ...submitInfo,
          transactionId: paymentIntent.id,
        };

        await axiosSecure.post("/order", paymentData);

        await axiosSecure.patch(`/camps/participant/${submitInfo.campId}`, {
          participantToUpdate: 1,
          status: "decrease",
        });

        toast.success("Payment successful & camp joined!");
        refetch?.();
        closeModal();
      }
    } catch (err) {
      console.error("Stripe catch error:", err);
      toast.error("Something went wrong during payment!");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex justify-around mt-2 gap-6">
        <Button
          disabled={!stripe || !clientSecret || userRole === "seller"}
          type="submit"
          label={`Pay $${submitInfo?.fees}`}
        />
        <Button outline={true} onClick={closeModal} label={"Cancel"} />
      </div>
    </form>
  );
};

export default CheckoutForm;
