import { Helmet } from 'react-helmet-async'
import AddCampForm from '../../../components/Form/AddCampForm'
import { imageUpload } from '../../../api/utils'
import useAuth from '../../../hooks/useAuth'
import { useState } from 'react'
import useAxiosSecure from '../../../hooks/useAxiosSecure'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const AddCamp = () => {
  const navigate = useNavigate()
  const {user} = useAuth();
  const axiosSecure = useAxiosSecure()
  const [uploadImage, setUploadImage] = useState({image: {name:'Upload Image'}})
  console.log(uploadImage);
  const [loading,setLoading] = useState(false)
  // handle form submit
  const handleSubmit = async e =>{
    e.preventDefault()
    setLoading(true)
    const form = e.target
    const name = form.name.value;
    const description = form.description.value;
    const fees = parseFloat(form.fees.value);
    const date = form.date.value;   // input type="date" এর value
    const time = form.time.value; 
    const datetime = `${date}T${time}`;
    const location = form.location.value;
    const doctor = form.doctor.value;
    const audience = form.audience.value;
    const participant = parseInt(form.participant.value); 
    const services = form.services.value.split(',').map(s => s.trim());
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
      audience,
      services,
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
      navigate('/dashboard/my-inventory')
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
      uploadImage={uploadImage}
      setUploadImage={setUploadImage}
      loading ={loading}
      />
    </div>
  )
}

export default AddCamp
