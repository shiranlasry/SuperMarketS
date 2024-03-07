import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { loggedInUserSelector } from "../../../../features/logged_in_user/loggedInUserSlice";
import { citiesSelector } from "../../../../features/cities/citiesSlice";
import { streetsSelector } from "../../../../features/streets/streetsSlice";
import { getAllCitiesAPI } from "../../../../features/cities/citiesAPI";
import { getAllStreetsAPI } from "../../../../features/streets/streetsAPI";
import { addNewUserAddressApi } from "../../../../features/logged_in_user/loggedInUserAPI";
import { Address, City, Street } from "../../../../rami-types";
import { useNavigate } from "react-router-dom";
import "./AddNewAddress.scss";

type AddressProps = {
  onClose: () => void;
};

const AddNewAddress: React.FC<AddressProps> = ({ onClose }) => {
  const initialAddressState: Address = {
    address_id: null,
    user_id: null,
    city_id: null,
    city_name: "",
    street_id: null,
    street_name: "",
    floor: null,
    apartment: null,
    zip_code: "",
    phone_number: "",
    is_default: true,
    address_name: "",
  };

  const [newAddress, setNewAddress] = useState<Address>(initialAddressState);
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const cities = useAppSelector(citiesSelector);
  const streets = useAppSelector(streetsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser) {
      navigate("/login");
      return;
    }
    setNewAddress({ ...newAddress, user_id: loggedInUser.user_id });
    //get all cities and streets for select options
    dispatch(getAllCitiesAPI());
    dispatch(getAllStreetsAPI());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // NEED to add validation logic here before dispatching the action
      const response = await dispatch(addNewUserAddressApi(newAddress));
      if (response.payload) {
        alert("Address added successfully");
        onClose();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="new-address-main">
      {/* <img className="new-map-img" src="/src/assets/img/map.png" /> */}
      <div className="addNew-content">
        <Modal
          show={true}
          onHide={onClose}
          dialogClassName="custom-modal-dialog"
          contentClassName="custom-modal-content custom-modal-rounded"
        >
          <div className="modal-header">
            <h4 className="modal-title">כתובת חדשה</h4>
          </div>
          <Modal.Body>
            <form onSubmit={handleSubmit}>
              <div className="address-info">
                <div>
                  {/* <label htmlFor="city"></label> */}
                  <select
                    id="city"
                    name="city_id"
                    className="addNew-add"
                    value={newAddress.city_id || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">עיר *</option>
                    {cities &&
                      cities.map((city: City) => (
                        <option key={city.city_id} value={city.city_id}>
                          {city.city_name}
                        </option>
                      ))}
                  </select>
                </div>
                <div>
                  {/* <label htmlFor="street">Street:</label> */}
                  <select
                    id="street"
                    name="street_id"
                    className="addNew-add"
                    value={newAddress.street_id || ""}
                    onChange={handleInputChange}
                  >
                    <option value="">רחוב *</option>
                    {streets &&
                      streets.map((street: Street) => (
                        <option key={street.street_id} value={street.street_id}>
                          {street.street_name}
                        </option>
                      ))}
                  </select>
                </div>

                <div>
                  {/* <label htmlFor="apartment">Apartment:</label> */}
                  <input
                    type="text"
                    id="apartment"
                    name="apartment"
                    placeholder="מספר בית*"
                    className="addNew-add"
                    value={newAddress.apartment || ""}
                    onChange={handleInputChange}
                  />
                  <div>
                    {/* <label htmlFor="zipCode">ZIP Code:</label> */}
                    <input
                      type="text"
                      id="zipCode"
                      name="zip_code"
                      placeholder="מיקוד"
                      className="addNew-add"
                      value={newAddress.zip_code || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div>
                    {/* <label htmlFor="floor">Floor:</label> */}
                    <input
                      type="text"
                      id="floor"
                      name="floor"
                      placeholder="קומה *"
                      className="addNew-add"
                      value={newAddress.floor || ""}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div>
                  {/* <label htmlFor="phone_number">Phone Number:</label> */}
                  <input
                    type="text"
                    id="phone_number"
                    name="phone_number"
                    placeholder="טלפון"
                    className="addNew-add "
                    value={newAddress.phone_number || ""}
                    onChange={handleInputChange}
                  />
                </div>
                <div>
                  {/* <label htmlFor="phone_number">Phone Number:</label> */}
                  <input
                    type="text"
                    id="address_name"
                    name="address_name"
                    placeholder="שם הכתובת"
                    className="addNew-add add-name"
                    value={newAddress.address_name || ""}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              <div className="add-new-buttons d-flex justify-content-end">
                <Button
                  variant="primary"
                  style={{ width: "130px", height: "40px" }}
                  type="submit"
                  className="mx-3 rounded-3"
                >
                  שמור
                </Button>
                <Button
                  variant="secondary"
                  style={{ width: "130px", height: "40px" }}
                  onClick={onClose}
                  className="rounded-3"
                >
                  בטל
                </Button>
              </div>
            </form>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default AddNewAddress;
