import { Tag, CheckCircle, FileText } from "lucide-react";

interface Lead {
  id: string;
  title: string;
  description: string;
  source: string;
  date: string;
  tags: string[];
}

const LeadCard = ({ lead }: { lead: Lead }) => {
  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="p-5">
        {/* Title and Source */}
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-bold text-gray-800 leading-tight">
            {lead.title}
          </h3>
          <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full shadow-sm">
            {lead.source}
          </span>
        </div>

        {/* Description */}
        <p className="text-gray-700 text-sm mb-4 leading-relaxed">
          {lead.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {lead.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full shadow-sm"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Date */}
        <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
          <span>{lead.date}</span>
        </div>

        {/* Actions */}
        <div className="border-t pt-4 flex flex-wrap justify-between gap-3">
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-green-500 hover:bg-green-600 rounded-lg shadow-md transition-colors w-full sm:w-auto">
            <CheckCircle size={18} />
            Complete
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 rounded-lg shadow-md transition-colors w-full sm:w-auto">
            <Tag size={18} />
            Tag
          </button>
          <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 rounded-lg shadow-md transition-colors w-full sm:w-auto">
            <FileText size={18} />
            Summarize
          </button>
        </div>
      </div>
    </div>
  );
};

export default LeadCard;