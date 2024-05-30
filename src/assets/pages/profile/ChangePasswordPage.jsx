import React from "react";

const ChangePasswordPage = () => {
  return (
    <div className="bg-white shadow-lg p-5 rounded-md">
      <h2 className="font-medium pb-4">Change Password</h2>

      <form>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old-password">Old Password</label>
          <input
            className="outline-none px-3 py-2 border rounded-md text-slate-500"
            type="password"
            name="old-password"
            id="old-password"
            placeholder="Old password"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old-password">New Password</label>
          <input
            className="outline-none px-3 py-2 border rounded-md text-slate-500"
            type="password"
            name="new-password"
            id="new-password"
            placeholder="New password"
          />
        </div>
        <div className="flex flex-col gap-1 mb-2">
          <label htmlFor="old-password">Confirm Password</label>
          <input
            className="outline-none px-3 py-2 border rounded-md text-slate-500"
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm password"
          />
        </div>
        <div className="mt-6">
          <button className="px-8 py-2 bg-[#059473] text-white font-medium rounded-sm shadow-lg hover:shadow-green-500/30">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePasswordPage;
