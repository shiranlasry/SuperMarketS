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
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        if (allSales.length === 0) {
            // Fetch all sales from the server
            dispatch(getSalesAPI());
        }
        if (!allProducts) {
            dispatch(getAllProductsApi());
        }
    }, []);

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
