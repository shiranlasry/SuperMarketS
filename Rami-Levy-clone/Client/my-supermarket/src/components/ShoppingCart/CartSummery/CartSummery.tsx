import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { loggedInUserSelector } from "../../../features/logged_in_user/loggedInUserSlice";
import { Address } from "../../../rami-types";
import {
  getUserAddressesApi,
  getUserFromTokenApi,
} from "../../../features/logged_in_user/loggedInUserAPI";
import { Modal } from "react-bootstrap";
import ChengeContactModal from "./Modals/ChengeContactModal";
import ChengeAddressModal from "./Modals/ChengeAddressModal";

const CartSummery = () => {
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const [showModal, setShowModal] = useState({
    changeContact: false,
    changeAddress: false,
    changeDelivery: false,
    showProducts: false,
  });
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser) {
      getUserToken();
    } else {
      // Select the default address if available
      if (loggedInUser.addresses) {
        const defaultAddress = loggedInUser.addresses.find(
          (address) => address.is_default
        );
        setSelectedAddress(defaultAddress || null);
      }
    }
  }, [loggedInUser]);

  const getUserToken = async () => {
    const response = await dispatch(getUserFromTokenApi());
    if (response.payload) {
      dispatch(getUserAddressesApi(response.payload.user_id));
    }
  };

  const toggleModal = (modalType) => {
    setShowModal({ ...showModal, [modalType]: !showModal[modalType] });
  };

  return (
    <div className="cart-summery-content">
      {loggedInUser && (
        <>
          <div className="row align-items-center">
            <div className="col">
              <p>
                {loggedInUser.first_name} {loggedInUser.last_name}
              </p>
            </div>
            <div className="col">
              <button
                className="btn btn-primary"
                onClick={() => toggleModal("changeContact")}
              >
                שינוי
              </button>
            </div>
          </div>
          {/* Display selected address */}
          {selectedAddress && (
            <div className="row align-items-center">
              <div className="col">
                <p>{selectedAddress.address_name}</p>
              </div>
              <div className="col">
                <button
                  className="btn btn-primary"
                  onClick={() => toggleModal("changeAddress")}
                >
                  שינוי
                </button>
              </div>
            </div>
          )}
          <div className="row align-items-center">
            <div className="col">
              <p>פרטי משלוח</p>
            </div>
            <div className="col">
              <button className="btn btn-primary">שינוי</button>
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col">
              <p>מודאל להצגת המוצרים של העגלה </p>
            </div>
            <div className="col">
              <button className="btn btn-primary">שינוי</button>
            </div>
          </div>
        </>
      )}

      <Modal
        show={showModal.changeContact}
        onHide={() => toggleModal("changeContact")}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <ChengeContactModal onClose={() => toggleModal("changeContact")} />
        </Modal.Body>
      </Modal>
      <Modal
        show={showModal.changeAddress}
        onHide={() => toggleModal("changeAddress")}
        dialogClassName="custom-modal"
      >
        <Modal.Body>
          <ChengeAddressModal onClose={() => toggleModal("changeAddress")} />
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default CartSummery;
