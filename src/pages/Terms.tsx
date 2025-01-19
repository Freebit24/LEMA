import React from "react";

const Terms: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-800 py-8">
      <div className="container mx-auto p-6">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-primary">Terms of Service</h1>
          <p className="text-lg text-gray-600 mt-4">
            By accessing and using this platform, you agree to comply with and be bound by these terms.
          </p>
        </div>

        <div className="space-y-8">
          {/* User Responsibilities Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">User Responsibilities</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Maintain confidentiality of your account details.</li>
              <li>Use the platform for lawful purposes only and respect others' rights.</li>
            </ul>
          </section>

          {/* Account Registration and Security Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Account Registration and Security</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Provide accurate information and keep your details updated.</li>
              <li>You are responsible for all activities under your account.</li>
            </ul>
          </section>

          {/* Content Ownership and Use Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Content Ownership and Use</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>All course content, including materials, videos, and texts, are the intellectual property of the platform.</li>
              <li>Content may be accessed for personal use only and cannot be reproduced or modified without permission.</li>
            </ul>
          </section>

          {/* Prohibited Activities Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Prohibited Activities</h2>
            <ul className="list-disc list-inside text-gray-700 mt-2">
              <li>Engaging in fraudulent or unlawful activity.</li>
              <li>Posting offensive or harmful content.</li>
            </ul>
          </section>

          {/* Modifications to Terms Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Modifications to Terms</h2>
            <p className="text-gray-700 mt-2">
              These terms may change at any time. Continued use of the platform signifies acceptance of updated terms.
            </p>
          </section>

          {/* Termination of Access Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Termination of Access</h2>
            <p className="text-gray-700 mt-2">
              We reserve the right to suspend or terminate access if these terms are violated.
            </p>
          </section>

          {/* Limitation of Liability Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Limitation of Liability</h2>
            <p className="text-gray-700 mt-2">
              The platform is provided “as is” and is not liable for any damages or losses resulting from usage.
            </p>
          </section>

          {/* Governing Law Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Governing Law</h2>
            <p className="text-gray-700 mt-2">
              The terms are governed by applicable laws of our operating jurisdiction.
            </p>
          </section>

          {/* Contact Section */}
          <section>
            <h2 className="text-2xl font-semibold text-primary">Contact</h2>
            <ul className="text-gray-700 mt-2">
              <li>
                Email:{" "}
                <a href="mailto:support@iko102.com" className="text-blue-500">
                  contactxcend@gmail.com
                </a>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Terms;