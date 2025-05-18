import Lottie from "lottie-react";
import animationData from "../../assets/animations/medicare.json";
import { Link } from "react-router-dom";
import Container from "../../components/Shared/Container";
import SectionTitle from "../../components/SectionTitle/SectionTitle";

const MedicareHighlight = () => {
  return (
    <Container>
      <section className="bg-gradient-to-r from-white via-blue-50 to-white px-5 md:px-16 py-14 rounded-2xl shadow-md">
        {/* Section Title */}
        <SectionTitle
          heading="Smarter Medicare Camps"
          subHeading="Simplifying camp management with speed, care, and innovation."
        />

        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-10 mt-10">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left space-y-6">
            <h2 className="text-4xl lg:text-5xl font-extrabold text-primary leading-tight">
              Advanced Medicare Support
            </h2>
            <p className="text-gray-600 text-base lg:text-lg">
              Discover how our platform is revolutionizing medical camp
              management with speed, care, and trust.
            </p>
            <Link
              to="/available-camps"
              className="inline-block bg-primary text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-primary/90 transition duration-300 shadow-md"
            >
              Explore Camps
            </Link>
          </div>

          {/* Animation */}
          <div className="w-full md:w-1/2">
            <Lottie
              animationData={animationData}
              loop
              className="w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </section>
    </Container>
  );
};

export default MedicareHighlight;
