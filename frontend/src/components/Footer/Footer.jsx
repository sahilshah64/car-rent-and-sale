// src/components/Footer/Footer.jsx
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-400 pt-14 pb-8">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          <div className="col-span-2 sm:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-7 h-7 bg-red-600 rounded-lg flex items-center justify-center"><span className="text-white text-xs font-black">Z</span></div>
              <span className="text-white font-black text-lg">ZOOMCAR</span>
            </div>
            <p className="text-sm leading-relaxed mb-4">Find the perfect car for sale or rent near you.</p>
            <div className="flex gap-2">
              <input type="email" placeholder="Your email..." className="flex-1 bg-gray-800 text-sm text-gray-300 placeholder-gray-600 px-3 py-2 rounded-lg border border-gray-700 focus:outline-none focus:border-red-500"/>
              <button className="bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-3 py-2 rounded-lg transition-colors">Subscribe</button>
            </div>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {[['Home','/'],['Inventory','/inventory'],['Blog','/blog'],['Contact','/contact']].map(([l,h]) => (
                <li key={l}><Link to={h} className="text-sm hover:text-red-400 transition-colors">{l}</Link></li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Vehicle Type</h4>
            <ul className="space-y-2">{['SUV','Sedan','Coupe','Pickup','MPV','Hatchback'].map(t => <li key={t}><a href="#" className="text-sm hover:text-red-400 transition-colors">{t}</a></li>)}</ul>
          </div>
          <div>
            <h4 className="text-white font-bold text-sm mb-4">Our Brands</h4>
            <ul className="space-y-2">{['Audi','BMW','Honda','Ford','Mercedes','Toyota'].map(b => <li key={b}><a href="#" className="text-sm hover:text-red-400 transition-colors">{b}</a></li>)}</ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
          <div className="flex gap-4">
            <a href="#" className="hover:text-white">Terms & Conditions</a>
            <a href="#" className="hover:text-white">Privacy Policy</a>
          </div>
          <p>©2024 ZoomCar. All rights reserved.</p>
          <button onClick={() => window.scrollTo({top:0,behavior:'smooth'})} className="flex items-center gap-1 bg-gray-800 hover:bg-gray-700 px-3 py-1.5 rounded-full transition-all">Back to Top ↑</button>
        </div>
      </div>
    </footer>
  )
}
