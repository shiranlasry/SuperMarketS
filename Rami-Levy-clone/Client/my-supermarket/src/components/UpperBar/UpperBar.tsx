import "./upper-bar.scss";

const UpperBar = () => {
  return (
    <div className="upper-bar-icons">
      <img
        data-toggle="tooltip"
        title="זמני משלוח"
        src="/src/assets/img/delivery-times.png"
        className="delivery-icon"
      />
      <img
        data-toggle="tooltip"
        title="קניה מהירה"
        src="/src/assets/img/shop-fast.png"
        className="shop-fast-icon"
      />
      <img
        data-toggle="tooltip"
        title="גלו עוד"
        src="/src/assets/img/discover-more.png"
        className="find-more-icon"
      />
    </div>
  );
};

export default UpperBar;
