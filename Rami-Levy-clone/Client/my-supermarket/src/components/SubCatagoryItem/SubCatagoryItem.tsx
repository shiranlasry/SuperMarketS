import React, { useState } from 'react'
import { Link } from 'react-router-dom';



type SubCatagoryItemProps = {
    // Adjust the type according to your item structure
    item: any;
};

    
const SubCatagoryItem: React.FC<SubCatagoryItemProps> = ({ item }) => { 
    // const [isActive, setIsActive] = useState(false);

    const { sub_food_category_name } = item;
    return (
        <li>
        <Link
          to={''}
        //   className={`nav-link${isActive ? " active" : ""}`}
        //   onMouseEnter={() => setIsActive(true)}
        //   onMouseLeave={() => setIsActive(false)}
        //   onClick={() => setIsActive(!isActive)}
        >
          <div className="sub-catagory-name">
                <p>{sub_food_category_name}</p>
          </div>
        </Link>
      </li>
    );
};


export default SubCatagoryItem