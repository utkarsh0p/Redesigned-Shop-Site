import React from "react";

const TermsOfUse = () => {
  return (
    <section className="max-w-6xl mx-auto px-6 py-12 space-y-12">
      {/* Page Heading */}
      <div className="text-center mb-12">
        <h1 className="heading text-brand font-heading font-bold text-4xl mb-4">
          Terms of Use
        </h1>
        <p className="para font-sub text-ink-soft max-w-3xl mx-auto leading-relaxed text-lg">
          Welcome to CrushBurg! These Terms of Use govern your access and use of
          our website, services, and products. By using this website, placing an
          order, or interacting with our platform, you agree to comply with all
          rules and policies outlined below. Please read carefully to understand
          your rights and responsibilities.
        </p>
      </div>

      {/* Section 1 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          1. Acceptance of Terms
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          By accessing or using CrushBurg’s website, you agree to these Terms of
          Use, our Privacy Policy, and any applicable local laws. If you do not
          agree with any portion of these terms, you are not authorized to use
          the website or services. Your continued use of our platform implies
          acceptance of all updates to these terms.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          These Terms apply to all visitors, customers, and users of the
          website. They establish rules, restrictions, and responsibilities that
          help ensure a safe and enjoyable experience for everyone.
        </p>
      </div>

      {/* Section 2 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          2. Use of Content
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          All text, images, graphics, logos, and other materials on the website
          are the property of CrushBurg and are protected under copyright laws.
          You may browse and view content for personal use only. Reproducing,
          distributing, or creating derivative works without explicit permission
          is strictly prohibited.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Users are encouraged to share content through social media using
          proper attribution. Misuse of content or unauthorized commercial use
          may result in legal action.
        </p>
      </div>

      {/* Section 3 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          3. Orders & Payments
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          All orders placed through CrushBurg must be paid in full before
          processing. Prices listed on the website are accurate at the time of
          posting but may change without prior notice. CrushBurg reserves the
          right to cancel orders due to stock limitations, technical errors, or
          suspicious activity.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Users are responsible for providing accurate delivery information. In
          case of errors in the address or contact information, we may be unable
          to fulfill the order. Payment methods accepted include major credit
          cards, debit cards, and digital wallets as listed on the website.
        </p>
      </div>

      {/* Section 4 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          4. Delivery & Pick-Up
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          CrushBurg strives to deliver orders on time, but delivery times are
          estimates and not guaranteed. Factors such as traffic, weather, or
          high demand may cause delays. We encourage users to plan accordingly.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          For pick-up orders, please arrive at the designated time. Orders not
          picked up within 15 minutes of the scheduled time may be subject to
          cancellation. CrushBurg is not liable for delays outside our control.
        </p>
      </div>

      {/* Section 5 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          5. Refunds & Cancellations
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Refunds are issued only for incorrect or damaged items, after review
          by our support team. Cancellation requests must be made immediately
          after placing the order. Once preparation begins, cancellations may
          not be accepted.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          For any issues regarding your order, please contact our customer
          service team. We aim to resolve complaints promptly to ensure customer
          satisfaction.
        </p>
      </div>

      {/* Section 6 */}
      <div className="bg-cream shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          6. Privacy & Security
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          User privacy is important to us. Personal data collected during the
          ordering process is used solely for fulfilling orders, enhancing user
          experience, and communicating important updates. We never sell or
          share personal data without consent, except where required by law.
        </p>
        <p className="para text-ink-soft font-sub leading-relaxed">
          Users are responsible for safeguarding their account information,
          passwords, and payment details. Unauthorized access or misuse of
          accounts may result in suspension or termination.
        </p>
      </div>

      {/* Section 7 */}
      <div className="bg-white shadow-lg rounded-2xl p-8 space-y-4">
        <h2 className="heading text-brand font-heading font-semibold text-2xl mb-4">
          7. Updates to Terms
        </h2>
        <p className="para text-ink-soft font-sub leading-relaxed">
          CrushBurg reserves the right to update or modify these Terms of Use at
          any time. All changes will be posted on this page. Users are
          encouraged to review the Terms periodically. Continued use of the
          website constitutes acceptance of the revised terms.
        </p>
      </div>

      {/* Footer Note */}
      <div className="text-center mt-12">
        <p className="para text-ink-soft font-sub text-sm leading-relaxed">
          Last updated: October 2025 <br />
          For questions or support, contact us at{" "}
          <span className="text-brand font-semibold">
            support@crushburg.com
          </span>
        </p>
      </div>
    </section>
  );
};

export default TermsOfUse;
