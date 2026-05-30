"use client";
import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Mail, Send, CheckCircle, HelpCircle, Code } from 'lucide-react';

export default function ContactPage() {
  const [inquiryType, setInquiryType] = useState('general');
  const [formData, setFormData] = useState({
    email: '',
    message: '',
    appName: '',
    code: ''
  });
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://formspree.io/f/mvzyyapv";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    let payload: any = {
      "Inquiry Type": inquiryType === 'general' ? 'General Inquiry' : 'Code Submission',
    };

    if (inquiryType === 'general') {
      payload["Email"] = formData.email;
      payload["Message"] = formData.message;
    } else {
      payload["App Name"] = formData.appName;
      payload["Referral Code"] = formData.code;
      if (formData.email) payload["Email"] = formData.email;
    }

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        const data = await response.json();
        if (Object.hasOwn(data, "errors")) {
          setErrorMessage(data.errors.map((err: any) => err.message).join(", "));
        } else {
          setErrorMessage("Something went wrong. Please try again.");
        }
        setStatus("error");
      }
    } catch (error) {
      setErrorMessage("Network error. Please try again.");
      setStatus("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFDFF]">
      <Header />
      
      <main className="flex-grow pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            
            {/* Contact Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-black text-slate-900 mb-4 tracking-tight">
                  Get in <span className="text-indigo-600">Touch</span>
                </h1>
                <p className="text-lg text-slate-600 leading-relaxed max-w-md">
                  Have a question about an offer? Want to partner with us? Or maybe you just want to share a working referral code? We'd love to hear from you.
                </p>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="bg-indigo-50 p-3 rounded-xl text-indigo-600 shrink-0">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">LinkedIn</h3>
                  <p className="text-slate-600 text-sm mb-3">Connect with us on LinkedIn for updates.</p>
                  <a href="https://www.linkedin.com/company/referralverse/posts/?feedView=all&viewAsMember=true" target="_blank" rel="noopener noreferrer" className="text-indigo-600 font-semibold hover:underline">
                    ReferralVerse on LinkedIn
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-4 p-6 bg-white rounded-2xl border border-slate-100 shadow-sm">
                <div className="bg-sky-50 p-3 rounded-xl text-sky-600 shrink-0">
                  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-900 mb-1">X (Twitter)</h3>
                  <p className="text-slate-600 text-sm mb-3">Reach out to us on X for quick questions.</p>
                  <a href="https://x.com/referralverse" target="_blank" rel="noopener noreferrer" className="text-sky-600 font-semibold hover:underline">
                    @referralverse
                  </a>
                </div>
              </div>
            </div>

            {/* Form Section */}
            <div className="bg-white rounded-3xl p-6 md:p-10 shadow-xl shadow-slate-200/50 border border-slate-100">
              <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
              
              {status === "success" ? (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-600" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-800 mb-2">Message Sent!</h4>
                  <p className="text-slate-600 text-sm mb-6">
                    Thanks for reaching out. We will get back to you as soon as possible.
                  </p>
                  <button
                    onClick={() => { setStatus('idle'); setFormData({ email: '', message: '', appName: '', code: '' }); }}
                    className="bg-slate-900 text-white font-semibold px-6 py-3 rounded-xl hover:bg-slate-800 transition-colors"
                  >
                    Send Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Inquiry Type Tabs */}
                  <div className="flex bg-slate-100 p-1 rounded-xl">
                    <button
                      type="button"
                      onClick={() => setInquiryType('general')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${inquiryType === 'general' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <HelpCircle size={16} /> General
                    </button>
                    <button
                      type="button"
                      onClick={() => setInquiryType('code')}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-semibold transition-all ${inquiryType === 'code' ? 'bg-white text-slate-900 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                      <Code size={16} /> Share Code
                    </button>
                  </div>

                  {inquiryType === 'general' ? (
                    <>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          required
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800"
                        />
                      </div>
                      <div>
                        <label htmlFor="message" className="block text-sm font-semibold text-slate-700 mb-2">Message</label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={4}
                          value={formData.message}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 resize-none"
                        ></textarea>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <label htmlFor="appName" className="block text-sm font-semibold text-slate-700 mb-2">App Name <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="appName"
                          name="appName"
                          required
                          placeholder="e.g. Slice, Kiwi"
                          value={formData.appName}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800"
                        />
                      </div>
                      <div>
                        <label htmlFor="code" className="block text-sm font-semibold text-slate-700 mb-2">Referral Code <span className="text-red-500">*</span></label>
                        <input
                          type="text"
                          id="code"
                          name="code"
                          required
                          value={formData.code}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 font-mono font-bold"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-semibold text-slate-700 mb-2">Email Address (Optional)</label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          placeholder="If you want us to notify you when it's added"
                          value={formData.email}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800"
                        />
                      </div>
                    </>
                  )}

                  {status === "error" && (
                    <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                      {errorMessage}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3.5 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none shadow-sm shadow-indigo-200"
                  >
                    {status === "submitting" ? (
                      "Sending..."
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
            
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
