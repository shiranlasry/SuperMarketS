// ShoppingBasket.tsx
import React from "react";
import "./shopping-basket.scss";

const ShoppingBasket = () => {
  // Assume your basket price is 20.00, you can replace it with your actual logic
  const basketPrice = 0.0;
  const formatPrice = (price: number) => {
    const [main, decimal] = price.toFixed(2).split(".");
    return (
      <span>
        <span className="main-price">{main}.</span>
        <sup className="decimal-price">{decimal}</sup>
      </span>
    );
  };
  return (
    <div className="basket-main">
      <div className="shopping-basket">
        <div className="basket-icon">
          <svg
            data-v-1196b37a=""
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25"
            height="35"
            viewBox="0 0 30.29 42.96"
            className="basket-svg"
          >
            <defs data-v-1196b37a="">
              <clipPath
                data-v-1196b37a=""
                id="a"
                transform="translate(-9.94 -3.6)"
              >
                <rect
                  data-v-1196b37a=""
                  width="50.16"
                  height="50.16"
                  fill="none"
                ></rect>
              </clipPath>
            </defs>
            <path
              data-v-1196b37a=""
              d="M40.22,16.33a.43.43,0,0,0,0-.11s0,0,0-.08a.18.18,0,0,0,0-.07L40.06,16h0l-1.36-1.2-.13-.68a.51.51,0,0,0-.07-.17l.76-6.14a.52.52,0,0,0-.1-.37.53.53,0,0,0-.34-.19L31.4,6.31a.5.5,0,0,0-.37.1.48.48,0,0,0-.18.33l-.45,3.67-.22-.23-1-5.48h0c-.07-.38-.41-.87-1.63-1a9,9,0,0,0-2.74.12c-1.9.35-3.71,1.15-3.76,2.2a.5.5,0,0,0,0,.21h0L21.56,9a7.16,7.16,0,0,0-1.34,1L17,7.76a.51.51,0,0,0-.7.13l-4.58,6.7a.24.24,0,0,0-.12.07L10.11,16h0l-.07.09,0,.07s0,.05,0,.08a.43.43,0,0,0,0,.11V43.58a3,3,0,0,0,3,3H37.25a3,3,0,0,0,3-3V16.33Zm-1.82-.48h-.13v-.11ZM31.78,7.36l6.42.79-.94,7.7H32.37v-.47a7.19,7.19,0,0,0-1.11-3.84Zm-6.71,7.15-.91,1.34H18.79v-.47a6.29,6.29,0,0,1,1.55-4.12Zm1-.54-2.93-2-.44-2.39a6.24,6.24,0,0,1,6.57,1.12l.95,5.16H25.37l.81-1.19a.45.45,0,0,0,.08-.37A.47.47,0,0,0,26.05,14Zm5.16,1.88-.64-3.54a6.27,6.27,0,0,1,.8,3.07v.47ZM25,4.76a9.89,9.89,0,0,1,1.65-.16,2.83,2.83,0,0,1,1.54.29,5.18,5.18,0,0,1-2.94,1.24A5.45,5.45,0,0,1,22,6h0C22.1,5.81,23.06,5.12,25,4.76Zm-2.75,2.4a5.69,5.69,0,0,0,1.3.14,10.33,10.33,0,0,0,1.88-.19A9,9,0,0,0,28,6.26L28.4,6,29,9.24a7.26,7.26,0,0,0-3.91-1.15,7.34,7.34,0,0,0-2.58.48Zm-.49,2.89.2,1.11-.89-.61A6.72,6.72,0,0,1,21.75,10.05Zm-4.9-1.18,2.66,1.82a7.27,7.27,0,0,0-1.72,4.69v.47H12.07ZM39.22,43.58a2,2,0,0,1-2,2H12.91a2,2,0,0,1-2-2V16.85h6.85v2.51a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V16.85H31.37v2.51a.5.5,0,0,0,.5.5.5.5,0,0,0,.5-.5V16.85h6.85Z"
              transform="translate(-9.94 -3.6)"
              fill="#0079c0"
            ></path>
            <path
              data-v-1196b37a=""
              d="M19.06,19.73a.5.5,0,0,0-.5.5c0,.3-.54.3-.54,0a.5.5,0,0,0-1,0,1.27,1.27,0,1,0,2.54,0A.51.51,0,0,0,19.06,19.73Z"
              transform="translate(-9.94 -3.6)"
              fill="#0079c0"
            ></path>
            <path
              data-v-1196b37a=""
              d="M32.64,19.73a.51.51,0,0,0-.5.5c0,.3-.53.3-.53,0a.51.51,0,0,0-.5-.5.5.5,0,0,0-.5.5,1.27,1.27,0,1,0,2.53,0A.5.5,0,0,0,32.64,19.73Z"
              transform="translate(-9.94 -3.6)"
              fill="#0079c0"
            ></path>
          </svg>
          {/* Make sure to update the SVG based on your specific design */}
          <svg
            data-v-1196b37a=""
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            width="25"
            height="35"
            viewBox="0 0 30.29 42.96"
          >
            {/* ... (your SVG path and attributes) */}
          </svg>
        </div>

        {/* Display Basket Price */}
        <div className="basket-price">{formatPrice(basketPrice)} ₪</div>
      </div>
    </div>
  );
};

export default ShoppingBasket;
