// import { TbFidgetSpinner } from "react-icons/tb"

// const AddCampForm = ({handleSubmit,uploadButtonText,setUploadButtonText,loading}) => {
//   return (
//     <div className='w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50'>
//       <form onSubmit={handleSubmit}>
//         <div className='grid grid-cols-1 lg:grid-cols-2 gap-10'>
//           <div className='space-y-6'>
//             {/* Camp Name */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='name' className='block text-gray-600'>
//                 Camp Name
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='name'
//                 id='name'
//                 type='text'
//                 placeholder='Enter camp name'
//                 required
//               />
//             </div>

//             {/* Camp Fees */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='fees' className='block text-gray-600'>
//                 Camp Fees
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='fees'
//                 id='fees'
//                 type='number'
//                 placeholder='Enter camp fees'
//                 required
//               />
//             </div>

//             {/* Date & Time */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='datetime' className='block text-gray-600'>
//                 Date & Time
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='datetime'
//                 id='datetime'
//                 type='datetime-local'
//                 required
//               />
//             </div>

//             {/* Description */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='description' className='block text-gray-600'>
//                 Description
//               </label>
//               <textarea
//                 id='description'
//                 placeholder='Write camp description here...'
//                 className='block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500'
//                 name='description'
//               ></textarea>
//             </div>
//           </div>

//           <div className='space-y-6 flex flex-col'>
//             {/* Location */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='location' className='block text-gray-600'>
//                 Location
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='location'
//                 id='location'
//                 type='text'
//                 placeholder='Enter camp location'
//                 required
//               />
//             </div>

//             {/* Healthcare Professional Name */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='doctor' className='block text-gray-600'>
//                 Healthcare Professional Name
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='doctor'
//                 id='doctor'
//                 type='text'
//                 placeholder='Enter doctor/healthcare name'
//                 required
//               />
//             </div>

//             {/* Participant Count */}
//             <div className='space-y-1 text-sm'>
//               <label htmlFor='participant' className='block text-gray-600'>
//                 Participant Count
//               </label>
//               <input
//                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
//                 name='participant'
//                 id='participant'
//                 type='number'
//                 placeholder='0'
//                 defaultValue={0}
//                 required
//               />
//             </div>

//             {/* Image Upload */}
//             <div className='p-4 w-full m-auto rounded-lg flex-grow'>
//               <div className='file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg'>
//                 <div className='flex flex-col w-max mx-auto text-center'>
//                   <label>
//                     <input
//                     onChange={(e)=>setUploadButtonText(e.target.files[0])}
//                       className='text-sm cursor-pointer w-36 hidden'
//                       type='file'
//                       name='image'
//                       id='image'
//                       accept='image/*'
//                       hidden
//                     />
//                     <div className='bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500'>
//                       {uploadButtonText.name}
//                     </div>
//                   </label>
//                 </div>
//               </div>
//             </div>
//             { uploadButtonText.size && (
//               <p>Image Size:{uploadButtonText.size}Bytes</p>
//             )
//             }

//             {/* Submit Button */}
//             <button
//               type='submit'
//               className='w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500'
//             >
//                {loading ? (
//                               <TbFidgetSpinner className='animate-spin m-auto' />
//                             ) : (
//                               'Save & Continue'
//                             )}
              
//             </button>
//           </div>
//         </div>
//       </form>
//     </div>
//   )
// }

// export default AddCampForm





import { TbFidgetSpinner } from "react-icons/tb";

