"use client";

import React from "react";
import { Plus, Trash2 } from "lucide-react";
import { useAccounts } from "../../src/hook/useAccounts";

export default function AccountPage() {
  const {
    user,
    accounts, // ✅ fixed here
    activeAccountId,
    showModal,
    setShowModal,
    newAccountName,
    setNewAccountName,
    addAccount,
    switchAccount,
    deleteAccount,
  } = useAccounts();

  const handleAddAccount = async () => {
    if (!newAccountName.trim()) return;
    try {
      await addAccount();
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to create account");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAccount(id);
    } catch (err: any) {
      alert(err?.response?.data?.message || "Failed to delete account");
    }
  };

  return (
    <div className="p-6 bg-amber-800 min-h-screen text-white">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Your Accounts</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <Plus size={18} /> Add Account
        </button>
      </div>

      <ul className="space-y-3">
        {accounts.map((account) => (
          <li
            key={account.id}
            className={`flex justify-between items-center p-4 border rounded ${
              account.id === activeAccountId
                ? "bg-blue-50 text-black border-blue-500"
                : "bg-white text-black"
            }`}
          >
            <span className="font-medium">{account.username}</span>
            <div className="flex gap-3">
              <button
                onClick={() => switchAccount(account.id)}
                className="text-green-600 hover:underline"
              >
                Switch
              </button>
              <button
                onClick={() => handleDelete(account.id)}
                className="text-red-500 hover:underline flex items-center gap-1"
              >
                <Trash2 size={16} /> Delete
              </button>
            </div>
          </li>
        ))}
      </ul>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4 text-black">
              Add New Account
            </h2>
            <input
              value={newAccountName}
              onChange={(e) => setNewAccountName(e.target.value)}
              className="w-full border px-3 py-2 rounded mb-4"
              placeholder="Enter account name"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 border rounded cursor-pointer"
              >
                Cancel
              </button>
              <button
                onClick={handleAddAccount}
                className="px-4 py-2 bg-blue-600 text-white rounded cursor-pointer"
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
