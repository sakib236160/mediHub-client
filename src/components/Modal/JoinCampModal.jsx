/* eslint-disable react/prop-types */
import {
  Dialog,
  Transition,
  TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Form/CheckoutForm";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

const JoinCampModal = ({ closeModal, isOpen, camp, refetch }) => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { _id, name, fees, seller } = camp;

  const [submitInfo, setSubmitInfo] = useState({
    customer: {
      name: user?.displayName || "",
      email: user?.email || "",
      image: user?.photoURL || "",
    },
    campId: _id,
    fees: fees,
    seller: seller?.email || "",
    address: "",
    status: "Pending",
    age: "",
    gender: "",
    phone: "",
    emergencyContact: "",
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-8 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-2xl font-semibold text-gray-900 mb-6 text-center"
                >
                  Camp Registration
                </DialogTitle>

                {/* Basic Info Form Part */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input
                    type="text"
                    value={user?.displayName || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Your Age"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        age: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="email"
                    value={user?.email || ""}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <select
                    className="select select-bordered w-full"
                    defaultValue=""
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        gender: e.target.value,
                      }))
                    }
                  >
                    <option disabled value="">
                      Gender
                    </option>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                  </select>
                  <input
                    type="text"
                    placeholder="Your Phone Number"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        phone: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="number"
                    value={fees}
                    readOnly
                    className="input input-bordered w-full bg-gray-100"
                  />
                  <input
                    type="text"
                    placeholder="Enter Your Address"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        address: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                  />
                  <input
                    type="text"
                    placeholder="Emergency Contact"
                    onChange={(e) =>
                      setSubmitInfo((prev) => ({
                        ...prev,
                        emergencyContact: e.target.value,
                      }))
                    }
                    className="input input-bordered w-full"
                  />
                </div>

                {/* Stripe Checkout Form */}
                <div className="mt-6">
                  <Elements stripe={stripePromise}>
                    <CheckoutForm
                      closeModal={closeModal}
                      submitInfo={submitInfo}
                      refetch={refetch}
                    />
                  </Elements>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JoinCampModal;