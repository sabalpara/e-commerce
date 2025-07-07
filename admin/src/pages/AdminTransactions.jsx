import React, { useState } from 'react';

const transactionsData = [
  {
    id: 'TXN001',
    user: 'Jay Sabalpara',
    amount: 899,
    date: '2025-07-01',
    method: 'Cash on Delivery',
    status: 'Completed',
    items: ['Cotton Round Neck T-Shirt', 'Slim Fit Jeans']
  },
  {
    id: 'TXN002',
    user: 'Het Khunt',
    amount: 1499,
    date: '2025-07-03',
    method: 'UPI',
    status: 'Completed',
    items: ['Floral Printed Top', 'Black Leggings']
  },
  {
    id: 'TXN003',
    user: 'Dhaval Malsattar',
    amount: 499,
    date: '2025-06-25',
    method: 'Card',
    status: 'Pending',
    items: ['Denim Jacket']
  },
  // Add more transactions here
];

const AdminTransactions = () => {
  const [filterMonth, setFilterMonth] = useState('2025-07');

  const monthlyTransactions = transactionsData.filter((txn) =>
    txn.date.startsWith(filterMonth)
  );

  const totalMonthlyAmount = monthlyTransactions.reduce((sum, txn) => sum + txn.amount, 0);

  return (
    <div className="max-w-6xl px-4 py-10 mx-auto">
      <h2 className="mb-6 text-2xl font-semibold">Monthly Transactions</h2>

      {/* Month Filter */}
      <div className="mb-6">
        <label className="mr-2 font-medium">Select Month:</label>
        <input
          type="month"
          value={filterMonth}
          onChange={(e) => setFilterMonth(e.target.value)}
          className="px-3 py-1 border rounded"
        />
      </div>

      {/* Monthly Table */}
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Amount (₹)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {monthlyTransactions.length ? (
              monthlyTransactions.map((txn) => (
                <tr key={txn.id} className="border-t">
                  <td className="px-4 py-2">{txn.id}</td>
                  <td className="px-4 py-2">{txn.user}</td>
                  <td className="px-4 py-2">₹{txn.amount}</td>
                  <td className="px-4 py-2">{txn.date}</td>
                  <td className="px-4 py-2">{txn.method}</td>
                  <td className="px-4 py-2">{txn.status}</td>
                  <td className="px-4 py-2">
                    <ul className="ml-4 list-disc">
                      {txn.items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-4 py-4 text-center text-gray-500">
                  No transactions found for this month.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Total Amount */}
      <div className="mt-4 font-medium text-right">
        Total Amount This Month: ₹{totalMonthlyAmount}
      </div>

      {/* View All Section */}
      <h3 className="mt-10 mb-4 text-xl font-semibold">View All Transactions</h3>
      <div className="overflow-x-auto border rounded shadow">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2">Transaction ID</th>
              <th className="px-4 py-2">User</th>
              <th className="px-4 py-2">Amount (₹)</th>
              <th className="px-4 py-2">Date</th>
              <th className="px-4 py-2">Payment Method</th>
              <th className="px-4 py-2">Status</th>
              <th className="px-4 py-2">Items</th>
            </tr>
          </thead>
          <tbody>
            {transactionsData.map((txn) => (
              <tr key={txn.id} className="border-t">
                <td className="px-4 py-2">{txn.id}</td>
                <td className="px-4 py-2">{txn.user}</td>
                <td className="px-4 py-2">₹{txn.amount}</td>
                <td className="px-4 py-2">{txn.date}</td>
                <td className="px-4 py-2">{txn.method}</td>
                <td className="px-4 py-2">{txn.status}</td>
                <td className="px-4 py-2">
                  <ul className="ml-4 list-disc">
                    {txn.items.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminTransactions;
