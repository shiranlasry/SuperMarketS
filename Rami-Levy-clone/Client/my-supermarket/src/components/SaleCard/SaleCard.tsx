import React from "react";
import { Product, Sales } from "../../rami-types";
import "./saleCard.scss";

const SaleCard: React.FC<{ sale: Sales; product: Product | undefined }> = ({
  sale,
  product,
}) => {
  const setImg = (data: ArrayBufferLike) => {
    return btoa(String.fromCharCode(...new Uint8Array(data)));
  };

  return (
    <div className="sale-card">
      <h3 className="description">{sale.sale_description}</h3>
      <img
        src={`data:image/jpeg;base64,${setImg(
          product?.product_img_data_a.data
        )}`}
        alt={product?.product_img_name_a}
      />
      <h3 className="discount">{`${sale.sale_discount}%`}</h3>
    </div>
  );
};

export default SaleCard;
