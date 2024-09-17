import Link from "next/link";

const TermsAndConditions = () => {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">Terms and Conditions</h1>

      <p className="mb-4">
        Welcome to <strong>Trendy</strong>. These Terms and Conditions outline
        the rules and regulations for the use of our website and services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        1. Acceptance of Terms
      </h2>
      <p className="mb-4">
        By accessing and using our website, you agree to comply with and be
        bound by these Terms and Conditions. If you do not agree to these terms,
        please do not use our website.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        2. Modifications to the Terms
      </h2>
      <p className="mb-4">
        We reserve the right to modify these Terms and Conditions at any time.
        Any changes will be effective immediately upon posting. It is your
        responsibility to review these terms periodically for updates.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">3. User Accounts</h2>
      <p className="mb-4">
        When you create an account with us, you must provide accurate and
        complete information. You are responsible for safeguarding your account
        and ensuring no unauthorized use of your account. We are not liable for
        any loss or damage from your failure to maintain the confidentiality of
        your account.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">4. Use of Services</h2>
      <p className="mb-4">
        You agree to use our services only for lawful purposes and in a manner
        that does not infringe on the rights of others or restrict or inhibit
        their use of the services. You agree not to:
      </p>
      <ul className="list-disc list-inside mb-4">
        <li>Post any illegal or harmful content.</li>
        <li>Engage in fraudulent or deceptive practices.</li>
        <li>Disrupt or interfere with our website or servers.</li>
      </ul>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        5. Intellectual Property
      </h2>
      <p className="mb-4">
        All content, logos, trademarks, and other intellectual property on our
        website are the exclusive property of <strong>Trendy</strong> unless
        otherwise stated. You may not reproduce, distribute, or otherwise use
        any content from this website without our express written permission.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">
        6. Limitation of Liability
      </h2>
      <p className="mb-4">
        We strive to provide accurate and up-to-date information, but we cannot
        guarantee that our website will be error-free, uninterrupted, or secure.
        We will not be liable for any direct, indirect, incidental, or
        consequential damages arising out of your use or inability to use our
        website or services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">7. Termination</h2>
      <p className="mb-4">
        We may suspend or terminate your access to our website and services at
        our sole discretion, without prior notice or liability, for any reason,
        including a breach of these Terms and Conditions.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">8. Governing Law</h2>
      <p className="mb-4">
        These Terms and Conditions are governed by the laws of [Your Country],
        without regard to its conflict of law provisions. You agree to submit to
        the exclusive jurisdiction of the courts in [Your Country] for any
        disputes arising out of or related to the use of our website or
        services.
      </p>

      <h2 className="text-xl font-semibold mt-6 mb-2">9. Contact Us</h2>
      <p className="mb-4">
        If you have any questions about these Terms and Conditions, please
        contact us at{" "}
        <Link href="/contact" className="underline text-blue-600">
          support@trendy.com
        </Link>
        .
      </p>

      <p className="mt-8">Last updated on: 24-08-2024 </p>
    </div>
  );
};

export default TermsAndConditions;
