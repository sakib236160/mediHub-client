import { BsFillHouseAddFill } from 'react-icons/bs'
import { MdHomeWork, MdOutlineManageHistory } from 'react-icons/md'
import MenuItem from './MenuItem'
const SellerMenu = () => {
  return (
    <>
      <MenuItem
        icon={BsFillHouseAddFill}
        label='Add A Camp'
        address='add-camp'
      />
      <MenuItem icon={MdHomeWork} label='Manage Camp' address='manage-camp' />
      <MenuItem
        icon={MdOutlineManageHistory}
        label='Manage Registered Camps'
        address='manage-registered-camps'
      />
    </>
  )
}

export default SellerMenu
