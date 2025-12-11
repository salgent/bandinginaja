import type React from "react";

const MyLists: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="mb-4 font-bold text-2xl">My Lists</h1>
      <p className="text-gray-600">
        This is where you can manage your saved product lists.
      </p>
      <div className="mt-8 rounded-lg bg-gray-100 p-8 text-center">
        <p className="text-gray-500">
          No lists yet. Start adding products to your lists!
        </p>
      </div>
    </div>
  );
};

export default MyLists;
