// // src/pages/Review/Review.jsx

// import { useEffect, useState } from "react";
// import { FaStar } from "react-icons/fa";
// import useAxiosSecure from "../../hooks/useAxiosSecure";
// import SectionTitle from "../../components/SectionTitle/SectionTitle";
// import Container from "../../components/Shared/Container";

// const Review = () => {
//   const axiosSecure = useAxiosSecure();
//   const [reviews, setReviews] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchReviews = async () => {
//       try {
//         const res = await axiosSecure.get("/reviews");
//         setReviews(res.data);
//       } catch (err) {
//         console.error("Failed to fetch reviews:", err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchReviews();
//   }, [axiosSecure]);

//   if (loading) {
//     return (
//       <div className="text-center py-10 text-xl font-semibold">
//         Loading reviews...
//       </div>
//     );
//   }

//   if (reviews.length === 0) {
//     return (
//       <div className="text-center py-10 text-xl font-semibold">
//         No reviews found.
//       </div>
//     );
//   }

//   return (
//     <Container>
//         <div className="">
//       <SectionTitle
//         heading="Trusted by Our Community"
//         subHeading="See What People Are Saying About Their MediHub Experience"
//       />
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.map((review) => (
//           <div
//             key={review._id}
//             className="bg-white shadow-lg rounded-2xl p-6 border border-gray-200"
//           >
//             {/* Reviewer Info */}
//             <div className="flex items-center gap-3 mb-4">
//               <img
//                 src={
//                   review.reviewerImage || "https://i.ibb.co/5GzXkwq/user.png"
//                 }
//                 alt="user"
//                 className="w-12 h-12 rounded-full object-cover border"
//               />
//               <div>
//                 <h3 className="font-bold text-lg">
//                   {review.reviewerName || "Anonymous"}
//                 </h3>
//                 <p className="text-sm text-gray-500">
//                   {new Date(review.createdAt).toLocaleString()}
//                 </p>
//               </div>
//             </div>

//             {/* Feedback Text */}
//             <p className="mb-3 text-gray-700">{review.reviewText}</p>

//             {/* Rating */}
//             <div className="flex items-center gap-1">
//               {Array.from({ length: review.rating }).map((_, index) => (
//                 <FaStar key={index} className="text-yellow-500" />
//               ))}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//     </Container>
//   );
// };

// export default Review;





import { useEffect, useState } from "react";
import { FaStar, FaCheckCircle } from "react-icons/fa";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import SectionTitle from "../../components/SectionTitle/SectionTitle";
import Container from "../../components/Shared/Container";

const Review = () => {
  const axiosSecure = useAxiosSecure();
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await axiosSecure.get("/reviews");
        setReviews(res.data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, [axiosSecure]);

  if (loading) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        Loading reviews...
      </div>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-10 text-xl font-semibold">
        No reviews found.
      </div>
    );
  }

  return (
    <Container>
      <div>
        <SectionTitle
          heading="Trusted by Our Community"
          subHeading="See What People Are Saying About Their MediHub Experience"
        />
        <div className="flex flex-col md:flex-row md:justify-center md:gap-6 flex-wrap">
          {reviews.slice(0, 2).map((review) => (
            <div
              key={review._id}
              className="w-full md:w-[48%] bg-gradient-to-br from-white to-gray-50 hover:shadow-xl transition-shadow duration-300 shadow-md rounded-2xl p-6 border border-gray-200"
            >
              {/* Reviewer Info */}
              <div className="flex items-center gap-3 mb-4">
                <img
                  src={
                    review.reviewerImage ||
                    "https://i.ibb.co/5GzXkwq/user.png"
                  }
                  alt="user"
                  className="w-12 h-12 rounded-full object-cover border"
                />
                <div>
                  <h3 className="font-bold text-lg">
                    {review.reviewerName || "Anonymous"}
                  </h3>
                  <div className="flex items-center text-xs text-blue-600 gap-1">
                    <FaCheckCircle /> Verified User
                  </div>
                  <p className="text-sm text-gray-500">
                    {new Date(review.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>

              {/* Divider */}
              <hr className="my-4 border-gray-300" />

              {/* Feedback Text */}
              <p className="mb-4 text-gray-700 italic relative pl-6">
                <span className="absolute left-0 text-2xl text-gray-300">“</span>
                {review.reviewText}
              </p>

              {/* Rating */}
              <div className="flex items-center gap-1 mt-auto">
                {Array.from({ length: review.rating }).map((_, index) => (
                  <FaStar key={index} className="text-yellow-500" />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
};

export default Review;
