import { useState } from "react";

const faqs = [
  {
    question: "How do I create an account?",
    answer: "Click on the 'Sign Up' button on the top right corner and fill in your details."
  },
  {
    question: "How can I reset my password?",
    answer: "Click on 'Forgot Password' on the login page and follow the instructions."
  },
  {
    question: "How do I apply for a job?",
    answer: "Browse job listings, click on a job, and then click 'Apply Now'."
  },
  {
    question: "How can I contact support?",
    answer: "Reach out via 'Contact Us' page or email us at support@example.com."
  }
];

export const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background Image */}
      <img
        src="/images/faq-page.jpg"
        className="w-full h-full object-cover blur-sm scale-110"
        alt=""
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40 backdrop-brightness-10">
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
          {/* Title */}
          <h1 className="text-white font-mono text-4xl mb-8 text-glow">
            Frequently Asked Questions
          </h1>

          {/* FAQ List */}
          <div className="w-full max-w-2xl">
            {faqs.map((faq, index) => (
              <div key={index} className="mb-4 text-left">
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full flex justify-between items-center bg-white/10 text-white px-4 py-3 rounded-md font-mono hover:bg-white/20 transition"
                >
                  <span>{faq.question}</span>
                  <span className="font-bold">{openIndex === index ? "-" : "+"}</span>
                </button>

                {/* Collapsible Answer */}
                {openIndex === index && (
                  <p className="text-gray-300 mt-2 px-4 transition-all duration-300">
                    {faq.answer}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
