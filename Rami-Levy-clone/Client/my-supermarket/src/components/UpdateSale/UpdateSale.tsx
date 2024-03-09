import React, { useState } from "react";
import { Sales, Product } from "../../rami-types";
import { deleteSaleAPI, updateSaleAPI } from "../../features/sales/salesAPI";
import { useAppDispatch } from "../../app/hook";
import "./updateSale.scss";

interface UpdateSaleProps {
  sales: Sales[];
  products: Product[];
}

const UpdateSale: React.FC<UpdateSaleProps> = ({ sales, products }) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [updatedSale, setUpdatedSale] = useState<Sales>({
    sale_id: 0, // Initialize with default values
    sale_description: 0,
    sale_discount: 0,
    sale_expiration_date: "",
    product_id: 0,
  });
  const dispatch = useAppDispatch();

  const handleProductChange = (productId: number) => {
    const selected = sales.find((sale) => sale.product_id === productId);
    if (selected) {
      setSelectedProduct(selected);
      setUpdatedSale(selected);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedSale((prevSale) => ({
      ...prevSale,
      [name]: name === "sale_expiration_date" ? formatDateString(value) : value,
    }));
  };

  const formatDateString = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return `${year}-${month}-${day}`;
  };

  const handleUpdateSale = () => {
    dispatch(updateSaleAPI(updatedSale));
    window.location.reload();
  };

  const handleDeleteSale = async () => {
    dispatch(deleteSaleAPI(updatedSale.sale_id));
    window.location.reload();
  };

  return (
    <div className="update-sale">
      <h2>עדכון מבצע קיים</h2>
      <select className="product-select"
        value={selectedProduct?.product_id || ""}
        onChange={(e) => handleProductChange(Number(e.target.value))}
      >
        <option value="">בחר מוצר</option>
        {sales.map((sale) => (
          <option key={sale.sale_id} value={sale.product_id}>
            {
              products.find((product) => product.product_id === sale.product_id)
                ?.product_name
            }
          </option>
        ))}
      </select>
      {selectedProduct && (
        <form className="update-sale-form">
          <label className="form-label">תיאור ההנחה:</label>
          <input
            className="form-input"
            type="text"
            name="sale_description"
            value={updatedSale.sale_description}
            onChange={handleInputChange}
          />
          <label className="form-label">הנחה:</label>
          <input
            className="form-input"
            type="number"
            name="sale_discount"
            value={updatedSale.sale_discount}
            onChange={handleInputChange}
          />
          <label className="form-label">תוקף מצבע:</label>
          <input
            className="form-input"
            type="date"
            name="sale_expiration_date"
            value={updatedSale.sale_expiration_date}
            onChange={handleInputChange}
          />
          <button className="update-button" type="button" onClick={handleUpdateSale}>
            עדכן מבצע
          </button>
          <button className="delete-button" type="button" onClick={handleDeleteSale}>
            מחק מבצע
          </button>
        </form>
      )}
    </div>
  );
};

export default UpdateSale;
