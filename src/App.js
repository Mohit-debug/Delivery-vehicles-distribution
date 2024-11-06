import React, { useState } from 'react';
import './App.css';

const MaximumCapacity = 60;

const App = () => {
  const [OrderList, setOrderList] = useState([
    // Example orders
    [
      { id: 1, Quantity: 34, Value: 87 },
      { id: 2, Quantity: 28, Value: 16 },
      { id: 3, Quantity: 44, Value: 36 },
      { id: 4, Quantity: 37, Value: 93 },
      { id: 5, Quantity: 50, Value: 22 }
    ],
    [
      { id: 6, Quantity: 13, Value: 28 },
      { id: 7, Quantity: 41, Value: 60 },
      { id: 8, Quantity: 14, Value: 27 },
      { id: 9, Quantity: 41, Value: 27 },
      { id: 10, Quantity: 23, Value: 37 }
    ],
    [
      { id: 11, Quantity: 12, Value: 69 },
      { id: 12, Quantity: 18, Value: 30 },
      { id: 13, Quantity: 33, Value: 31 },
      { id: 14, Quantity: 13, Value: 24 },
      { id: 15, Quantity: 18, Value: 36 }
    ],
    [
      { id: 16, Quantity: 30, Value: 3 },
      { id: 17, Quantity: 23, Value: 59 },
      { id: 18, Quantity: 20, Value: 68 },
      { id: 19, Quantity: 44, Value: 57 },
      { id: 20, Quantity: 12, Value: 43 }
    ],
    [
      { id: 21, Quantity: 30, Value: 74 },
      { id: 22, Quantity: 22, Value: 20 },
      { id: 23, Quantity: 35, Value: 38 },
      { id: 24, Quantity: 49, Value: 25 },
      { id: 25, Quantity: 16, Value: 71 }
    ]
  ]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedVehicle, setSelectedVehicle] = useState(0); 
  const [vehicles, setVehicles] = useState([[], [], []]); 


  const selectItem = (item) => {
    if (!selectedItems.some((i) => i.id === item.id)) {
      setSelectedItems([...selectedItems, item]);
    }
  };


  const deselectItem = (item) => {
    setSelectedItems(selectedItems.filter((i) => i.id !== item.id));
  };


  const AssigningToVehicle = () => {
    const vehicleItems = vehicles[selectedVehicle];
    const totalQty = vehicleItems.reduce((sum, item) => sum + item.Quantity, 0);
    const selectedQty = selectedItems.reduce((sum, item) => sum + item.Quantity, 0);

    if (totalQty + selectedQty > MaximumCapacity) {
      alert(`ITEMS CANNOT LOAD EXCEEDS VEHICLE CAPACITY OF ${MaximumCapacity} UNITS.`);
    } else if (selectedItems.length === 0) {
      alert("ITEMS IS NOT SELECTED TO ASSIGN TO VEHICLE");
    } else {
      const updatedVehicles = [...vehicles];
      updatedVehicles[selectedVehicle] = [...vehicleItems, ...selectedItems];
      setVehicles(updatedVehicles);
      setSelectedItems([]);
      alert(`ITEMS IS SUCCESSFLULLY LOADED TO VEHICLE ${selectedVehicle + 1}`);
    }
  };


  const deliverItems = () => {
    const vehicleItems = vehicles[selectedVehicle];

    if (vehicleItems.length === 0) {
      alert("THERE IS NO ITEMS TO DELIVER!");
      return;
    }

    const updatedOrders = OrderList.map((order) =>
      order.filter(
        (item) => !vehicleItems.some((deliveredItem) => deliveredItem.id === item.id)
      )
    );

    setOrderList(updatedOrders);

    const updatedVehicles = [...vehicles];
    updatedVehicles[selectedVehicle] = [];
    setVehicles(updatedVehicles);
    alert(`VEHICLE ${selectedVehicle + 1} HAS SUCCESSFULLY DELIVERED!`);
  };

  const totalQuantity = selectedItems.reduce((sum, item) => sum + item.Quantity, 0);
  const totalValue = selectedItems.reduce((sum, item) => sum + item.Value, 0);
  const QuantityLeft = MaximumCapacity - totalQuantity;

  return (
    <div style={{ padding: '20px' }}>
      <h1>Order List</h1>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        {OrderList.map((order, orderIndex) => (
          <div key={orderIndex} className="order-column" style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '20%' }}>
            <h2>Order {orderIndex + 1}</h2>
            {order.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }} className={`order-item ${selectedItems.some((i) => i.id === item.id) ? 'selected' : ''}`}>
                <span>Quantity: {item.Quantity}, Value: {item.Value} Rs</span>
                <button onClick={() => selectItem(item)} style={{ marginLeft: '10px' }}> Select </button>
              </div>
            ))}
          </div>
        ))}
      </div>

      <h1 style={{ textAlign: 'center' }}>Selected Items</h1>
      <div style={{ textAlign: 'center', marginBottom: '20px' }}>
        {selectedItems.length > 0 ? (
          <div>
            {selectedItems.map((item) => (
              <div key={item.id} style={{ marginBottom: '10px' }}>
                <span>
                  Quantity: {item.Quantity}, Value: {item.Value} Rs
                </span>
                <button onClick={() => deselectItem(item)} style={{ marginLeft: '10px' }}> Deselect </button>
              </div>
            ))}
            <div><strong>Total Quantity == </strong> {totalQuantity} units</div>
            <div><strong>Quantity Left == </strong> {QuantityLeft} units (out of 60 units)</div>
            <div><strong>Total Value == </strong> {totalValue} Rs</div>
          </div>
        ) : (
          <div>No items selected</div>
        )}
      </div>

      <h1 style={{ textAlign: 'center' }}>Vehicles</h1>
      <h2 style={{ textAlign: 'center' }}>Vehicle {selectedVehicle + 1} is Selected</h2>
      <div style={{ display: 'flex', justifyContent: 'space-between' }} className="vehicles">
        {vehicles.map((vehicle, index) => (
          <div key={index} style={{ border: '1px solid black', padding: '10px', margin: '10px', width: '30%' }}>
            <h2>Vehicle {index + 1}</h2>
            {vehicle.map((item) => (
              <div key={item.id}>
                <span>Quantity: {item.Quantity}, Value: {item.Value} Rs</span>
              </div>
            ))}
            <button
              className={`select-vehicle-button ${selectedVehicle === index ? 'active' : ''}`}
              onClick={() => setSelectedVehicle(index)}
              style={{ marginTop: '10px' }}>
              Select Vehicle {index + 1}
            </button>
            <button
              onClick={AssigningToVehicle}
              disabled={selectedVehicle !== index}
              style={{ marginLeft: '10px' }}>
              Assign Items to Vehicle {index + 1}
            </button>
            <button
              onClick={deliverItems}
              disabled={selectedVehicle !== index}
              style={{ marginLeft: '10px' }}>
              Send Vehicle {index + 1}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
