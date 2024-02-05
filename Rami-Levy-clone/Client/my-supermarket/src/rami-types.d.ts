export interface FoodCategories {
  food_category_id: number;
  food_category_name: string;
}
export interface SubFoodCategories {
  sub_food_category_id: number;
  sub_food_category_name: string;
  food_category_id: number;
  food_category_name: string;
}
export interface ProductsImages{
  product_id:number;
  product_image_id:number;
  product_img_name:string;
  product_img_data:string;
}
export interface Product  {
  product_id: number | null;
  sub_food_category_id:number | null;
  sub_food_category_name: string;
  food_category_id: number | null;
  food_category_name: string;
  product_price: number | null;
  product_name: string;
  product_description: string;
  export_country: string;
  brand: string;
  content: string;
  allergy_info: string;
  type: string;
  israel_milk: string;
  cosher: string;

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
  