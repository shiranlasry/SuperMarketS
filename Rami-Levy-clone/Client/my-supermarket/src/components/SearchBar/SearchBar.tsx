import React from "react";
import "./search-bar.scss";

const SearchBar = () => {
  return (
    <div className="search-bar">
      <div className="search-input-container">
         
        
        
        <svg data-v-4582c4f4="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="12.83" height="23.96" viewBox="0 0 12.83 23.96" className="mic-svg"><defs data-v-4582c4f4=""><clipPath data-v-4582c4f4="" id="a" transform="translate(-7.48 -1.92)"><rect data-v-4582c4f4="" width="27.8" height="27.8" fill="none"></rect></clipPath></defs><path data-v-4582c4f4="" d="M19.81,10.87a.51.51,0,0,0-.5.5v4.32A5.48,5.48,0,0,1,17.39,20a5.65,5.65,0,0,1-7,0,5.55,5.55,0,0,1-1.93-4.34V11.37a.5.5,0,0,0-1,0v4.32a6.47,6.47,0,0,0,2.3,5.12,6.63,6.63,0,0,0,3.61,1.41v2.64H11.86a.5.5,0,0,0,0,1h2l.07,0h2a.5.5,0,0,0,0-1H14.4V22.22A6.55,6.55,0,0,0,18,20.81a6.44,6.44,0,0,0,2.3-5.12V11.37A.5.5,0,0,0,19.81,10.87Z" transform="translate(-7.48 -1.92)" fill="#0079f2"></path><path data-v-4582c4f4="" d="M13.9,19.94A4.13,4.13,0,0,0,18,15.81V6.05a4.14,4.14,0,0,0-8.27,0v9.76A4.13,4.13,0,0,0,13.9,19.94ZM10.76,6.05a3.14,3.14,0,0,1,6.27,0v9.76a3.14,3.14,0,0,1-6.27,0Z" transform="translate(-7.48 -1.92)" fill="#0079f2"></path></svg>
        <input type="search" className="search-input" placeholder="חיפוש מוצר או מותג" />
        <div className="filter-text">סינון</div>
        <svg data-v-dce8ddf8="" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="21.1" height="17" viewBox="0 0 22.58 18.33" className="filter-svg"><defs data-v-dce8ddf8=""><clipPath data-v-dce8ddf8="" id="a" transform="translate(-5.71 -7.83)"><rect data-v-dce8ddf8="" width="34" height="34" fill="none"></rect></clipPath></defs><line data-v-dce8ddf8="" x1="3.5" y1="2" x2="21.65" y2="2" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></line><line data-v-dce8ddf8="" x1="0.84" y1="9.17" x2="9.75" y2="9.17" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></line><line data-v-dce8ddf8="" x1="0.84" y1="16.33" x2="19.08" y2="16.33" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></line><circle data-v-dce8ddf8="" cx="2" cy="2" r="1.5" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></circle><circle data-v-dce8ddf8="" cx="20.58" cy="16.33" r="1.5" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></circle><circle data-v-dce8ddf8="" cx="11.25" cy="9.17" r="1.5" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></circle><line data-v-dce8ddf8="" x1="12.74" y1="9.17" x2="21.65" y2="9.17" fill="none" stroke="#0079f24f" stroke-linecap="round" stroke-linejoin="round"></line></svg>

      </div>
    </div>
  );
};

export default SearchBar;
