
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { deleteUserAddressApi, getUserAddressesApi, updateDefaultAddressApi } from "../../../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../../../features/logged_in_user/loggedInUserSlice";
import AddNewAddress from "../../../../pages/PersonalProfil/UserAddress/AddNewAddress/AddNewAddress";
import { Address } from "../../../../rami-types"
import React, { useEffect, useState } from 'react'

interface Props {
    onClose: () => void;
    setSelectedAddress: (address: Address |null) => void;
    selectedAddress: Address |null ;
}

const ChengeAddressModal : React.FC<Props> = ({onClose, setSelectedAddress, selectedAddress}) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [isPicOtherAddress, setIsPicOtherAddress] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loggedInUser && loggedInUser.addresses) {
      setUserAddresses(loggedInUser.addresses)
    }
  }, [loggedInUser]);
  
 const hendalDeleteAddress = async () => {
    if (loggedInUser && selectedAddress && selectedAddress.address_id && loggedInUser.user_id) {
       await dispatch(deleteUserAddressApi({ address_id: selectedAddress.address_id, user_id: loggedInUser.user_id }) );
      if (loggedInUser && loggedInUser.user_id) {
        const res =await dispatch(getUserAddressesApi(loggedInUser.user_id));
          if (res.payload) {
            const defaultAddress  = (res.payload as Address[]).find(
              (address) => address.is_default
            );
            
            setSelectedAddress(defaultAddress || null);
          }
      }
    }
    }
    const hendalSetDefaultAddress = async () => {
      if (loggedInUser && selectedAddress && selectedAddress.address_id && loggedInUser.user_id) {
        
        await dispatch(updateDefaultAddressApi({ address_id: selectedAddress.address_id, user_id: loggedInUser.user_id }) );
        if (loggedInUser && loggedInUser.user_id) {
          
          const res =await dispatch(getUserAddressesApi(loggedInUser.user_id));
          if (res.payload) {
            const defaultAddress  = (res.payload as Address[]).find(
              (address) => address.is_default
            );
            
            setSelectedAddress(defaultAddress || null);
          }
        }
      }

    }
  return (
    <>
     <div>
       <h1> בחירת מועד משלוח</h1>
       <button onClick={() =>{}}>בדקו זמינות באיזורכים</button>
       </div>
     {!isPicOtherAddress ? 
       <div>
       {
        selectedAddress && selectedAddress.is_default? <p>אנחנו מציגים את כתובת ברירת המחדל שלך</p> :"" }
       {
         selectedAddress &&
         <>
         <div className="address-maodal-card">
           <p>{selectedAddress.street_name} {selectedAddress.house_number}, {selectedAddress.city_name}</p>
           {
             !selectedAddress.is_default && <button onClick={hendalSetDefaultAddress}>  הגדר כברירת מחדל</button>
 
           }
           <button onClick={hendalDeleteAddress}>  מחק  </button>
           <button onClick={() =>{}}>  עדכן  </button>

         </div>
         </>
       }
     {!selectedAddress
        && <>
          <p>לא נבחרה כתובת</p>
         
        </>     }
       <button onClick={() =>{setIsPicOtherAddress(true)}}>לא הכתובת שלך?</button>
 
       <button onClick={onClose}>סגור</button>
     </div> : 
     <div>
        <h1>בחר כתובת</h1>
        <button onClick={() =>{setShowAddNewAddressModal(true)}}>הוסף כתובת חדשה</button>
        <div>
          {userAddresses.map((address, index) => {
            return (
              <div key={index} className="address-maodal-card">
                <p>{address.street_name} {address.house_number}, {address.city_name}</p>
                <button onClick={() =>{setSelectedAddress(address);setIsPicOtherAddress(false) }}>בחר</button>
              </div>
            )
          })}
        </div>
       
        <button onClick={() =>{setIsPicOtherAddress(false)}}>חזור</button>
       
     </div>
     
     }
     {showAddNewAddressModal && <AddNewAddress onClose={() => {setShowAddNewAddressModal(false)}}/>}
      
    </>
     

  
  )
}

export default ChengeAddressModal
