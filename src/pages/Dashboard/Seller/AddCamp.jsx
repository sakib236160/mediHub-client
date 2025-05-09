import { Helmet } from 'react-helmet-async'
import AddCampForm from '../../../components/Form/AddCampForm'
import { imageUpload } from '../../../api/utils'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'

const AddCamp = () => {
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()
  const [uploadButtonText, setUploadButtonText] = useState({name:'Upload Image'})
  const [loading,setLoading] = useState(false)
  // handle form submit
  const handleSubmit = async e =>{
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const name = form.name.value;
    const description = form.description.value;
    const fees = parseFloat(form.fees.value);
    const datetime = form.datetime.value;
    const location = form.location.value;
    const doctor = form.doctor.value;
    const participant = parseInt(form.participant.value); 
    const image = form.image.files[0];
    const imageUrl = await imageUpload(image)
    // seller info
    const seller = {
      name: user?.displayName,
      image: user?.photoURL,
      email: user?.email
    }
    // create camp data object
    const campData = {
      name,
      description,
      fees,
      datetime,
      location,
      doctor,
      participant,
      image: imageUrl,
      seller
    }
    console.table(campData);
    // save camp in db
    try{
      // post request
      await axiosSecure.post('/camps',campData)
      toast.success('Data Added Successfully!')
    }catch(error){
      console.log(error);
    }
    finally{
      setLoading(false)
    }
  }
  return (
    <div>
      <Helmet>
        <title>Add A Camp | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddCampForm 
      handleSubmit={handleSubmit} 
      uploadButtonText={uploadButtonText}
      setUploadButtonText={setUploadButtonText}
      loading ={loading}
      />
    </div>
  )
}

export default AddCamp
