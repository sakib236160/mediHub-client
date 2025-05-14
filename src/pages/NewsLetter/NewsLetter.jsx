import { useState } from "react";
import toast from "react-hot-toast";
import Container from "../../components/Shared/Container";

const NewsLetter = () => {
  const [email, setEmail] = useState(""); // Email state
  const [error, setError] = useState(""); // Error state

  // Handle form submission
  const onSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setError(""); // Clear any existing errors

    // Email validation
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if (!email) {
      setError("Email is required");
    } else if (!emailRegex.test(email)) {
      setError("Invalid email format");
    } else {
      // Success scenario
      setEmail(""); // Clear the email input field
      toast.success("Thanks for subscribing!"); // Show success toast
    }
  };

  return (
    <Container>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="flex flex-col items-center rounded-lg bg-primary/20 p-4 sm:p-8">
            <div className="mb-4 sm:mb-8">
              <h2 className="text-center font-Quicksand text-xl font-bold text-indigo-500 sm:text-2xl lg:text-3xl">
                Get the latest updates
              </h2>
              <p className="text-center text-gray-500 font-DancingScript">
                Sign up for our newsletter
              </p>
            </div>
            <form
              className="mb-3 flex w-full max-w-md gap-2 sm:mb-5"
              onSubmit={onSubmit}
            >
              <input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 p-2 w-full border border-primary/20 rounded-md focus:border-primary/20 outline-none transition-colors duration-300"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-indigo-500 text-white rounded-md hover:bg-indigo-600 transition duration-300"
              >
                Send
              </button>
            </form>

            {/* Error message */}
            {error && (
              <div className="text-md text-red-500">
                <span>{error}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </Container>
  );
};

export default NewsLetter;