const AddCampForm = ({
  handleSubmit,
  uploadButtonText,
  setUploadButtonText,
  loading,
}) => {
  return (
    <div className="w-full min-h-[calc(100vh-40px)] flex flex-col justify-center items-center text-gray-800 rounded-xl bg-gray-50">
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            {/* Camp Name */}
            <div className="space-y-1 text-sm">
              <label htmlFor="name" className="block text-gray-600">
                Camp Name
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="name"
                id="name"
                type="text"
                placeholder="Enter camp name"
                required
              />
            </div>

            {/* Camp Fees */}
            <div className="space-y-1 text-sm">
              <label htmlFor="fees" className="block text-gray-600">
                Camp Fees
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="fees"
                id="fees"
                type="number"
                placeholder="Enter camp fees"
                required
              />
            </div>

            {/* Date */}
            <div className="space-y-1 text-sm">
              <label htmlFor="date" className="block text-gray-600">
                Date
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="date"
                id="date"
                type="date"
                required
              />
            </div>

            {/* Time */}
            <div className="space-y-1 text-sm">
              <label htmlFor="time" className="block text-gray-600">
                Time
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="time"
                id="time"
                type="time"
                required
              />
            </div>



             {/* Participant Count */}
            <div className='space-y-1 text-sm'>
              <label htmlFor='participant' className='block text-gray-600'>
                 Participant Count
               </label>
               <input
                 className='w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white'
                 name='participant'
                 id='participant'
                 type='number'
                 placeholder='0'
                 defaultValue={0}
                 required
               />
             </div>

            {/* Description */}
            <div className="space-y-1 text-sm">
              <label htmlFor="description" className="block text-gray-600">
                Description
              </label>
              <textarea
                id="description"
                placeholder="Write camp description here..."
                className="block rounded-md w-full h-32 px-4 py-3 text-gray-800 border border-lime-300 bg-white focus:outline-lime-500"
                name="description"
              ></textarea>
            </div>
          </div>

          <div className="space-y-6 flex flex-col">
            {/* Location */}
            <div className="space-y-1 text-sm">
              <label htmlFor="location" className="block text-gray-600">
                Location
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="location"
                id="location"
                type="text"
                placeholder="Enter camp location"
                required
              />
            </div>

            {/* Healthcare Professional Name (Dropdown) */}
            <div className="space-y-1 text-sm">
              <label htmlFor="doctor" className="block text-gray-600">
                Healthcare Professional
              </label>
              <select
                name="doctor"
                id="doctor"
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                required
              >
                <option value="">Select a professional</option>
                <option value="Dr. Ahmed">Dr. Ahmed</option>
                <option value="Dr. Fatima">Dr. Fatima</option>
                <option value="Dr. Khan">Dr. Khan</option>
              </select>
            </div>

            {/* Target Audience */}
            <div className="space-y-1 text-sm">
              <label htmlFor="audience" className="block text-gray-600">
                Target Audience
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="audience"
                id="audience"
                type="text"
                placeholder="e.g. Elderly, Children, Pregnant Women"
                required
              />
            </div>

            {/* Specialized Services */}
            <div className="space-y-1 text-sm">
              <label htmlFor="services" className="block text-gray-600">
                Specialized Services
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-lime-300 focus:outline-lime-500 rounded-md bg-white"
                name="services"
                id="services"
                type="text"
                placeholder="e.g. Eye Checkup, Dental, Blood Pressure"
              />
            </div>

            {/* Image Upload */}
            <div className="p-4 w-full m-auto rounded-lg flex-grow">
              <div className="file_upload px-5 py-3 relative border-4 border-dotted border-gray-300 rounded-lg">
                <div className="flex flex-col w-max mx-auto text-center">
                  <label>
                    <input
                      onChange={(e) => setUploadButtonText(e.target.files[0])}
                      className="text-sm cursor-pointer w-36 hidden"
                      type="file"
                      name="image"
                      id="image"
                      accept="image/*"
                      hidden
                    />
                    <div className="bg-lime-500 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-lime-500">
                      {uploadButtonText?.name || "Upload Image"}
                    </div>
                  </label>
                </div>
              </div>
            </div>

            {/* Image Size Info */}
            {uploadButtonText?.size && (
              <p>Image Size: {uploadButtonText.size} Bytes</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full p-3 mt-5 text-center font-medium text-white transition duration-200 rounded shadow-md bg-lime-500"
            >
              {loading ? (
                <TbFidgetSpinner className="animate-spin m-auto" />
              ) : (
                "Save & Continue"
              )}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddCampForm;
