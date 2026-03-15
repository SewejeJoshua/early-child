import { LayoutDashboard } from "lucide-react";

const DashboardHome = () => {
  return (
    <div className="flex items-center justify-center h-[80vh] px-6">
      <div className="bg-white border rounded-2xl shadow-sm p-10 text-center max-w-lg w-full">
        
        <div className="flex justify-center mb-4">
          <div className="bg-green-100 p-4 rounded-full">
            <LayoutDashboard className="text-green-600" size={28} />
          </div>
        </div>

        <h1 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h1>

        <p className="text-gray-500 mt-3">
          Use the sidebar to manage your platform, update content, and monitor activities.
        </p>

      </div>
    </div>
  );
};

export default DashboardHome;