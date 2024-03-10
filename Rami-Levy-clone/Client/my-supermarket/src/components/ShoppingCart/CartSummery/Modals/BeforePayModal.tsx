import React from 'react'

interface Props {
    onPay: () => void;
    onCancle: () => void;
}

const BeforePayModal: React.FC<Props> = ({onPay,onCancle}) => {
  return (
    <div>
        <h1>מילוי פרטי אשראי</h1>
     <form>
        <label>שם בעל הכרטיס</label>
        <input type="text" />
        <label>מספר כרטיס אשראי</label>
        <input type="text" />
        <label>תוקף</label>
        <input type="text" />
        <label>CVV</label>
        <input type="text" />
        <label>תשלום בתשלומים</label>
        <input type="text" />
     </form>
        <button onClick={onPay}>שלם</button>
        <button onClick={onCancle}>ביטול</button>
      
    </div>
  )
}

export default BeforePayModal
