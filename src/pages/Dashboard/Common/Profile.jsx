import { useState } from 'react'
import useAuth from '../../../hooks/useAuth'
import { Helmet } from 'react-helmet-async'
import coverImg from '../../../assets/images/cover.jpg'
import useRole from '../../../hooks/useRole'
import LoadingSpinner from '../../../components/Shared/LoadingSpinner'
import UpdateModal from '../../../components/Modal/UpdateModal'
// import UpdateModal from './UpdateModal' // ← import modal

const Profile = () => {
  const { user, loading } = useAuth()
  const [role, isLoading] = useRole()
  const [isModalOpen, setIsModalOpen] = useState(false)

  if (loading || isLoading) return <LoadingSpinner />

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className='flex justify-center items-center h-screen'>
      <Helmet>
        <title>Profile | Dashboard</title>
      </Helmet>

      <div className='bg-white shadow-lg rounded-2xl md:w-4/5 lg:w-3/5'>
        <img
          alt='cover photo'
          src={coverImg}
          className='w-full mb-4 rounded-t-lg h-56'
        />
        <div className='flex flex-col items-center justify-center p-4 -mt-16'>
          <img
            alt='profile'
            src={user.photoURL}
            className='mx-auto object-cover rounded-full h-24 w-24  border-2 border-white '
          />
          <p className='p-2 px-4 text-xs text-white bg-blue-500 rounded-full'>
            {role}
          </p>
          <p className='mt-2 text-xl font-medium text-gray-800 '>
            User Id: {user.uid}
          </p>

          <div className='w-full p-2 mt-4 rounded-lg'>
            <div className='flex flex-wrap items-center justify-between text-sm text-gray-600 '>
              <p className='flex flex-col'>
                Name
                <span className='font-bold text-black '>{user.displayName}</span>
              </p>
              <p className='flex flex-col'>
                Email
                <span className='font-bold text-black '>{user.email}</span>
              </p>

              <div>
                <button
                  onClick={openModal}
                  className='bg-blue-500 px-10 py-1 rounded-lg text-black cursor-pointer hover:bg-blue-800 block mb-1'
                >
                  Update Profile
                </button>
                <button className='bg-blue-500 px-7 py-1 rounded-lg text-black cursor-pointer hover:bg-blue-800'>
                  Change Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal Component */}
      <UpdateModal user={user} isOpen={isModalOpen} onClose={closeModal} />
    </div>
  )
}

export default Profile

