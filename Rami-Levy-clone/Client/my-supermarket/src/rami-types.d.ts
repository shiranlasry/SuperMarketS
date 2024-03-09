export interface FoodCategories 
{
  food_category_id: number;
  food_category_name: string;
}

export interface Order {
  order_id: number;
  cart_id: number;
  user_id: number;
  delivery_id: number;
  order_creation_date: Date;
  status_id: number;
}
export interface CartItem{
  cart_id: number;
  user_id: number;
  status_id: number;
  cartList:ProductsList[] = []; 
}
export interface ProductsList {
  product_list_id: number;
  cart_id: number;
  product_id: number;
  product_amount: number=0;
  product_name: string;
  product_description: string;
  product_price: number=0;
  product_img_name_a: string='';
  product_img_name_b: string= '';
  product_img_data_a: string= '';
  product_img_data_b: string= '';
}
export interface SubFoodCategories {
  navbar_item_id: number;
  sub_food_category_id: number;
  sub_food_category_name: string;
  food_category_id: number;
  food_category_name: string;
}
export interface ProductsImages{
  product_id:number;
  product_image_id:number;
  product_img_name_a:string;
  product_img_name_b:string;
  product_img_data_a:string;
  product_img_data_b:string;
}
export interface Product  {
  product_id: number | null;
  sub_food_category_id:number | null;
  sub_food_category_name: string;
  product_image_id:number | null;
  product_img_name_a:string;
  product_img_name_b:string;
  product_img_data_a:string;
  product_img_data_b:string;
  product_inventory: Inventories | null;
  food_category_id: number | null;
  food_category_name: string;
  navbar_item_id: number | null;
  navbar_item_name: string;
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
  product_components: string;
  serving_suggestion: string;

  };
  export interface Inventories {
    inventory_id: number;
    product_id: number;
    last_update_date : string;
    add?: number;
    remove?: number;
    units_stock: number;
  }
  export interface Address {
    address_id: number|null;
    user_id: number|null;
    city_id: number|null;
    city_name: string;
    street_id: number|null;
    street_name: string;
    floor: number|null;
    apartment: number |null;
    house_number: number|null;
    zip_code: string;
    phone_number:string;
    is_default:boolean;
    address_name: string;
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
    role_name: string='';
    addresses: Address[] =[];
    phone_number: string='';
    gender: string='';
    birth_date: string='';
  };
  export interface Role {
    role_id: number;
    role_name: string;
  };

  export interface NavBarItem{
    navbar_item_id : number;
    label: string;
    icon_src : string;
    active_icon_src : string;
    to : string;
  }
  
export interface updateProductFields {
  product_id: number | undefined;
  sub_food_category_id: number | undefined;
  food_category_id: number | undefined;
  product_name: string;
  product_description: string;
  product_price: number | undefined;
  export_country: string;
  brand: string;
  content: string;
  allergy_info: string;
  type: string;
  cosher: string;
  israel_milk: string;
  product_components: string;
  serving_suggestion: string;
}

export interface BucketList {
  list_id: number;
  cart_id: number;
  product_id: number;
  product_amount: number;
}



export interface OrderForList{
  order_creation_date: string;
  cart_id: number | null;
  product_amount: number | null;
  product_id: number | null;
}

export interface Delivery {
  delivery_id: number;
  order_id: number;
  status_id: number;
  delivery_finish_date: Date;
}

export interface Status {
  status_id: number;
  department_status_id: number;
  department_status_name: string;
}

export interface DepartmentsStatus {
  department_status_id: number;
  status_name: string;
}

export interface Sales {
  sale_id: number;
  sale_description: number;
  sale_discount: number;
  sale_expiration_date: string;
  product_id: number;
  sale_price: number;
}

