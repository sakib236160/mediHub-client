// import { Link } from 'react-router-dom'

// const Card = ({camp}) => {
//   const { _id, name, image, fees, dateTime, location, healthcareProfessional, participantCount, targetAudience, services, description } = camp || {};
//   return (
//     <Link
//       to={`/plant/1`}
//       className='col-span-1 cursor-pointer group shadow-xl p-3 rounded-xl'
//     >
//       <div className='flex flex-col gap-2 w-full'>
//         <div
//           className='
//               aspect-square 
//               w-full 
//               relative 
//               overflow-hidden 
//               rounded-xl
//             '
//         >
//           <img
//             className='
//                 object-cover 
//                 h-full 
//                 w-full 
//                 group-hover:scale-110 
//                 transition
//               '
//             src={image}
//             alt='Plant Image'
//           />
//           <div
//             className='
//               absolute
//               top-3
//               right-3
//             '
//           ></div>
//         </div>
//         <div className='font-semibold text-lg'>
//         <h1 className="title-font text-lg font-medium text-gray-900 mb-3">
//                         {name}
//                     </h1>
//         </div>
//         <div className='font-semibold text-lg'>
//         <p className="leading-relaxed mb-3">
//                         {description?.split(" ").slice(0, 5).join(" ")}
//                     </p>
//         </div>
//         <div className='font-semibold text-lg'>Category: Indoor</div>
//         <div className='font-semibold text-lg'>Quantity: 10</div>
//         <div className='flex flex-row items-center gap-1'>
//           <div className='font-semibold'> Price: 15$</div>
//         </div>
//       </div>
//     </Link>
//   )
// }

// export default Card






import { MapPin, CalendarDays, Users, DollarSign, User } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "../ui/Badge";
import { Button } from "../ui/Button";

const Card = ({ camp }) => {
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

        {/* healthcareProfessional */}
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

        {/* Services Badge */}
        <div className="flex flex-wrap gap-2 mt-2">
          {services?.map((service, idx) => (
            <Badge key={idx} variant="secondary" className="text-xs">
              {service}
            </Badge>
          ))}
        </div>

        {/* Target Audience */}
        <div className="flex items-center gap-2 text-gray-500 text-sm mt-2">
          <User className="w-4 h-4" />
          {audience}
        </div>

        {/* Bottom Details */}
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

        {/* Buttons */}
        <div className="mt-4 text-center">
          <div className="flex gap-4 justify-center">
            <Link to={`/camp-details/${_id}`}>
              <Button variant="link" className="text-primary">
                See Details →
              </Button>
            </Link>
            <Button variant="solid" className="bg-blue-600 text-white">
              Join Camp
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;

