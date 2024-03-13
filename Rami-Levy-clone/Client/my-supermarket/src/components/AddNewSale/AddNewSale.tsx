import React, { useState } from "react";
import "./addNewSale.scss";
import { Product, Sales } from "../../rami-types";
import { useAppDispatch } from "../../app/hook";
import { addSaleAPI } from "../../features/sales/salesAPI";
import RamiBtn from "../RamiBtn/RamiBtn";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

interface AddNewSalePrps {
  sales: Sales[];
  products: Product[];
}

const AddNewSale: React.FC<AddNewSalePrps> = ({ sales, products }) => {
  const [newSale, setNewSale] = useState({
    sale_description: "",
    sale_discount: undefined,
    sale_expiration_date: "",
    product_id: undefined,
    sale_price: 0,
  });
  const dispatch = useAppDispatch();

  const handleInputChange = (e) => {
    const { name, value, valueAsNumber } = e.target;
    switch (name) {
      case "sale_discount":
        if (valueAsNumber < 0 || valueAsNumber > 100) {
          return toast.info("הנחה חייבת להיות בין 0 ל-100");
        }
        setNewSale((prevSale) => ({
          ...prevSale,
          [name]: valueAsNumber,
        }));
        return;
      case "sale_expiration_date":
        if (new Date(value) < new Date()) {
          return toast.info("תאריך תפוגה חייב להיות גדול מהיום");
        }
        break;
      case "product_id":
        const strToInt = parseInt(value);
        if (isNaN(strToInt)) {
          return toast.warning("נא לבחור מוצר");
        }
        setNewSale((prevSale) => ({
          ...prevSale,
          [name]: strToInt,
        }));
        return; // Add break statement here
      default:
        break;
    }
    setNewSale((prevSale) => ({
      ...prevSale,
      [name]: value,
    }));
  };

  const checkNewSale = () => {
    if (
      newSale.sale_description === "" ||
      newSale.sale_discount === undefined ||
      newSale.sale_expiration_date === "" ||
      newSale.product_id === undefined
    ) {
      console.log(newSale);
      return toast.warning("נא למלא את כל השדות");
    }
    return true;
  };

  const isExist = () => {
    const newSaleItem = sales.findIndex(
      (sale) => sale.product_id === newSale.product_id
    );
    if (newSaleItem === -1) {
      return true;
    } else {
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!checkNewSale()) return console.error("שדות חסרים");
    if (!isExist()) return toast.error("מוצר זה כבר במבצע");
    const productInSale = products.findIndex(
      (product) => product.product_id === newSale.product_id
    );
    if (productInSale && products && newSale.sale_discount !== undefined) {
      const price = products[productInSale].product_price;
      newSale.sale_price = price
        ? price * (1 - newSale.sale_discount / 100)
        : 0;
    }
    dispatch(addSaleAPI(newSale));
    setNewSale({
      sale_description: "",
      sale_discount: undefined,
      sale_expiration_date: "",
      product_id: undefined,
      sale_price: 0,
    });
    window.location.reload();
  };

  return (
    <div className="add-sale-form">
      <h2 className="add-sale-title">הוספת מצבע חדש</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="sale_description"
          value={newSale.sale_description}
          placeholder="סוג הנחה"
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="sale_discount"
          value={newSale.sale_discount}
          placeholder=" %הנחה"
          onChange={handleInputChange}
        />
        <input
          type="date"
          name="sale_expiration_date"
          value={newSale.sale_expiration_date}
          onChange={handleInputChange}
        />
        <select
          name="product_id"
          value={newSale.product_id}
          onChange={handleInputChange}
          className="select-sale"
        >
          {/* Render options for product selection */}
          {products &&
            products.map((product) => (
              <option
                key={product.product_id}
                value={product.product_id?.toString()}
              >
                {product.product_name}
              </option>
            ))}
        </select>
        <RamiBtn type="submit" className="add-sale-btn">
          הוסף מבצע
        </RamiBtn>
      </form>
    </div>
  );
};

export default AddNewSale;
