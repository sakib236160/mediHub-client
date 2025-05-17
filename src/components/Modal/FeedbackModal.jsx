// src/components/Modal/FeedbackModal.jsx

import {
  Dialog,
  Transition,
  TransitionChild as _TransitionChild,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { Fragment, useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const FeedbackModal = ({ isOpen, closeModal, orderData }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth(); 
  const [reviewText, setReviewText] = useState("");
  const [rating, setRating] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  if (!orderData || !user) return null;

  const { name, address, fees, image, participant, campId, _id } = orderData;

  const handleSubmit = async () => {
    if (!reviewText.trim() || rating === 0) {
      toast.error("Please enter review and rating");
      return;
    }

    try {
      setSubmitting(true);

      const reviewInfo = {
        campId,
        orderId: _id,
        reviewer: user?.email || "Unknown",
        reviewerName: user?.displayName || "Anonymous",
        reviewerImage: user?.photoURL || "",
        name,
        image,
        rating,
        reviewText,
        createdAt: new Date(),
      };

      const res = await axiosSecure.post("/reviews", reviewInfo);

      if (res.data.insertedId) {
        toast.success("Review submitted successfully");
        closeModal();
        setRating(0);
        setReviewText("");
      }
    } catch (err) {
      toast.error("Failed to submit review");
    } finally {
      setSubmitting(false);
    }
  };

  const TransitionChild = _TransitionChild || Transition.Child;

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
              <DialogPanel className="w-full max-w-lg transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 mb-4"
                >
                  Submit Your Feedback
                </DialogTitle>

                <div className="mb-4">
                  <img
                    src={image}
                    alt={name}
                    className="w-full h-48 object-cover rounded mb-2"
                  />
                  <h2 className="text-xl font-semibold">{name}</h2>
                  <p className="text-sm text-gray-600">{address}</p>
                  <p className="text-sm text-gray-700">
                    Fees: ${fees} | Participants: {participant}
                  </p>
                </div>

                <div className="mb-3">
                  <label className="block font-medium mb-1">Rating:</label>
                  <div className="flex space-x-1 text-2xl">
                    {[1, 2, 3, 4, 5].map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setRating(num)}
                        className={
                          num <= rating ? "text-yellow-400" : "text-gray-300"
                        }
                      >
                        ★
                      </button>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block font-medium mb-1">Your Review:</label>
                  <textarea
                    rows={4}
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    className="w-full border border-gray-300 rounded px-3 py-2"
                  />
                </div>

                <div className="flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded"
                    disabled={submitting}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded"
                    disabled={submitting}
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                </div>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

FeedbackModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  orderData: PropTypes.object.isRequired,
};

export default FeedbackModal;
