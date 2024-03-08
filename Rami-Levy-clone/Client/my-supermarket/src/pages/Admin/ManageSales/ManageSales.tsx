import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { productsSelector } from "../../../features/products/productsSlice";
import { getSalesAPI, addSaleAPI } from "../../../features/sales/salesAPI";
import { selectSales } from "../../../features/sales/salesSlice";
import { Sales } from "../../../rami-types";
import { useEffect, useState } from "react";
import { getAllProductsApi } from "../../../features/products/productsAPI";
import SalesList from "../../../components/SalesList/SalesList";
import "./manageSales.scss";
import SaleCard from "../../../components/SaleCard/SaleCard";
import UpdateSale from "../../../components/UpdateSale/UpdateSale";

const ManageSales = () => {
    const allProducts = useAppSelector(productsSelector);
    const allSales = useAppSelector<Sales[]>(selectSales);
    const [newSale, setNewSale] = useState({
        sale_description: "",
        sale_discount: "",
        sale_expiration_date: "",
        product_id: "",
    });
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (allSales.length === 0) {
            // Fetch all sales from the server
            dispatch(getSalesAPI());
        }
        if (!allProducts) {
            dispatch(getAllProductsApi());
        }
    }, [newSale]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setNewSale((prevSale) => ({
            ...prevSale,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(addSaleAPI(newSale)); // Pass newSale as an argument
        // Reset the form fields after submission
        setNewSale({
            sale_description: "",
            sale_discount: "",
            sale_expiration_date: "",
            product_id: "",
        });
    };

    return (
        <div className="manage-sales">
            <div className="add-sale-form">
                <h2>Add New Sale</h2>
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="sale_description"
                        value={newSale.sale_description}
                        placeholder="Sale Description"
                        onChange={handleInputChange}
                    />
                    <input
                        type="number"
                        name="sale_discount"
                        value={newSale.sale_discount}
                        placeholder="Sale Discount"
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
                        {allProducts &&
                            allProducts.map((product) => (
                                <option key={product.product_id} value={product.product_id}>
                                    {product.product_name}
                                </option>
                            ))}
                    </select>
                    <button type="submit">Add Sale</button>
                </form>
            </div>
            <div className="sales-list">
    <h2>All Sales</h2>
    {/* Render UpdateSale components for each sale */}
    {/* <UpdateSale/> */}
    {allSales &&
        allSales.map((sale) => {
            const product = allProducts?.find(
                (p) => p.product_id === sale.product_id
            );
            return product ? (
                <SaleCard key={sale.sale_id} sale={sale} product={product} />
            ) : (
                null // No need for placeholder here since we're rendering UpdateSale
            );
        })
    }
</div>

        </div>
    );
};

export default ManageSales;
