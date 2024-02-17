import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./subCatagoryItem.scss";

type SubCategoryItemProps = {
  item: any;
};

const SubCategoryItem: React.FC<SubCategoryItemProps> = ({ item }) => {
  const { sub_food_category_name, sub_food_category_id } = item;
  const navigate=useNavigate();
  return (
    <div className="sub-category-item">
        <Link to={`/category-visual/${sub_food_category_id}`}>
        <div className="sub-category-name">
          <p className="sub-cat-title">{sub_food_category_name}</p>
        </div>
      </Link>
    </div>
  );
};

export default SubCategoryItem;
