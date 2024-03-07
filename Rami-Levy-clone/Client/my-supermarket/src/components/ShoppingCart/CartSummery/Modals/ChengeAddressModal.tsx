import React from 'react'

interface Props {
    onClose: () => void;
}

const ChengeAddressModal : React.FC<Props> = ({onClose}) => {
  return (
    <div>
      <h1>שינוי כתובת</h1>
      <button onClick={onClose}>סגור</button>
    </div>
  )
}

export default ChengeAddressModal
