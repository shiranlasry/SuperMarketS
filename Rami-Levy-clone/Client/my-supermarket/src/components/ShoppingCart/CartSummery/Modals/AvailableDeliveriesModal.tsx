import React, { useEffect, useState } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import { useAppDispatch, useAppSelector } from '../../../../app/hook';
import { getAllDeliveriesApi } from '../../../../features/deliveries/allDeliveriesAPI';
import { deliveriesSelector } from '../../../../features/deliveries/allDeliveriesSlice';
import './AvailableDeliveriesModal.scss';


const AvailableDeliveriesModal = () => {
  const allOccupiedDeliveries = useAppSelector(deliveriesSelector);
  const dispatch = useAppDispatch();
  const [selectedDeliver, setSelectedDeliver] = useState<Date | null>(null);
  

  useEffect(() => {
    dispatch(getAllDeliveriesApi());
  }, []);


  return (
    <div>
      <h1>בחירת מועד משלוח</h1>
    </div>
  );
};

export default AvailableDeliveriesModal;
