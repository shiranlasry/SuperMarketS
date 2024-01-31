export interface Product  {
    product_id: number;
    name: string;
    image: string;
    price: number;
    unit: string;
  };
  export interface Address {
    address_id: number;
    user_id: number;
    city_id: string;
    city_name: string;
    street_id: string;
    street_name: string;
    floor: number;
    apartment: number;
    zip_code: number;
  };

  export interface City {
    city_id: number;
    city_name: string;
  };
  export interface User {
    user_id: number|null ;
    email: string ='';
    id_number: string ='';
    password: string ='';
    confirm_password: string =''  
    first_name: string='';
    last_name: string='';
    phone_number: string='';
    role_id: number|null =0;
    addresses: Address[] =[];
  };
  