import React, { useState } from "react";
import { Product, updateProductFields } from "../../../rami-types";
import { useAppDispatch } from "../../../app/hook";
import { updateProductDetailes } from "../../../features/api/productsAPI";

interface UpdateProductProps {
    product: Product;
}

const UpdateProduct: React.FC<UpdateProductProps> = ({ product }) => {
    const dispatch = useAppDispatch();

    // State to manage input values
    const [updatedProduct, setUpdatedProduct] = useState<updateProductFields>({
        product_id: product.product_id? product.product_id : undefined,
        product_name: product.product_name,
        product_price: product.product_price ? product.product_price : undefined,
        product_description: product.product_description,
        export_country: product.export_country,
        brand: product.brand,
        content: product.content,
        allergy_info: product.allergy_info,
        type: product.type,
        sub_food_category_id: product.sub_food_category_id ? product.sub_food_category_id : undefined,
        cosher: product.cosher,
        israel_milk: product.israel_milk
    });

    // Function to handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedProduct(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Function to handle updating the product
    const handleUpdateProduct = async () => {
        await dispatch(updateProductDetailes(updatedProduct));
    };

    return (
        <div>
            <h1>Update Product</h1>
            <label>Product Name:</label>
            <input type="text" name="product_name" value={updatedProduct.product_name} onChange={handleInputChange} />
            <label>Product Price:</label>
            <input type="number" name="product_price" value={updatedProduct.product_price || ''} onChange={handleInputChange} />
            <label>Product Description:</label>
            <textarea name="product_description" value={updatedProduct.product_description} onChange={handleInputChange} />
            <label>Export Country:</label>
            <input type="text" name="export_country" value={updatedProduct.export_country} onChange={handleInputChange} />
            <label>Brand:</label>
            <input type="text" name="brand" value={updatedProduct.brand} onChange={handleInputChange} />
            <label>Content:</label>
            <input type="text" name="content" value={updatedProduct.content} onChange={handleInputChange} />
            <label>Allergy Info:</label>
            <input type="text" name="allergy_info" value={updatedProduct.allergy_info} onChange={handleInputChange} />
            <label>Type:</label>
            <input type="text" name="type" value={updatedProduct.type} onChange={handleInputChange} />
            <label>Sub Food Category ID:</label>
            <input type="number" name="sub_food_category_id" value={updatedProduct.sub_food_category_id || ''} onChange={handleInputChange} />
            <label>Cosher:</label>
            <input type="text" name="cosher" value={updatedProduct.cosher} onChange={handleInputChange} />
            <label>Israel Milk:</label>
            <input type="text" name="israel_milk" value={updatedProduct.israel_milk} onChange={handleInputChange} />
            <button onClick={handleUpdateProduct}>Update</button>
            <button onClick={() => { }}>Cancel</button>
        </div>
    );
};

export default UpdateProduct;
