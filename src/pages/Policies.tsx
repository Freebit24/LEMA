import React from 'react';

const Policies: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Privacy & Policy</h1>
          <p className="text-lg text-gray-600 mt-4">
            Your privacy is important to us. This policy explains how we handle your information.
          </p>
        </div>

        <div className="space-y-8">
          <section>
            <h2 className="text-2xl font-semibold text-primary">Information We Collect</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>
                <strong>Personal Information:</strong> Name, email, and other account details provided during registration.
              </li>
              <li>
                <strong>Usage Data:</strong> Information about your interaction with the platform, such as pages visited and courses accessed.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">How We Use Your Data</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>To provide and improve the platform's services.</li>
              <li>To personalize your experience.</li>
              <li>For customer support and communication.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Data Sharing and Disclosure</h2>
            <p className="text-gray-700 mt-2">
              We do not sell or share your personal data with third parties without your consent, except for legal or security purposes.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Cookies and Tracking</h2>
            <p className="text-gray-700 mt-2">
              We may use cookies to enhance user experience. You can control cookie settings in your browser.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Data Protection</h2>
            <p className="text-gray-700 mt-2">
              We implement industry-standard security measures to protect your data.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Your Rights</h2>
            <p className="text-gray-700 mt-2">
              You can access, update, or delete your personal information by contacting us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Changes to the Privacy Policy</h2>
            <p className="text-gray-700 mt-2">
              We may update this policy, and any changes will be posted on this page.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-primary">Contact</h2>
            <ul className="text-gray-700 mt-2">
              <li>
                Email: <a href="mailto:support@iko102.com" className="text-blue-500">contactxcend@gmail.com</a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Policies;