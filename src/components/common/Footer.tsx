const Footer = () => {
  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <div className="flex space-x-6">
            <a href="#help" className="text-sm text-gray-600 hover:text-gray-900">Help</a>
            <a href="#privacy" className="text-sm text-gray-600 hover:text-gray-900">Privacy Policy</a>
            <a href="#support" className="text-sm text-gray-600 hover:text-gray-900">Contact Support</a>
          </div>
          <p className="text-sm text-gray-600">
            © {new Date().getFullYear()} LeadDash. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;