import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../app/hook";
import { getAllDeliveriesApi } from "../../../../features/deliveries/allDeliveriesAPI";
import { deliveriesSelector } from "../../../../features/deliveries/allDeliveriesSlice";
import "./AvailableDeliveriesModal.scss";
import { Delivery } from "../../../../rami-types";

interface AvailableDeliveriesModalProps {
  setSelectedDelivery: (delivery: Delivery) => void;
  selectedDelivery: Delivery | null;
  onClose: () => void;
  setNewOrder: (field: string, value: string | number) => void;
}

const AvailableDeliveriesModal: React.FC<AvailableDeliveriesModalProps> = ({
  onClose,
  setSelectedDelivery,
  selectedDelivery,
  setNewOrder,
}) => {
  const allDeliveries = useAppSelector(deliveriesSelector);
  const [groupedDeliveries, setGroupedDeliveries] = useState<{ [date: string]: Delivery[] }>({});
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllDeliveriesApi());
  }, []);

  useEffect(() => {
    if (allDeliveries) {
      const grouped = allDeliveries.reduce((acc, delivery) => {
        if (delivery.status === 1) {
          const date = new Date(delivery.delivery_finish_date).toLocaleDateString("he-IL", {
            weekday: "long",
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          });
          acc[date] = acc[date] ? [...acc[date], delivery] : [delivery];
        }
        return acc;
      }, {} as { [date: string]: Delivery[] });

      setGroupedDeliveries(grouped);
    }
  }, [allDeliveries]);

  const formatTimeRange = (startTime: string): string => {
    const startHour = new Date(`01/01/2000 ${startTime}`);
    const endHour = new Date(startHour.getTime() + 2 * 60 * 60 * 1000); // Adding 2 hours
    return `${startHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}-${endHour.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
  };

  const handleDeliverySelect = (delivery: Delivery) => {
    if (delivery && delivery.delivery_id) {
      setSelectedDelivery(delivery);
      setNewOrder("delivery_id", delivery.delivery_id);
      onClose();
    }
  };

  return (
    <div className="available-deliveries-container">
      <h1 className="available-deliveries-title">בחירת מועד משלוח</h1>
      <div className="days-scroll-container">
        {Object.entries(groupedDeliveries).map(([date, deliveries]) => (
          <div key={date} className="day-container">
            <h2>{date}</h2>
            <div className="delivery-list">
              {deliveries.map((delivery) => (
                <div
                  key={delivery.delivery_id}
                  className={`delivery-item ${
                    selectedDelivery?.delivery_id === delivery.delivery_id ? "selected" : ""
                  }`}
                  onClick={() => handleDeliverySelect(delivery)}
                >
                  <span>{formatTimeRange(delivery.delivery_start_time)}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AvailableDeliveriesModal;
