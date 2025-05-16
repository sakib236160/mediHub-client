import { useState } from "react";
import PropTypes from "prop-types";
import toast from "react-hot-toast";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const UpdatePlantForm = ({ camp, setIsEditModalOpen, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const imgbbApiKey = import.meta.env.VITE_IMGBB_API_KEY;

  const [formData, setFormData] = useState({
    name: camp.name || "",
    location: camp.location || "",
    fees: camp.fees || "",
    participant: camp.participant || "",
    image: camp.image || "",
  });

  const [imageFile, setImageFile] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = formData.image;

      if (imageFile) {
        const imageData = new FormData();
        imageData.append("image", imageFile);

        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${imgbbApiKey}`,
          {
            method: "POST",
            body: imageData,
          }
        );

        const data = await res.json();
        if (data.success) {
          imageUrl = data.data.url;
        } else {
          toast.error("Image upload failed");
          return;
        }
      }

      const updatedData = {
        ...formData,
        fees: Number(formData.fees),
        participant: Number(formData.participant),
        image: imageUrl,
      };

      await axiosSecure.put(`/camps/${camp._id}`, updatedData);
      toast.success("Camp updated successfully!");
      setIsEditModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to update");
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 gap-10">
          <div className="space-y-6">
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Name
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                type="text"
                placeholder="Plant Name"
                required
              />
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                type="text"
                placeholder="Camp Location"
                required
              />
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            <div className="flex justify-between gap-2">
              <div className="space-y-1 text-sm w-full">
                <label htmlFor="fees" className="block text-gray-600">
                  Fees
                </label>
                <input
                  name="fees"
                  value={formData.fees}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  type="number"
                  placeholder="Camp Fees"
                  required
                />
              </div>

              <div className="space-y-1 text-sm w-full">
                <label htmlFor="participant" className="block text-gray-600">
                  Participant
                </label>
                <input
                  name="participant"
                  value={formData.participant}
                  onChange={handleChange}
                  className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                  type="number"
                  placeholder="Available Participant"
                  required
                />
              </div>
            </div>

            <div className="space-y-1 text-sm">
              <label htmlFor="image" className="block text-gray-600">
                Upload Image
              </label>
              <input
                onChange={handleFileChange}
                className="w-full px-4 py-3 text-gray-800 border border-blue-300 focus:outline-blue-500 rounded-md bg-white"
                type="file"
                accept="image/*"
              />
              {/* <p className="text-xs text-gray-500 mt-1">
                Leave empty to keep existing image.
              </p> */}
            </div>

            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-blue-500 hover:bg-blue-600"
            >
              Update Camp
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

UpdatePlantForm.propTypes = {
  camp: PropTypes.object.isRequired,
  setIsEditModalOpen: PropTypes.func.isRequired,
  refetch: PropTypes.func.isRequired,
};

export default UpdatePlantForm;

