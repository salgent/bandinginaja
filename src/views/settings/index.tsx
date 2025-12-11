import type React from "react";

const Settings: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 font-bold text-2xl">Settings</h1>
      <p className="text-gray-600">
        Configure your application preferences here.
      </p>
      <div className="mt-8 space-y-6">
        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 font-semibold text-lg">Appearance</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span>Dark mode</span>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 font-semibold text-lg">Notifications</h2>
          <div className="space-y-2">
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>Price drop alerts</span>
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span>New product recommendations</span>
            </label>
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 p-4">
          <h2 className="mb-2 font-semibold text-lg">Data & Privacy</h2>
          <div className="space-y-2">
            <button
              type="button"
              className="rounded bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
            >
              Clear browsing data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
