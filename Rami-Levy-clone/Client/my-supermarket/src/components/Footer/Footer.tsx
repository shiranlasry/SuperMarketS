import './footer.scss';

const Footer = () => {
  return (
    <footer className="site-footer">
      <div className="row no-gutters">
        <div className="col-12 col-md-6 col-xl-2 pl-3 pl-lg-5 pr-3 pr-lg-5 pt-4 py-4">
          <ul>
            <li>
              <h5>רמי לוי באינטרנט</h5>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/online/mall" target="_blank">רמי לוי שופינג</a>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/dashboard" target="_blank">איזור אישי</a>
            </li>
            <li>
              <a href="/he/orders-and-deliveries" target="_blank">אזורי משלוח</a>
            </li>
            <li>
              <a href="/he/supervision" target="_blank">מוצרים בפיקוח</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">טופס ביטול עסקה</a>
            </li>
          </ul>
        </div>
        {/* Add similar divs for other sections */}
      </div>
      <div className="d-md-flex align-items-center justify-content-between w-100 all-rights border-top border-secondary mx-auto py-3 mt-5 position-relative">
        <div>כל הזכויות שמורות לרמי לוי שיווק השיקמה</div>
        <div>v2.4.6</div>
      </div>
    </footer>
  );
};

export default Footer;
