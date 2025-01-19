import { ArrowLeft, Tags, Users, Calendar, Filter } from "lucide-react";

const Sidebar = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
  return (
    <div
      className={`fixed inset-y-0 left-0 transform ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } lg:translate-x-0 lg:static w-72 bg-gray-50 shadow-lg transition-transform duration-300 ease-in-out z-40`}
    >
      <div className="h-full flex flex-col p-6 space-y-6 relative">
        {/* Close Button for Mobile View */}
        {isOpen && (
          <button
            onClick={onClose}
            className="lg:hidden absolute top-1/2 -right-6 transform -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 z-50"
            aria-label="Close Sidebar"
          >
            <ArrowLeft size={20} />
          </button>
        )}

        {/* Filter Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-700 mt-6 lg:mt-0">Filters</h2>

          <div className="space-y-6">
            {/* Tags Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Tags size={16} />
                Tags
              </label>
              <div className="mt-2 space-y-2">
                {["Urgent", "Marketing", "Sales", "Support"].map((tag) => (
                  <label key={tag} className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="rounded text-blue-600 focus:ring-2 focus:ring-blue-500"
                      aria-label={`Filter by ${tag}`}
                    />
                    <span className="text-sm text-gray-600">{tag}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Source Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Users size={16} />
                Source
              </label>
              <select
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by Source"
              >
                <option value="">All Sources</option>
                <option value="slack">Slack</option>
                <option value="gmail">Gmail</option>
                <option value="website">Website</option>
              </select>
            </div>

            {/* Date Range Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Calendar size={16} />
                Date Range
              </label>
              <select
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                aria-label="Filter by Date Range"
              >
                <option value="all">All Time</option>
                <option value="today">Today</option>
                <option value="week">This Week</option>
                <option value="month">This Month</option>
              </select>
            </div>

            {/* Sort By Filter */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-2">
                <Filter size={16} />
                Sort By
              </label>
              <select
                className="mt-2 w-full rounded-md border-gray-300 shadow-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                aria-label="Sort Leads"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
                <option value="priority">Priority</option>
              </select>
            </div>
          </div>
        </div>

        {/* Apply Filters Button */}
        <button
          onClick={onClose}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Apply Filters"
        >
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
