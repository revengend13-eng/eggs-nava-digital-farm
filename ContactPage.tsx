import React, { useState } from 'react';
import { useFarm } from '../context/FarmContext';
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  CheckCircle2,
  Clock,
  ExternalLink
} from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { settings, submitSupportInquiry, currentUser } = useFarm();
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    const res = submitSupportInquiry(name, email, subject, message);
    if (res.success) {
      setSubmitted(true);
      setFeedbackMsg(res.message);
      setSubject('');
      setMessage('');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
          Agricultural Support Desk
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-white font-display tracking-tight">
          Connect With Eggs Nava Team
        </h1>
        <p className="text-stone-300 text-sm sm:text-base leading-relaxed font-light">
          Have questions regarding flock allocations, institutional coops, daily egg distribution, or payment settlements? We are here to assist.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Info & Channels */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-5">
            <h3 className="text-lg font-bold text-white font-display">
              Headquarters & Farm Facilities
            </h3>

            <div className="space-y-4 text-xs text-stone-300">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Main Facility Address</span>
                  <span className="text-stone-400">{settings.farmAddress}</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Mail className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Support & Desk Email</span>
                  <a href={`mailto:${settings.contactEmail}`} className="text-amber-400 hover:underline">
                    {settings.contactEmail}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Agricultural Hotline</span>
                  <a href={`tel:${settings.supportPhone}`} className="text-stone-300 hover:underline">
                    {settings.supportPhone}
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold text-white block">Operational Hours</span>
                  <span className="text-stone-400">24/7 Automated Sensor Monitoring · Desk: Mon - Sun 08:00 - 22:00 UTC</span>
                </div>
              </div>
            </div>
          </div>

          {/* Direct Social Channels */}
          <div className="p-6 bg-stone-950 border border-stone-800 rounded-2xl space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-stone-300">
              Direct Farmer Community Channels
            </h4>

            <div className="space-y-2.5">
              <a
                href={settings.telegramChannel}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-between text-xs text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-sky-400" />
                  <span className="font-medium">Official Telegram Community</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>

              <a
                href={`https://wa.me/${settings.whatsappSupport.replace(/\D/g, '')}`}
                target="_blank"
                rel="noreferrer"
                className="p-3 bg-stone-900 hover:bg-stone-800 border border-stone-800 rounded-xl flex items-center justify-between text-xs text-stone-200 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-emerald-400" />
                  <span className="font-medium">Direct WhatsApp Support Hotline</span>
                </div>
                <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
              </a>
            </div>
          </div>
        </div>

        {/* Support Form */}
        <div className="lg:col-span-7 bg-stone-950 border border-stone-800 rounded-2xl p-6 sm:p-8">
          <h3 className="text-xl font-bold text-white font-display mb-1">
            Send an Inquiry Ticket
          </h3>
          <p className="text-xs text-stone-400 mb-6">
            Inquiries are dispatched directly to our agricultural team and recorded in the administration console.
          </p>

          {submitted ? (
            <div className="p-6 bg-emerald-950/40 border border-emerald-800/60 rounded-2xl text-center space-y-3">
              <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
              <h4 className="text-base font-bold text-white">Ticket Submitted Successfully</h4>
              <p className="text-xs text-emerald-200 leading-relaxed max-w-md mx-auto">
                {feedbackMsg || 'Your inquiry has been queued for review by the agricultural relations team.'}
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-3 px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold rounded-lg transition-colors"
              >
                Send Another Inquiry
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="contactNameInput" className="block text-xs text-stone-400 mb-1">Your Full Name</label>
                  <input
                    id="contactNameInput"
                    type="text"
                    required
                    placeholder="e.g. Inamullah"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>

                <div>
                  <label htmlFor="contactEmailInput" className="block text-xs text-stone-400 mb-1">Email Address</label>
                  <input
                    id="contactEmailInput"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="contactSubjectInput" className="block text-xs text-stone-400 mb-1">Inquiry Subject</label>
                <input
                  id="contactSubjectInput"
                  type="text"
                  required
                  placeholder="e.g. Institutional Flock Allocation or Deposit Support"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label htmlFor="contactMessageInput" className="block text-xs text-stone-400 mb-1">Message & Specific Requirements</label>
                <textarea
                  id="contactMessageInput"
                  required
                  rows={5}
                  placeholder="Detail your inquiry or question here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="w-full bg-stone-900 border border-stone-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-stone-600 focus:outline-none focus:border-amber-500 resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-stone-950 font-bold text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Submit Inquiry Ticket</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
