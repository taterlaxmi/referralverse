"use client";
import { useState } from "react";
import { X, CheckCircle, Send } from "lucide-react";

interface SubmitCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  appName: string;
}

export default function SubmitCodeModal({ isOpen, onClose, appName }: SubmitCodeModalProps) {
  const [code, setCode] = useState("");
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  if (!isOpen) return null;

  const endpoint = process.env.NEXT_PUBLIC_FORM_ENDPOINT || "https://api.web3forms.com/submit";
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY || "YOUR_ACCESS_KEY_HERE";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!code.trim()) return;

    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: accessKey,
          "App Name": appName,
          "Referral Code": code.trim(),
        }),
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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm transition-opacity">
      <div className="bg-white rounded-2xl w-full max-w-md overflow-hidden shadow-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between bg-slate-50">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Share your {appName} Code</h3>
            <p className="text-xs text-slate-500 mt-1">Help others and earn rewards!</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-slate-200 transition-colors text-slate-500"
            aria-label="Close modal"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {status === "success" ? (
            <div className="text-center py-6">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle size={32} className="text-green-600" />
              </div>
              <h4 className="text-xl font-bold text-slate-800 mb-2">Thank you!</h4>
              <p className="text-slate-600 text-sm mb-6">
                Your {appName} code has been submitted successfully. We will review and add it soon.
              </p>
              <button
                onClick={onClose}
                className="w-full bg-slate-900 text-white font-semibold py-3 rounded-xl hover:bg-slate-800 transition-colors"
              >
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="referralCode" className="block text-sm font-semibold text-slate-700 mb-2">
                  Referral Code
                </label>
                <input
                  type="text"
                  id="referralCode"
                  name="referralCode"
                  required
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  placeholder="e.g. UQ89K8"
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 focus:border-indigo-500 transition-all text-slate-800 font-medium"
                />
              </div>

              {status === "error" && (
                <div className="text-red-500 text-sm bg-red-50 p-3 rounded-lg border border-red-100">
                  {errorMessage}
                </div>
              )}

              <button
                type="submit"
                disabled={status === "submitting" || !code.trim()}
                className="w-full flex items-center justify-center gap-2 bg-indigo-600 text-white font-semibold py-3 rounded-xl hover:bg-indigo-700 active:scale-[0.98] transition-all disabled:opacity-70 disabled:pointer-events-none shadow-sm shadow-indigo-200"
              >
                {status === "submitting" ? (
                  "Submitting..."
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit Code</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
