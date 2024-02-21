import React, { useState } from 'react'
import AddNewAddress from './AddNewAddress/AddNewAddress'

const UserAddress = () => {
    const [addNewAddressPressed, setAddNewAddressPressed] = useState(false)
  return (
    <div>
        <h1>הכתובות שלי</h1>
        {/* Add the user address list here */}
      <button onClick={()=>{setAddNewAddressPressed(true)}}>הוספת כתובת חדשה</button>
      {addNewAddressPressed && <AddNewAddress onClose={()=>{setAddNewAddressPressed(false)}}/>}
    </div>
  )
}

export default UserAddress
