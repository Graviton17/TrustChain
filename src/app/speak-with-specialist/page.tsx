"use client";

import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";

export default function SpecialistPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
              Speak With a Specialist
            </h1>
            <p className="max-w-3xl mx-auto text-lg text-gray-600">
              Leave a detailed message for our team and we’ll get back to you.
            </p>
          </div>

          {/* Only Feedback Form */}
          <div className="max-w-2xl mx-auto">
            <FeedbackForm />
          </div>
        </div>
      </main>
    </>
  );
}