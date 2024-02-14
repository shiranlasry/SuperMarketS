import React from "react";
import "./subCatagoryItem.scss";
import { Link } from "react-router-dom";

type SubCategoryItemProps = {
  item: any;
};

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ item }) => {
  const { sub_food_category_name } = item;
  return (
    <div className="sub-category-item">
      <Link to={""}>
        <div className="sub-category-name">
          <p>{sub_food_category_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default SubCategoryItem;
