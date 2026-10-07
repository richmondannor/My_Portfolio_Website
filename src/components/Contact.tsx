import React, { useState } from 'react';

interface ContactProps {
  onOpenCVModal: () => void;
}

export const Contact: React.FC<ContactProps> = ({ onOpenCVModal }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('Inquiry regarding Web Dev / Data Analytics role');
  const [message, setMessage] = useState('');
  const [toastVisible, setToastVisible] = useState(false);

  const targetRecipient = 'ayisahrichmondy6101@gmail.com';
  const directPhone = '+233(0) 553287014';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoBody = encodeURIComponent(
      `Sender Name: ${name}\nSender Email: ${email}\n\nMessage:\n${message}`
    );
    const mailtoLink = `mailto:${targetRecipient}?subject=${encodeURIComponent(
      subject
    )}&body=${mailtoBody}`;

    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 7000);

    window.location.href = mailtoLink;
  };

  return (
    <section
      className="w-full bg-slate-100/70 dark:bg-[#11161d]/80 border-t border-slate-200 dark:border-[#30363d] py-16"
      id="contact"
    >
      <div className="max-w-[1280px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Direct Info & CV Download Column */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-blue-600 dark:text-[#00f2fe] font-bold mb-2">
                <span className="material-symbols-outlined text-[16px]">mail</span>
                <span>// Let&apos;s Connect</span>
              </div>
              <h2 className="font-sans text-2xl md:text-3xl text-slate-900 dark:text-[#f0f6fc] font-extrabold tracking-tight">
                Let&apos;s Build Something Exceptional
              </h2>
              <p className="text-sm text-slate-600 dark:text-[#8b949e] mt-2 leading-relaxed">
                Have an analytical challenge, a workflow optimization initiative, or a web project in mind? Reach out today.
              </p>
            </div>

            {/* Direct Communication Channels */}
            <div className="space-y-3">
              <a
                href={`tel:${directPhone.replace(/[^0-9+]/g, '')}`}
                className="p-4 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg flex items-center gap-3 hover:border-blue-400 dark:hover:border-[#00f2fe]/50 transition-all shadow-xs dark:shadow-none group"
              >
                <div className="w-10 h-10 rounded bg-blue-50 dark:bg-[#00f2fe]/10 border border-blue-200 dark:border-[#00f2fe]/20 text-blue-600 dark:text-[#00f2fe] flex items-center justify-center group-hover:bg-blue-600 dark:group-hover:bg-[#00f2fe] group-hover:text-white dark:group-hover:text-[#041b24] transition-all">
                  <span className="material-symbols-outlined text-[18px]">smartphone</span>
                </div>
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-slate-400 dark:text-[#8b949e] uppercase tracking-wider block">
                    Direct Contact
                  </span>
                  <span className="font-mono text-sm text-slate-800 dark:text-[#f0f6fc] font-bold truncate block">
                    {directPhone}
                  </span>
                </div>
              </a>

              <div className="p-4 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg flex items-center gap-3 shadow-xs dark:shadow-none">
                <div className="w-10 h-10 rounded bg-emerald-50 dark:bg-[#22c55e]/10 border border-emerald-200 dark:border-[#22c55e]/20 text-emerald-600 dark:text-[#22c55e] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[18px]">location_on</span>
                </div>
                <div>
                  <span className="font-mono text-[10px] text-slate-400 dark:text-[#8b949e] uppercase tracking-wider block">
                    Location &amp; Availability
                  </span>
                  <span className="font-mono text-sm text-slate-800 dark:text-[#f0f6fc] font-bold">
                    Accra, Ghana &nbsp;&nbsp; Open to remote &amp; hybrid offers
                  </span>
                </div>
              </div>
            </div>

            {/* CV Download Card */}
            <div className="bg-gradient-to-br from-blue-50 to-white dark:from-[#161b22] dark:to-[#1f2631] border border-blue-200 dark:border-[#00f2fe]/40 text-slate-900 dark:text-[#f0f6fc] p-5 rounded-lg shadow-sm dark:shadow-xl relative overflow-hidden">
              <div className="relative z-10 flex flex-col justify-between gap-4">
                <div>
                  <span className="font-mono text-[10px] uppercase tracking-widest text-blue-600 dark:text-[#00f2fe] block mb-1">
                    // Curriculum Vitae artifact
                  </span>
                  <h4 className="font-sans text-base font-bold text-slate-900 dark:text-[#f0f6fc]">
                    Richmond Annor Ayisah — Official Curriculum Vitae
                  </h4>
                  <p className="font-mono text-xs text-slate-500 dark:text-[#8b949e] mt-1">
                    Official Document • Statistics &amp; Computer Science • 2026
                  </p>
                </div>
                <button
                  type="button"
                  onClick={onOpenCVModal}
                  className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-600 dark:bg-[#00f2fe] text-white dark:text-[#041b24] font-mono text-xs font-bold rounded hover:bg-blue-700 dark:hover:bg-[#6ff6ff] shadow-md dark:shadow-[0_0_15px_rgba(0,242,254,0.3)] transition-all w-full cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">file_download</span>
                  <span>Download CV</span>
                </button>
              </div>
            </div>
          </div>

          {/* Form Container (dispatch_inquiry.sh) */}
          <div className="lg:col-span-7 bg-white dark:bg-[#161b22] border border-slate-200 dark:border-[#30363d] rounded-lg shadow-sm dark:shadow-xl overflow-hidden">
            {/* Window Header */}
            <div className="bg-slate-100 dark:bg-[#1f2631] px-4 py-2.5 border-b border-slate-200 dark:border-[#30363d] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="font-mono text-xs text-slate-600 dark:text-[#8b949e] ml-2">
                  dispatch_inquiry.sh
                </span>
              </div>
              <span className="font-mono text-[10px] text-emerald-600 dark:text-[#22c55e] font-bold">
                ENCRYPTED_TLS
              </span>
            </div>

            <form className="p-6 md:p-8 space-y-4" onSubmit={handleSubmit}>
              {/* Target Recipient Banner */}
              <div className="flex flex-wrap items-center justify-between gap-2 p-2.5 bg-slate-50 dark:bg-[#11161d] border border-slate-200 dark:border-[#30363d]/70 rounded font-mono text-xs">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-[#00f2fe]">
                    mark_email_read
                  </span>
                  <span className="text-slate-600 dark:text-[#8b949e]">Target Recipient:</span>
                  <span className="text-slate-900 dark:text-[#f0f6fc] font-semibold">
                    {targetRecipient}
                  </span>
                </div>
                <a
                  href={`mailto:${targetRecipient}`}
                  className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 dark:bg-[#00f2fe]/10 text-blue-600 dark:text-[#00f2fe] hover:bg-blue-100 dark:hover:bg-[#00f2fe]/20 border border-blue-200 dark:border-[#00f2fe]/30 transition-colors"
                >
                  <span className="material-symbols-outlined text-[13px]">open_in_new</span>
                  <span className="text-[11px]">Direct Mailto</span>
                </a>
              </div>

              {/* Inputs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1.5 neon-border-cyan rounded">
                  <label
                    className="font-mono text-xs text-slate-800 dark:text-[#f0f6fc] font-semibold block"
                    htmlFor="name"
                  >
                    <span className="text-blue-600 dark:text-[#00f2fe]">$</span> user.name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Jane Doe (or Hiring Team)"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#11161d] border border-slate-300 dark:border-[#30363d] text-slate-900 dark:text-[#f0f6fc] rounded outline-none focus:border-blue-600 dark:focus:border-[#00f2fe] transition-all text-xs font-mono"
                  />
                </div>

                <div className="space-y-1.5 neon-border-cyan rounded">
                  <label
                    className="font-mono text-xs text-slate-800 dark:text-[#f0f6fc] font-semibold block"
                    htmlFor="email"
                  >
                    <span className="text-blue-600 dark:text-[#00f2fe]">$</span> user.email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="jane@company.com"
                    className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#11161d] border border-slate-300 dark:border-[#30363d] text-slate-900 dark:text-[#f0f6fc] rounded outline-none focus:border-blue-600 dark:focus:border-[#00f2fe] transition-all text-xs font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1.5 neon-border-cyan rounded">
                <label
                  className="font-mono text-xs text-slate-800 dark:text-[#f0f6fc] font-semibold block"
                  htmlFor="subject"
                >
                  <span className="text-blue-600 dark:text-[#00f2fe]">$</span> email.subject
                </label>
                <input
                  id="subject"
                  type="text"
                  required
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Inquiry regarding Web Dev / Data Analytics role"
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#11161d] border border-slate-300 dark:border-[#30363d] text-slate-900 dark:text-[#f0f6fc] rounded outline-none focus:border-blue-600 dark:focus:border-[#00f2fe] transition-all text-xs font-mono"
                />
              </div>

              <div className="space-y-1.5 neon-border-cyan rounded">
                <label
                  className="font-mono text-xs text-slate-800 dark:text-[#f0f6fc] font-semibold block"
                  htmlFor="message"
                >
                  <span className="text-blue-600 dark:text-[#00f2fe]">$</span> email.body
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Dear Richmond, I reviewed your portfolio and would like to connect regarding..."
                  className="w-full px-3.5 py-2 bg-slate-50 dark:bg-[#11161d] border border-slate-300 dark:border-[#30363d] text-slate-900 dark:text-[#f0f6fc] rounded outline-none focus:border-blue-600 dark:focus:border-[#00f2fe] transition-all text-xs font-mono resize-y"
                />
              </div>

              {/* Toast */}
              {toastVisible && (
                <div className="flex items-center gap-2 p-3 bg-emerald-50 dark:bg-[#22c55e]/10 border border-emerald-200 dark:border-[#22c55e]/30 rounded text-emerald-700 dark:text-[#22c55e] font-mono text-xs animate-fade-in">
                  <span className="material-symbols-outlined text-[16px]">check_circle</span>
                  <span className="font-semibold">
                    Email client triggered: Draft prepared for Richmond Annor ({targetRecipient}).
                  </span>
                </div>
              )}

              {/* Form Buttons */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
                <button
                  type="submit"
                  className="w-full sm:flex-1 inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-600 dark:bg-[#00f2fe] text-white dark:text-[#041b24] font-mono text-xs font-bold rounded hover:bg-blue-700 dark:hover:bg-[#6ff6ff] shadow-md dark:shadow-[0_0_20px_rgba(0,242,254,0.3)] transition-all cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[16px]">send</span>
                  <span>Send Direct Email</span>
                </button>
                <a
                  href={`mailto:${targetRecipient}?subject=${encodeURIComponent(
                    subject
                  )}`}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-100 dark:bg-[#1f2631] border border-slate-300 dark:border-[#30363d] text-slate-700 dark:text-[#f0f6fc] hover:border-blue-400 dark:hover:border-[#00f2fe]/50 font-mono text-xs font-medium rounded transition-all"
                >
                  <span className="material-symbols-outlined text-[16px] text-blue-600 dark:text-[#00f2fe]">
                    mail
                  </span>
                  <span>Open Mail Client</span>
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
