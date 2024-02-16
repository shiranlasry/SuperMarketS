import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { loggedInUserSelector } from '../../features/logged_in_user/loggedInUserSlice';
import { citiesSelector } from '../../features/cities/citiesSlice';
import { streetsSelector } from '../../features/streets/streetsSlice';
import { getAllCitiesAPI } from '../../features/cities/citiesAPI';
import { getAllStreetsAPI } from '../../features/streets/streetsAPI';
import { addNewUserAddressApi } from '../../features/logged_in_user/loggedInUserAPI';
import { Address, City, Street } from '../../rami-types';
import { useNavigate } from 'react-router-dom';

const AddNewAddress = () => {
  const initialAddressState: Address = {
    address_id: null,
    user_id: null,
    city_id: null,
    city_name: '',
    street_id: null,
    street_name: '',
    floor: null,
    apartment: null,
    zip_code: '',
    phone_number:'',
    is_default: false,
  };

  const [newAddress, setNewAddress] = useState<Address>(initialAddressState);
  const loggedInUser = useAppSelector(loggedInUserSelector);
  const cities = useAppSelector(citiesSelector);
  const streets = useAppSelector(streetsSelector);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!loggedInUser) {
      navigate('/login');
    }

    if (!loggedInUser?.user_id) return;
    setNewAddress({ ...newAddress, user_id: loggedInUser.user_id });

    dispatch(getAllCitiesAPI());
    dispatch(getAllStreetsAPI());
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setNewAddress({ ...newAddress, [name]: value });
  };

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
    
     // NEED to add validation logic here before dispatching the action
    const response=await dispatch(addNewUserAddressApi(newAddress));
    if(response.payload){
      alert('Address added successfully');
      navigate('/');
    }
    
} catch (error) {
    console.error(error);
}
}

  return (
    <div>
      <h1>הוספת כתובת חדשה ליוזר מחובר</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">City:</label>
          <select
            id="city"
            name="city_id"
            value={newAddress.city_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select a city</option>
            {cities &&
              cities.map((city: City) => (
                <option key={city.city_id} value={city.city_id}>
                  {city.city_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="street">Street:</label>
          <select
            id="street"
            name="street_id"
            value={newAddress.street_id || ''}
            onChange={handleInputChange}
          >
            <option value="">Select a street</option>
            {streets &&
              streets.map((street: Street) => (
                <option key={street.street_id} value={street.street_id}>
                  {street.street_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label htmlFor="floor">Floor:</label>
          <input
            type="text"
            id="floor"
            name="floor"
            value={newAddress.floor || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="apartment">Apartment:</label>
          <input
            type="text"
            id="apartment"
            name="apartment"
            value={newAddress.apartment || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor="phone_number">Phone Number:</label>
          <input
            type="text"
            id="phone_number"
            name="phone_number"
            value={newAddress.phone_number || ''}
            onChange={handleInputChange}
          />    
        </div>
        <div>
          <label htmlFor="zipCode">ZIP Code:</label>
          <input
            type="text"
            id="zipCode"
            name="zip_code"
            value={newAddress.zip_code || ''}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit">Add Address</button>
      </form>
    </div>
  );
};

export default AddNewAddress;
