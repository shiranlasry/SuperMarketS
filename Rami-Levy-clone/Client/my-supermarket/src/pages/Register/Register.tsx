//register tsx file

import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hook';
import { citiesSelector } from '../../features/cities/citiesSlice';
import { useNavigate } from 'react-router-dom';
import { getAllCitiesAPI } from '../../features/cities/citiesAPI';

const Register = () => {
    const cities = useAppSelector(citiesSelector);
    const dispatch = useAppDispatch();
     const navigate = useNavigate();

    useEffect(() => {
        
        dispatch(getAllCitiesAPI())
        
    }  , [])

   const handelRegister = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("register")
   } 
  return (
    <div>
      <h1>Register</h1>
      <form onSubmit={handelRegister}>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" id="email" />
        <label htmlFor="password">Password</label>
        <input type="password" name="password" id="password" />
        <label htmlFor="password">Confirm Password</label>
        <input type="password" name="Cpassword" id="Cpassword" />
        <label htmlFor="first_name">First Name</label>
        <input type="text" name="first_name" id="first_name" />
        <label htmlFor="last_name">Last Name</label>
        <input type="text" name="last_name" id="last_name" />
        <label htmlFor="phone_number">Phone</label>
        <input type="text" name="phone_number" id="phone_number" />
        <label htmlFor="id_number">ID Number</label>
        <input type="text" name="id_number" id="id_number" />
        <label htmlFor="city">City</label>
        <input type="text" name="city" id="city" />
        <label htmlFor="street">Street</label>
        <input type="text" name="street" id="street" />
        <label htmlFor="house_number">House Number</label>
        <input type="text" name="house_number" id="house_number" />

        <button type="submit">Register</button>

      </form>
      <button onClick={() => navigate("/")}>Back</button>
    </div>
  )
}

export default Register
