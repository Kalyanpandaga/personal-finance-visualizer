"use client";

export function TransactionList({ transactions, refreshTransactions }) {
  const handleDelete = async (id) => {
    try {
      const response = await fetch(`/api/transactions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete transaction");
      }

      refreshTransactions();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-sm bg-white mb-6">
      <h2 className="text-xl font-bold mb-4">Transactions</h2>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="p-2 border-b">Amount</th>
              <th className="p-2 border-b">Date</th>
              <th className="p-2 border-b">Description</th>
              <th className="p-2 border-b">Action</th>
            </tr>
          </thead>
          <tbody>
            {transactions.length === 0 ? (
              <tr>
                <td colSpan="4" className="text-center p-4">
                  No transactions found.
                </td>
              </tr>
            ) : (
              transactions.map((transaction) => (
                <tr key={transaction._id}>
                  <td className="p-2 border-b">
                    ${transaction.amount.toFixed(2)}
                  </td>
                  <td className="p-2 border-b">
                    {new Date(transaction.date).toLocaleDateString()}
                  </td>
                  <td className="p-2 border-b">{transaction.description}</td>
                  <td className="p-2 border-b">
                    <button
                      onClick={() => handleDelete(transaction._id)}
                      className="text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
