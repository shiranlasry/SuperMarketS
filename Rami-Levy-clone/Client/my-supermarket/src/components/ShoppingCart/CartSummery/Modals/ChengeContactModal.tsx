import React from 'react'

interface Props {
    onClose: () => void;
}

const ChengeContactModal : React.FC<Props> = ({onClose}) => {
  return (
    <div>
      <h1>שינוי פרטי אנשי קשר ודגשים להזמנה</h1>
      <button onClick={onClose}>סגור</button>
    </div>
  )
}

export default ChengeContactModal
