import React, { useEffect, useState } from "react";
import { OrderForList, Product } from "./../../rami-types.d";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { ordersListSelector } from "../../features/orders/ordersSlice";
import { productsSelector } from "../../features/products/productsSlice";
import { getAllProductsApi } from "../../features/products/productsAPI";

interface OrderProps { 
  orders: OrderForList[];
 
}

const Order: React.FC<OrderProps> = ({ orders }) => { 
  
  const allProducts = useAppSelector(productsSelector);
  const dispatch = useAppDispatch();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  useEffect(()=>{
    if(!allProducts){
      dispatch(getAllProductsApi())
    }
  },[])

  const filterProducts = (products: Product[], order: OrderForList[]) => {
    const orderedProductIds = order.map(order => order.product_id); // Get all product IDs from orders
    const filteredProducts = products.filter(product => orderedProductIds.includes(product.product_id)); // Filter products based on ordered product IDs
    setFilteredProducts(filteredProducts);
  };
  //present list of products that the user ordered
  // use filteredProducts to display the products svg image, product name, and product price and amount
  return (
    <div>
      <h1>Order</h1>
      <div>
        {orders?.map((order, index) => {
          return (
            <div key={index}>
              <img src={filteredProducts[index].product_img_data_a} alt={filteredProducts[index].product_img_name_a} />
              <h3>{filteredProducts[index].product_name}</h3>
              <h3>{filteredProducts[index].product_price}</h3>
              <h3>{order.product_amount}</h3>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Order;
