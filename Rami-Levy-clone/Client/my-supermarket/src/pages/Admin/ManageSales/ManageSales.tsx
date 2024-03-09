import { useAppDispatch, useAppSelector } from "../../../app/hook";
import { productsSelector } from "../../../features/products/productsSlice";
import { getSalesAPI, addSaleAPI } from "../../../features/sales/salesAPI";
import { selectSales } from "../../../features/sales/salesSlice";
import { Sales, Product } from "../../../rami-types";
import { useEffect, useState } from "react";
import { getAllProductsApi } from "../../../features/products/productsAPI";
import SalesList from "../../../components/SalesList/SalesList";
import "./manageSales.scss";
import SaleCard from "../../../components/SaleCard/SaleCard";
import UpdateSale from "../../../components/UpdateSale/UpdateSale";
import AddNewSale from "../../../components/AddNewSale/AddNewSale";

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
            <AddNewSale sales={allSales} products={allProducts ? allProducts : []} />
                <UpdateSale sales={allSales} products={allProducts ? allProducts : []} />
            <div className="sales-list">
                <h2>כל המבצעים</h2>
                {/* Render SaleCard components for each sale */}
                {allSales.map((sale) => (
                    <SaleCard
                        key={sale.sale_id}
                        sale={sale}
                        product={allProducts ? allProducts.find((p) => p.product_id === sale.product_id) : undefined}
                    />
                ))}
            </div>
        </div>
    );
};

export default ManageSales;
