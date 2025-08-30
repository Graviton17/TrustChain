"use client";

import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

const FeedbackForm = () => {
  const [status, setStatus] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('Submitting...');
    // Simulate API call
    setTimeout(() => {
      setStatus('Your feedback has been received. We will get back to you shortly.');
    }, 1500);
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-md border border-gray-200">
      <h3 className="text-2xl font-bold text-gray-800 mb-4">Feedback & Inquiries</h3>
      <p className="text-gray-600 mb-6">
        Facing an issue or have a suggestion? Let us know.
      </p>
      {status ? (
        <div className="text-green-600 bg-green-50 p-4 rounded-md">{status}</div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label htmlFor="topic" className="block text-sm font-medium text-gray-700">Topic</label>
            <Select required>
              <SelectTrigger id="topic">
                <SelectValue placeholder="Select a topic" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="technical-issue">Technical Issue</SelectItem>
                <SelectItem value="general-feedback">General Feedback</SelectItem>
                <SelectItem value="partnership-inquiry">Partnership Inquiry</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Your Email</label>
            <Input id="email" type="email" placeholder="you@example.com" required />
          </div>
          <div className="space-y-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <Textarea id="message" placeholder="Please describe your issue or feedback in detail." required rows={5} />
          </div>
          <Button type="submit" className="w-full bg-emerald-500 hover:bg-emerald-600">Submit</Button>
        </form>
      )}
    </div>
  );
};

export default FeedbackForm;