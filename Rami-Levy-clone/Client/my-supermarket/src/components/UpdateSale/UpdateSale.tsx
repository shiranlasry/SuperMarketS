import React, { useState } from "react";
import { useAppDispatch } from "../../app/hook";
import { updateSaleAPI, deleteSaleAPI } from "../../features/sales/salesAPI";
import { Sales, Product } from "../../rami-types";
import "./updateSale.scss";

interface UpdateSaleProps {
    sale: Sales[];
    products: Product[];
    onDelete: (saleId: number) => void;
}

const UpdateSale: React.FC<UpdateSaleProps> = ({ sale, products, onDelete }) => {
    console.log(sale,products,)
    const dispatch = useAppDispatch();

    return (
        <div>
            <div/>

    );
};

export default UpdateSale;
