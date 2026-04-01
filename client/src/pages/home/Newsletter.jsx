import React, { useState } from "react";
import { Mail, ArrowRight, CheckCircle2 } from "lucide-react";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    setSubmitted(true);
    setEmail("");
  };

  return (
    <section className="max-w-6xl mx-auto px-4 py-12">
      <div className="bg-gradient-to-br from-slate-100 via-gray-800 to-slate-200 rounded-3xl px-6 md:px-10 py-12 text-center relative overflow-hidden shadow-lg">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/5 rounded-full translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10 max-w-lg mx-auto">
          <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-5">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
            Stay in the Loop
          </h2>
          <p className="text-gray-200 text-sm mb-8">
            Get exclusive deals, new arrivals, and insider-only discounts
            straight to your inbox.
          </p>
          {submitted ? (
            <div className="flex items-center justify-center gap-2 text-white font-semibold">
              <CheckCircle2 className="w-5 h-5 text-green-300" />
              Thanks! You're subscribed.
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3"
            >
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address"
                className="flex-1 px-4 py-3 rounded-xl bg-white/20 text-white placeholder-gray-300 border border-white/20 focus:outline-none focus:border-white/50 focus:bg-white/25 transition-all text-sm"
                required
              />

              <button
                type="submit"
                className="inline-flex items-center justify-center gap-2 bg-white text-gray-700 font-bold px-6 py-3 rounded-xl hover:bg-gray-50 transition-all shadow-lg text-sm whitespace-nowrap"
              >
                Subscribe <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
          <p className="text-gray-300 text-xs mt-4">
            No spam. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}
