import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { getUserAddressesApi } from "../../../../features/logged_in_user/loggedInUserAPI";
import { loggedInUserSelector } from "../../../../features/logged_in_user/loggedInUserSlice";
import "./AddressCard.scss";
const AddressCard = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (loggedInUser && loggedInUser.user_id) {
      dispatch(getUserAddressesApi(loggedInUser.user_id));
    }
  }, []);
  return (
    <div className="address-card-container">
      {loggedInUser &&
        loggedInUser.addresses &&
        loggedInUser.addresses.map((address) => {
          return (
            <div className="address-card">
              <h3>שם הכתובת {address.address_name}</h3>
              <p>עיר {address.city_name}</p>
              <p>רחוב {address.street_name}</p>
              <p>קומה {address.floor}</p>
              <p>דירה {address.apartment}</p>
              <p>מיקוד {address.zip_code}</p>
              <p>מספר טלפון {address.phone_number}</p>
            </div>
          );
        })}
    </div>
  );
};

export default AddressCard;
