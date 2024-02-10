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
        <div className="col-12 col-md-6 col-xl-2 pl-3 pl-lg-5 pr-3 pr-lg-5 pt-4 py-4">
          <ul>
            <li>
              <h5>עוד מרמי לוי</h5>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/online/mall" target="_blank">מועדון הלקוחות (הצטרפות חינם)</a>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/dashboard" target="_blank">מועדון כרטיס האשראי</a>
            </li>
            <li>
              <a href="/he/orders-and-deliveries" target="_blank">תקשורת ואביזרי סלולר</a>
            </li>
            <li>
              <a href="/he/supervision" target="_blank">ביטוחים</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">קשרי משקיעים</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">דוחות כספיים</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-xl-2 pl-3 pl-lg-5 pr-3 pr-lg-5 pt-4 py-4">
          <ul>
            <li>
              <h5>מידע נוסף ותקנון</h5>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/online/mall" target="_blank">הצהרת נגישות</a>
            </li>
            <li>
              <a href="https://www.rami-levy.co.il/he/dashboard" target="_blank">שאלות נפוצות</a>
            </li>
            <li>
              <a href="/he/orders-and-deliveries" target="_blank">מדיניות ופרטיות</a>
            </li>
            <li>
              <a href="/he/supervision" target="_blank">תנאי שימוש</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">מדיניות ביטול עסקה ודרכי הביטול</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">סניפים נגישים</a>
            </li>
            <li>
              <a href="/he/orders-and-deliveries" target="_blank">שקיפות מחירים</a>
            </li>
            <li>
              <a href="/he/supervision" target="_blank">אסיפות כלליות</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">דו"ח פומבי (2022)</a>
            </li>
            <li>
              <a href="/he/deal-cancel" target="_blank">הסדר פשרה</a>
            </li>
          </ul>
        </div>
        <div className="col-12 col-md-6 col-xl-3 pl-0 pl-xl-2 pr-0 pr-xl-2 pt-4">
  <ul>
    <li className="footer-text s-text">
      <h5>מוקדי שירות הלקוחות שלנו לשרותך.</h5>
      <br></br>
    </li>
    <li className="footer-text s-text">
    <h5>פניות הציבור</h5>
      <p>מוקד: <a href="tel:1599-590-500" style={{ color: '#1579F2', textDecoration: 'none' }}>1599-590-500</a></p>
    </li>
    
   
    <li className="footer-text s-text">
    <h5>אינטרנט ושופינג</h5>
      <p>מוקד: <a href="tel:073-284-0000" style={{ color: '#1579F2', textDecoration: 'none' }}>073-284-0000</a></p>
      <p>קישור ל״וואטסאפ״: ⁦<a href="https://wa.me/+972556888800" target="_blank" rel="noopener noreferrer" style={{ color: '#1579F2', textDecoration: 'none' }}>055-688-8800⁩</a></p>
      <p>כתובת דוא״ל: <a href="mailto:online@rami-levy.co.il" style={{ color: '#1579F2', textDecoration: 'none' }}>online@rami-levy.co.il</a></p>
    </li>
    <li className="footer-text s-text">
      
    </li>
    <h5>סניפי הרשת</h5>
    <li className="footer-text s-text">
      <p>מוקד: <a href="tel:076-888-8686" style={{ color: '#1579F2', textDecoration: 'none' }}>076-888-8686</a></p>
      <p>כתובת דוא״ל: <a href="mailto:sherut@rami-levy.co.il" style={{ color: '#1579F2', textDecoration: 'none' }}>sherut@rami-levy.co.il</a></p>
    </li>
  </ul>
</div>

      </div>
      <div className="d-md-flex align-items-center justify-content-between w-100 all-rights border-top border-secondary mx-auto py-3 mt-5 position-relative">
        <div className='rights'>כל הזכויות שמורות לרמי לוי שיווק השיקמה</div>
        <div className='version'>v2.4.6</div>
      </div>
    </footer>
  );
};

export default Footer;
