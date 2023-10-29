import "./App.css";
import React, { useState, useEffect } from 'react';
import Axios from 'axios';

function App() {
  const [customerNumber, setCustomerNumber] = useState('');
  const [customerName, setCustomerName] = useState('');
  const [customerGender, setCustomerGender] = useState('');
  const [customers, setCustomers] = useState([]);

  // 新增顧客
  const handleCreateCustomer = () => {
    Axios.post('http://localhost:3001/createcustomer', {
      customer_number: customerNumber,
      customer_name: customerName,
      customer_gender: customerGender,
    })
      .then((response) => {
        console.log(response.data);
        // 清空输入框或执行其他操作
        // 重新获取并显示所有顾客
        fetchCustomers();
      })
      .catch((error) => {
        console.error(error);
        // 处理错误
      });
  };

  // 获取所有顾客
  const fetchCustomers = () => {
    Axios.get('http://localhost:3001/getcustomers')
      .then((response) => {
        setCustomers(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  // 刪除顧客的函數
  const handleDeleteCustomer = (customerId) => { // 使用正确的参数名 customerId
    Axios.delete(`http://localhost:3001/deletecustomer/${customerId}`) // 使用正确的参数名 customerId
      .then((response) => {
        console.log(response.data);
        // 删除成功后重新获取并显示所有顾客
        fetchCustomers();
      })
      .catch((error) => {
        console.error(error);
        // 处理错误
      });
  };


  useEffect(() => {
    fetchCustomers();
  }, []); // 第二个参数是一个空数组，确保 useEffect 仅在组件挂载时运行一次

  return (
    <div>
      <h1>新增顧客</h1>
      <div>
        <label>顧客電話:</label>
        <input
          type="text"
          value={customerNumber}
          onChange={(e) => setCustomerNumber(e.target.value)}
        />
      </div>
      <div>
        <label>顧客姓名:</label>
        <input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
      </div>
      <div>
        <label>顧客性別:</label>
        <input
          type="text"
          value={customerGender}
          onChange={(e) => setCustomerGender(e.target.value)}
        />
      </div>
      <button onClick={handleCreateCustomer}>新增顧客</button>

      <h2>顧客清單</h2>
      {customers.map((customer) => (
        <div  key={customer.customer_ids}>
          <p>
            顧客電話: {customer.customer_number}, 顧客姓名: {customer.customer_name}, 顧客性別: {customer.customer_gender}
          </p>
          <button onClick={() => handleDeleteCustomer(customer.customer_id)}>刪除顧客</button>
        </div>
      ))}
    </div>
  );
}

export default App;
