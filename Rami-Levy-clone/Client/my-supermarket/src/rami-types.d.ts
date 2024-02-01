export interface Product  {
    product_id: number;
    name: string;
    image: string;
    price: number;
    unit: string;
  };
  export interface Address {
    address_id: number|null;
    user_id: number|null;
    city_id: number|null;
    city_name: string;
    street_id: number|null;
    street_name: string;
    floor: number|null;
    apartment: number |null;
    zip_code: string;
    phone_number:string;
    is_default:boolean;
  };

  export interface City {
    city_id: number;
    city_name: string;
  };
  export interface Street {
    street_id: number;
    street_name: string;
  };

  export interface User {
    user_id: number|null ;
    email: string ='';
    id_number: string ='';
    password: string ='';
    confirm_password: string =''  
    first_name: string='';
    last_name: string='';
   
    role_id: number|null =0;
    addresses: Address[] =[];
  };
  