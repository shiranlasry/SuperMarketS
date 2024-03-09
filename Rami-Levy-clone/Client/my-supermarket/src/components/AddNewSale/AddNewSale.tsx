import React, { useState } from "react";
import "./addNewSale.scss";
import { Product, Sales } from "../../rami-types";
import { useAppDispatch } from "../../app/hook";
import { addSaleAPI } from "../../features/sales/salesAPI";


interface AddNewSalePrps {
    sales: Sales[];
    products: Product[];
  }
  
const AddNewSale:React.FC<AddNewSalePrps> = ({ sales, products }) => {
    const [newSale, setNewSale] = useState({
        sale_description: "",
        sale_discount: undefined,
        sale_expiration_date: "",
        product_id: undefined,
    });
    const dispatch = useAppDispatch();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewSale((prevSale) => ({
            ...prevSale,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const newSaleItem = sales.findIndex(sale => sale.product_id === newSale.product_id)
        console.log("newwwwwwwwwwww",newSale.product_id);
        if (newSaleItem) {
            console.log(newSaleItem);
            return alert("מוצר זה כבר במבצע");
        }
        else {
            dispatch(addSaleAPI(newSale));
            // window.location.reload();
        }
        setNewSale({
            sale_description: "",
            sale_discount: undefined,
            sale_expiration_date: "",
            product_id: undefined,
        });
    };

    return (
        <div className="add-sale-form">
            <h2>הוספת מצבע חדש</h2>
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
                >
                    {/* Render options for product selection */}
                    {products &&
                        products.map((product) => (
                            <option key={product.product_id} value={product.product_id}>
                                {product.product_name}
                            </option>
                        ))}
                </select>
                <button type="submit">הוסף מבצע</button>
            </form>
        </div>
    );
};

export default AddNewSale;


