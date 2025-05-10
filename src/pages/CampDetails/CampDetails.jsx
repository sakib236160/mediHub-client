import Container from "../../components/Shared/Container";
// import { Helmet } from 'react-helmet-async'
import Heading from "../../components/Shared/Heading";
import Button from "../../components/Shared/Button/Button";
// import PurchaseModal from "../../components/Modal/JoinCampModal";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import LoadingSpinner from "../../components/Shared/LoadingSpinner";
import JoinCampModal from "../../components/Modal/JoinCampModal";

const CampDetails = () => {
  const { id } = useParams();
  const [isOpen, setIsOpen] = useState(false);

  const { data: camp = {}, isLoading, refetch } = useQuery({
    queryKey: ["camp", id],
    queryFn: async () => {
      const { data } = await axios(
        `${import.meta.env.VITE_API_URL}/camps/${id}`
      );
      return data;
    },
  });

  const closeModal = () => setIsOpen(false);

  if (isLoading) return <LoadingSpinner />;

  const {
    _id,
    name,
    image,
    participant,
    doctor,
    datetime,
    description,
    // specializedServices,
    audience,
    seller,
    location,
    fees,
    services,
  } = camp;

  return (
    <Container>
      {/* <Helmet>
        <title>{name}</title>
      </Helmet> */}
      <div className="mx-auto flex flex-col lg:flex-row justify-between w-full gap-12">
        {/* Image Section */}
        <div className="flex flex-col gap-6 flex-1">
          <div className="w-full h-full overflow-hidden rounded-xl">
            <img
              className="w-full h-full object-cover"
              src={image}
              alt={name}
            />
          </div>
        </div>

        {/* Details Section */}
        <div className="md:gap-10 flex-1">
          <Heading title={name} subtitle={`Location: ${location}`} />
          <hr className="my-6" />

          <div className="text-lg font-light text-neutral-500">
            {description}
          </div>
          <hr className="my-6" />

          <div className="text-md text-gray-600 space-y-2">
            <p>
              <span className="font-semibold">Doctor:</span> {doctor}
            </p>
            <p>
              <span className="font-semibold">Date & Time:</span> {datetime}
            </p>
            <p>
              <span className="font-semibold">Participant:</span> {participant}
            </p>
            <p>
              <span className="font-semibold">Audience:</span> {audience}
            </p>
            {/* <p><span className='font-semibold'>Specialized Services:</span> {specializedServices}</p> */}
            <p>
              <span className="font-semibold">Services:</span> {services}
            </p>
          </div>
          <hr className="my-6" />

          <div className="text-xl font-semibold flex flex-row items-center gap-2">
            <div>Seller: {seller?.name}</div>
            <div className="h-10 w-10">
              <img
                className="h-full w-full object-cover rounded-full"
                src={seller?.image}
                alt=""
              />
            </div>
          </div>
          <hr className="my-6" />

          <div className="flex justify-between items-center">
            <p className="font-bold text-3xl text-gray-500">Fees: ${fees}</p>
            <div>
              {participant > 0 ? (
                <Button label="Join Camp" onClick={() => setIsOpen(true)} />
              ) : (
                <p className="text-red-500 font-semibold">
                  Participant Out of Stock
                </p>
              )}
            </div>
          </div>
          <hr className="my-6" />

          <JoinCampModal camp={camp} closeModal={closeModal} isOpen={isOpen}  refetch={ refetch}/>
        </div>
      </div>
    </Container>
  );
};

export default CampDetails;
