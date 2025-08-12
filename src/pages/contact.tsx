import React from "react";
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";

const ContactPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <Hero
        badge="Get in Touch"
        title="Contact Us"
        subtitle="Whether you have questions, feedback, or partnership ideas, we’d love to hear from you."
      />

      <Section className="py-12 bg-gradient-to-b from-gray-50 to-white">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white shadow-xl ring-1 ring-gray-100 p-6 sm:p-8">
          <form
            className="grid grid-cols-1 gap-5"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks! We'll get back to you soon.");
            }}
            noValidate
          >
            {/* Name */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                autoComplete="name"
                placeholder="e.g., Rita Abou Rjeily"
                title="Enter your full name"
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                aria-required="true"
              />
            </div>

            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                placeholder="you@example.com"
                title="Enter a valid email address"
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                aria-required="true"
              />
              <p id="emailHelp" className="sr-only">
                We’ll only use your email to reply to your message.
              </p>
            </div>

            {/* Message */}
            <div>
              <label
                htmlFor="message"
                className="block text-sm font-medium text-gray-700"
              >
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell us how we can help…"
                title="Describe your request or question"
                className="mt-1 w-full rounded-xl border border-gray-200 p-3 focus:outline-none focus:ring-2 focus:ring-blue-600"
                required
                aria-required="true"
                aria-describedby="messageHelp"
              />
              <p id="messageHelp" className="sr-only">
                Enter your message. Minimum one sentence.
              </p>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-full bg-gradient-to-r from-blue-600 to-teal-600 px-6 py-3 font-semibold text-white shadow hover:opacity-95"
            >
              Send Message
            </button>
          </form>
        </div>
      </Section>
    </div>
  );
};

export default ContactPage;
