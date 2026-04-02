import React from "react";

function Dialog({ open, onClose, onConfirm }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-sm p-6 animate-fadeIn">
        <h2 className="text-lg font-semibold mb-2">Logout?</h2>

        <p className="text-sm text-gray-500 mb-6">
          Are you sure you want to log out?
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-sm bg-red-500 text-white rounded-lg hover:bg-red-600"
          >
            Yes, Logout
          </button>
        </div>
      </div>
    </div>
  );
}

export default Dialog;
