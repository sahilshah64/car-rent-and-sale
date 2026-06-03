// src/pages/ContactPage.jsx
import { useState } from 'react'

export default function ContactPage() {
  const [form,    setForm]    = useState({ name:'', email:'', subject:'', message:'' })
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  function update(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })) }

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))   // Simulate API call
    setSent(true)
    setLoading(false)
  }

  return (
    <main className="pt-16 min-h-screen bg-gray-50">
      <div className="bg-gray-900 py-14 text-center">
        <h1 className="text-4xl font-black text-white uppercase">Contact Us</h1>
        <p className="text-gray-400 mt-2 text-sm">We'd love to hear from you</p>
      </div>
      <div className="max-w-5xl mx-auto px-4 py-14 grid grid-cols-1 md:grid-cols-2 gap-10">
        {/* Info */}
        <div>
          <h2 className="text-2xl font-black text-gray-900 mb-6">Get In Touch</h2>
          {[
            { icon:'📍', label:'Address',  value:'123 Car Street, Auto City, AC 12345' },
            { icon:'📞', label:'Phone',    value:'+1 (555) 123-4567' },
            { icon:'✉️', label:'Email',    value:'support@zoomcar.com' },
            { icon:'🕐', label:'Hours',    value:'Mon–Sat: 9am – 6pm' },
          ].map(i => (
            <div key={i.label} className="flex items-start gap-4 mb-5">
              <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-lg flex-shrink-0">{i.icon}</div>
              <div>
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wide mb-0.5">{i.label}</p>
                <p className="text-sm text-gray-700 font-medium">{i.value}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Form */}
        {sent ? (
          <div className="flex items-center justify-center">
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
              </div>
              <h3 className="text-xl font-black text-gray-900 mb-2">Message Sent!</h3>
              <p className="text-gray-500 text-sm">We'll get back to you within 24 hours.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 space-y-4">
            <h2 className="text-lg font-bold text-gray-900 mb-2">Send a Message</h2>
            {[['name','Full Name','text'],['email','Email Address','email'],['subject','Subject','text']].map(([name,label,type]) => (
              <div key={name}>
                <label className="block text-xs font-semibold text-gray-600 mb-1.5">{label}</label>
                <input name={name} type={type} value={form[name]} onChange={update} required className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500" placeholder={label}/>
              </div>
            ))}
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Message</label>
              <textarea name="message" value={form.message} onChange={update} required rows={4} className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none" placeholder="How can we help?"/>
            </div>
            <button type="submit" disabled={loading} className="w-full bg-red-600 hover:bg-red-700 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors">
              {loading ? 'Sending...' : 'Send Message'}
            </button>
          </form>
        )}
      </div>
    </main>
  )
}
