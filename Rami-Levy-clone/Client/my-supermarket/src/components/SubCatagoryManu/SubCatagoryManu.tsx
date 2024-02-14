import React, { useEffect } from "react";
import { subFoodCategoriesSelector } from "../../features/categories/categoriesSlice";
import { useAppDispatch, useAppSelector } from "../../app/hook";
import { get_SUB_FoodCategoriesApi } from "../../features/categories/categoriesAPI";
import SabCatagoryItem from "../SubCatagoryItem/SubCatagoryItem";
import "./subCatagoryManu.scss";

interface SubCatagoryManuProps {
  navbar_item_id: number; // Add a prop for navbar_item_id
}

const SubCatagoryManu: React.FC<SubCatagoryManuProps> = ({
  navbar_item_id,
}) => {
  const dispatch = useAppDispatch();
  const subFoodCategories = useAppSelector(subFoodCategoriesSelector);

  useEffect(() => {
    if (!subFoodCategories || subFoodCategories.length === 0) {
      dispatch(get_SUB_FoodCategoriesApi());
    }
  }, []);

  // Filter subFoodCategories based on navbar_item_id
  const filteredCategories =
    subFoodCategories?.filter(
      (item) => item.navbar_item_id === navbar_item_id
    ) || [];

  return (
    <div className="sub-category-menu">
      <ul className="sub-cat-items">
        {filteredCategories.map((item, index) => (
          <SabCatagoryItem key={index} item={item} />
        ))}
      </ul>
    </div>
  );
};

export default SubCatagoryManu;
