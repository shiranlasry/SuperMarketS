import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../../app/hook';
import { getAllDeliveriesApi } from '../../../../features/deliveries/allDeliveriesAPI';
import { deliveriesSelector } from '../../../../features/deliveries/allDeliveriesSlice';
import './AvailableDeliveriesModal.scss';
import { Delivery } from '../../../../rami-types';
interface AvailableDeliveriesModalProps {
  setSelectedDelivery: (delivery: Delivery) => void;
  selectedDelivery: Delivery | null;
  onClose: () => void;

}

const AvailableDeliveriesModal : React.FC<AvailableDeliveriesModalProps> = ({ onClose,setSelectedDelivery, selectedDelivery }) => {
  const allDeliveries = useAppSelector(deliveriesSelector);
  const [availableDeliveries, setAvailableDeliveries] = useState<Delivery[]>([]);
  const dispatch = useAppDispatch();
 

  useEffect(() => {
   
    dispatch(getAllDeliveriesApi());
    
  }, []);

  useEffect(() => {
    if (allDeliveries) {
      const filteredDeliveries = allDeliveries.filter(delivery => delivery.status === 1);
      setAvailableDeliveries(filteredDeliveries);
    }
  }, [allDeliveries]);

  const handleDeliverySelect = (delivery: Delivery) => {
    setSelectedDelivery(delivery);
    onClose();
  };

  return (
    <div className="available-deliveries-container">
      <h1>בחירת מועד משלוח</h1>
      <div className="delivery-list">
        {availableDeliveries.map(delivery => (
          <div
            key={delivery.delivery_id}
            className={`delivery-item ${selectedDelivery?.delivery_id == delivery.delivery_id ? 'selected' : ''}`}
            onClick={() => handleDeliverySelect(delivery)}
          >
            <span>{delivery.delivery_finish_date}</span>
            <span>{delivery.delivery_start_time}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDeliveriesModal;
