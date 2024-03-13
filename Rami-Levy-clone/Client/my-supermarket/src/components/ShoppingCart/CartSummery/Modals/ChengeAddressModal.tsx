import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import {
  deleteUserAddressApi,
  getUserAddressesApi,
  updateDefaultAddressApi,
} from "../../../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../../../features/logged_in_user/loggedInUserSlice";
import AddNewAddress from "../../../../pages/PersonalProfil/UserAddress/AddNewAddress/AddNewAddress";
import { Address } from "../../../../rami-types";
import React, { useEffect, useState } from "react";
import RamiBtn from "../../../RamiBtn/RamiBtn";
import "./chenge-address-modal.scss";

interface Props {
  onClose: () => void;
  setSelectedAddress: (address: Address | null) => void;
  selectedAddress: Address | null;
  setNewOrder: (field: string, value: string | number) => void;
}

const ChengeAddressModal: React.FC<Props> = ({
  onClose,
  setSelectedAddress,
  selectedAddress,
  setNewOrder,
}) => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const [userAddresses, setUserAddresses] = useState<Address[]>([]);
  const [isPicOtherAddress, setIsPicOtherAddress] = useState(false);
  const [showAddNewAddressModal, setShowAddNewAddressModal] = useState(false);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loggedInUser && loggedInUser.addresses) {
      setUserAddresses(loggedInUser.addresses);
    }
  }, [loggedInUser]);

  const hendalDeleteAddress = async () => {
    try {
      if (
        loggedInUser &&
        selectedAddress &&
        selectedAddress.address_id &&
        loggedInUser.user_id
      ) {
        await dispatch(
          deleteUserAddressApi({
            address_id: selectedAddress.address_id,
            user_id: loggedInUser.user_id,
          })
        );
        if (loggedInUser && loggedInUser.user_id) {
          const res = await dispatch(getUserAddressesApi(loggedInUser.user_id));
          if (res.payload) {
            const defaultAddress = (res.payload as Address[]).find(
              (address) => address.is_default
            );
  
            setSelectedAddress(defaultAddress || null);
      
            setNewOrder("address_id", defaultAddress?.address_id || -1);
          }
        }
      }
    } catch (error) {
      console.error("Error sending order", error);  
    }
    
  };
  const hendalSetDefaultAddress = async () => {
    try {
      if (
        loggedInUser &&
        selectedAddress &&
        selectedAddress.address_id &&
        loggedInUser.user_id
      ) {
        await dispatch(
          updateDefaultAddressApi({
            address_id: selectedAddress.address_id,
            user_id: loggedInUser.user_id,
          })
        );
        if (loggedInUser && loggedInUser.user_id) {
          const res = await dispatch(getUserAddressesApi(loggedInUser.user_id));
          if (res.payload) {
            const defaultAddress = (res.payload as Address[]).find(
              (address) => address.is_default
            );
  
            setSelectedAddress(defaultAddress || null);
          }
        }
      }
    } catch (error) {
      console.error("Error sending order", error);
    }
    
  };
  return (
    <>
      <div className="change-address-main">
        <h1 className="change-address-title"> בחירת מועד משלוח</h1>
        <RamiBtn onClick={() => {}}>בדקו זמינות באיזורכים</RamiBtn>
      </div>
      {!isPicOtherAddress ? (
        <div>
          {selectedAddress && selectedAddress.is_default ? (
            <p>אנחנו מציגים את כתובת ברירת המחדל שלך</p>
          ) : (
            ""
          )}
          {selectedAddress && (
            <>
              <div className="address-maodal-card">
                <p>
                  {selectedAddress.street_name} {selectedAddress.house_number},{" "}
                  {selectedAddress.city_name}
                </p>
                {!selectedAddress.is_default && (
                  <RamiBtn onClick={hendalSetDefaultAddress}>
                    {" "}
                    הגדר כברירת מחדל
                  </RamiBtn>
                )}
                <RamiBtn onClick={hendalDeleteAddress}> מחק </RamiBtn>
                <RamiBtn onClick={() => {}}> עדכן </RamiBtn>
              </div>
            </>
          )}
          {!selectedAddress && (
            <>
              <p className="no-address-title">לא נבחרה כתובת</p>
            </>
          )}
          <RamiBtn
            onClick={() => {
              setIsPicOtherAddress(true);
            }}
          >
            לא הכתובת שלך?
          </RamiBtn>

          <RamiBtn onClick={onClose}>סגור</RamiBtn>
        </div>
      ) : (
        <div>
          <h1 className="choose-address-title">בחר כתובת</h1>
          <RamiBtn
            onClick={() => {
              setShowAddNewAddressModal(true);
            }}
          >
            הוסף כתובת חדשה
          </RamiBtn>
          <div>
            {userAddresses.map((address, index) => {
              return (
                <div key={index} className="address-maodal-card">
                  <p>
                    {address.street_name} {address.house_number},{" "}
                    {address.city_name}
                  </p>
                  <RamiBtn
                    onClick={() => {
                      setSelectedAddress(address);
                      setIsPicOtherAddress(false);
                    }}
                  >
                    בחר
                  </RamiBtn>
                </div>
              );
            })}
          </div>

          <RamiBtn
            onClick={() => {
              setIsPicOtherAddress(false);
            }}
          >
            חזור
          </RamiBtn>
        </div>
      )}
      {showAddNewAddressModal && (
        <AddNewAddress
          onClose={() => {
            setShowAddNewAddressModal(false);
          }}
        />
      )}
    </>
  );
};

export default ChengeAddressModal;
