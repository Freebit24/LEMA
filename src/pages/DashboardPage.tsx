import { useState } from "react";
import Navbar from "../components/dashboard/Navbar";
import Sidebar from "../components/dashboard/Sidebar";
import LeadCard from "../components/dashboard/LeadCard";
import Footer from "../components/common/Footer";

// Mock data for demonstration
const mockLeads = [
  {
    id: "1",
    title: "Enterprise Software Integration Lead",
    description:
      "Fortune 500 company interested in our enterprise solution for their IT infrastructure.",
    source: "Website",
    date: "Today at 2:30 PM",
    tags: ["Enterprise", "Urgent", "High Value"],
  },
  {
    id: "2",
    title: "Marketing Campaign Opportunity",
    description:
      "Digital marketing agency looking for collaboration on upcoming campaign.",
    source: "LinkedIn",
    date: "Yesterday at 4:15 PM",
    tags: ["Marketing", "Partnership"],
  },
  {
    id: "3",
    title: "Product Demo Request",
    description:
      "Mid-size tech company requesting comprehensive product demonstration.",
    source: "Email",
    date: "2 days ago",
    tags: ["Demo", "Sales"],
  },
  // Add more mock leads as needed
];

function Dashboard() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      {/* Navbar */}
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />

      <div className="flex flex-1">
        {/* Sidebar */}
        <Sidebar
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-32">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-3xl font-extrabold text-gray-800 mb-6">
              Lead Dashboard
            </h1>

            {/* Vertical Layout for Cards */}
            <div className="space-y-6">
              {mockLeads.map((lead) => (
                <LeadCard key={lead.id} lead={lead} />
              ))}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Dashboard;