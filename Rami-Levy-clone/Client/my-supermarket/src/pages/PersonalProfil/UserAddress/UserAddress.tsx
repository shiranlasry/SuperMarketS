import { useState } from "react";
import AddNewAddress from "./AddNewAddress/AddNewAddress";
import "./UserAddress.scss";

const UserAddress = () => {
  const [addNewAddressPressed, setAddNewAddressPressed] = useState(false);
  return (
    <div className="address-main">
      <div className="address-container">
        <h3 className="address-title">הכתובות שלי</h3>
        <img className="map-img" src="/src/assets/img/map.png" />
      </div>
      {/* Add the user address list here */}
      <button
        className="new-address-btn"
        onClick={() => {
          setAddNewAddressPressed(true);
        }}
      >
        <div className="new-address-icon">
          <svg
            data-v-93fe8066=""
            xmlns="http://www.w3.org/2000/svg"
            height="20px"
            width="20px"
            viewBox="0 0 426.66667 426.66667"
            className="plus-svg"
          >
            <path
              data-v-93fe8066=""
              d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"
            ></path>
          </svg>
        </div>
        <p className="add-new-address">הוספת כתובת חדשה</p>
      </button>
      {addNewAddressPressed && (
        <AddNewAddress
          onClose={() => {
            setAddNewAddressPressed(false);
          }}
        />
      )}
    </div>
  );
};

export default UserAddress;
