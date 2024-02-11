import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { NavBarItem } from "../../rami-types";

export const getAllNavBarItemsApi = createAsyncThunk<NavBarItem[] | null, void>('get-all-nav_bar_items', async () => {
    try {
        axios.get('/api/navbar-items')
        .then(response => {
            const data = response.data;
            // Check if the response is successful
            
            if (data.ok) {
                // Save the data into session storage
                sessionStorage.setItem('navbarItems', JSON.stringify(data.results));
                
                return data.results;
            } else {
                // Handle error if needed
                console.error(data.error);
            }
        })
        .catch(error => {
            // Handle fetch error if needed
            console.error(error);
        });
      

    } catch (error) {
        console.error(error);
        return null;
    }
})



