"use client";

import Header from "@/components/Header";
import FeedbackForm from "@/components/FeedbackForm";

export default function SpecialistPage() {
  return (
    <>
      <Header />
      <main className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 lg:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-gray-800 mb-4">
              Speak With a Specialist
            </h1>
            <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 px-4">
              Leave a detailed message for our team and we&apos;ll get back to you.
            </p>
          </div>

          {/* Only Feedback Form */}
          <div className="max-w-2xl mx-auto px-4 sm:px-0">
            <FeedbackForm />
          </div>
        </div>
      </main>
    </>
  );
}