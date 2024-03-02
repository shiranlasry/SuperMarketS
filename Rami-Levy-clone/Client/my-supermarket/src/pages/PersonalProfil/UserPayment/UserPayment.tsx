import "./user-payment.scss";

const UserPayment = () => {
  return (
    <div className="payment-main">
      <div className="payment-container">
        <h3 className="payment-title">אפשרויות תשלום</h3>
        <div className="add-pament-wrapper">
          <span
            tabIndex={0}
            role="button"
            aria-label="הוספת כרטיס אשראי"
            className="add-payments focus-item plus-icon cursor-pointer bg-white card-shadow border-radius-50 blue-svg rl-boxshadow"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="20px"
              width="20px"
              viewBox="0 0 426.66667 426.66667"
              className="new-payment-icon"
            >
              <path d="m405.332031 192h-170.664062v-170.667969c0-11.773437-9.558594-21.332031-21.335938-21.332031-11.773437 0-21.332031 9.558594-21.332031 21.332031v170.667969h-170.667969c-11.773437 0-21.332031 9.558594-21.332031 21.332031 0 11.777344 9.558594 21.335938 21.332031 21.335938h170.667969v170.664062c0 11.777344 9.558594 21.335938 21.332031 21.335938 11.777344 0 21.335938-9.558594 21.335938-21.335938v-170.664062h170.664062c11.777344 0 21.335938-9.558594 21.335938-21.335938 0-11.773437-9.558594-21.332031-21.335938-21.332031zm0 0"></path>
            </svg>
          </span>
        </div>
        <div className="blue text-center mt-4 mb-5 pb-5 m-text">
          <p className="add-payment-method">הוספת כרטיס אשראי</p>
        </div>
      </div>
    </div>
  );
};

export default UserPayment;
