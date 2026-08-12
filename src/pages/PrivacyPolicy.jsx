import React from "react";

const PrivacyPolicy = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="heading text-brand font-heading font-bold text-4xl mb-4">
          Privacy Policy
        </h1>
        <p className="para font-sub text-ink-soft max-w-3xl mx-auto leading-relaxed text-lg">
          At CrushBurg, your privacy is important to us. This Privacy Policy
          explains how we collect, use, and protect your personal information
          when you use our website or services. Please read carefully to
          understand our practices.
        </p>
      </div>

      {/* Section 1 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          1. Information We Collect
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          When you use our website, we may collect information such as your
          name, email address, phone number, delivery address, payment details,
          and order history. We also collect non-personal data like browser
          type, pages visited, and usage patterns to improve our website
          performance.
        </p>
      </div>

      {/* Section 2 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          2. How We Use Your Information
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Your information is used to process orders, communicate updates,
          provide customer support, and improve our services. We may also use it
          to send promotional offers, but only if you have opted in to receive
          them.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Non-personal data helps us analyze traffic trends, optimize website
          layout, and enhance overall user experience.
        </p>
      </div>

      {/* Section 3 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          3. Data Protection & Security
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          We take the security of your data seriously. All personal information
          is stored securely and protected using industry-standard encryption
          and safety measures. Access to sensitive data is limited to authorized
          personnel only.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          While we strive to protect your information, no method of transmission
          over the internet is 100% secure. We cannot guarantee absolute
          security.
        </p>
      </div>

      {/* Section 4 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          4. Sharing Your Information
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          CrushBurg does not sell or rent your personal information to third
          parties. Your data may be shared with trusted service providers who
          assist in delivery, payment processing, or marketing, but only under
          strict confidentiality agreements.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          We may disclose information if required by law or to protect the
          rights, property, or safety of CrushBurg and its users.
        </p>
      </div>

      {/* Section 5 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          5. Cookies & Tracking
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          We use cookies and similar tracking technologies to enhance your
          experience, analyze site traffic, and offer personalized content.
          Cookies do not contain personal information unless you provide it.
        </p>
      </div>

      {/* Section 6 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          6. Your Rights
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          You have the right to access, update, or delete your personal
          information. You may opt out of marketing communications at any time
          by contacting us at{" "}
          <span className="font-semibold">support@crushburg.com</span>.
        </p>
      </div>

      {/* Section 7 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          7. Updates to Privacy Policy
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          CrushBurg may update this Privacy Policy from time to time. All
          updates will be posted on this page. Continued use of the website
          constitutes acceptance of the revised policy.
        </p>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12">
        <p className="para text-ink-soft font-sub text-sm leading-relaxed">
          Last updated: October 2025 <br />
          For questions regarding your privacy or data, contact us at{" "}
          <span className="text-brand font-semibold">
            support@crushburg.com
          </span>
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
