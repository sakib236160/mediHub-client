import { useState } from "react";
import { MapPin, CalendarDays, Users, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Button } from "@headlessui/react";
import JoinCampModal from "../Modal/JoinCampModal";

const Card = ({ camp, showJoinButton = false, refetch }) => {
  const {
    _id,
    name,
    image,
    fees,
    datetime,
    location,
    doctor,
    participant,
    audience,
    services,
    description,
  } = camp || {};

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 bg-white flex flex-col">
      {/* Image */}
      <img src={image} alt={name} className="w-full h-48 object-cover" />

      {/* Content */}
      <div className="p-4 flex flex-col gap-2 flex-grow">
        {/* Location */}
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <MapPin className="w-4 h-4" />
          {location}
        </div>

        {/* Doctor */}
        <div className="flex items-center text-gray-500 text-sm gap-1">
          <User className="w-4 h-4" />
          {doctor}
        </div>

        {/* Camp Name */}
        <h2 className="text-lg font-semibold text-primary">{name}</h2>

        {/* Short Description */}
        <p className="text-gray-600 text-sm line-clamp-3">
          {description?.slice(0, 120)}...
        </p>

        {/* Services */}
        <div className="flex flex-wrap gap-2 mt-2">
          {services?.map((service, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        {/* Audience */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <User className="w-4 h-4" />
          {audience}
        </div>

        {/* Footer Details */}
        <div className="flex justify-between text-gray-600 text-sm mt-4">
          <div className="flex items-center gap-1">
            <DollarSign className="w-4 h-4" />
            {fees ? `${fees}` : "Free"}
          </div>

          <div className="flex items-center gap-3">
            <CalendarDays className="w-4 h-4" />
            {datetime}
          </div>

          <div className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {participant}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-4 text-center">
          <div className="flex gap-4 justify-between">
            <Link to={`/camp/${_id}`}>
              <Button variant="link" className="text-primary">
                See Details →
              </Button>
            </Link>

            {showJoinButton && (
            <Button
                variant="solid"
                className="text-primary"
                onClick={() => setIsModalOpen(true)}
              >
                Join Camp →
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* JoinCamp Modal */}
      {showJoinButton && (
        <JoinCampModal
          closeModal={() => setIsModalOpen(false)}
          isOpen={isModalOpen}
          camp={camp}
          refetch={refetch}
        />
      )}
    </div>
  );
};

export default Card;
