// src/components/Hero/Hero.jsx
import { useState } from 'react'

const MAKES   = ['Any Make','Audi','BMW','Ford','Honda','Hyundai','Land Rover','Mercedes-Benz','Toyota','Volkswagen']
const MODELS  = ['Any Model','C Class','CR-V','Camry','Q5','Sport','Tiguan','Tucson','5 Series','GLA','X5']
const PRICES  = ['Any Price','Under $500','$500–$800','$800–$1000','Over $1000']

export default function Hero({ onSearch }) {
  const [tab,   setTab]   = useState('All')
  const [make,  setMake]  = useState('Any Make')
  const [model, setModel] = useState('Any Model')
  const [price, setPrice] = useState('Any Price')

  function handleSearch() {
    onSearch({ condition: tab, make, model, price })
    document.getElementById('inventory')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative min-h-[580px] flex items-center justify-center overflow-hidden">
      <img src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80" alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4 w-full max-w-3xl mx-auto pt-20">
        <p className="text-gray-300 text-xs uppercase tracking-widest mb-3">Find cars for sale and for rent near you</p>
        <h1 className="text-5xl md:text-6xl font-black text-white leading-tight mb-10 uppercase">
          Find Your<br/>Perfect Car
        </h1>
        <div className="bg-white rounded-2xl p-5 shadow-2xl">
          <div className="flex gap-5 border-b border-gray-100 pb-4 mb-4">
            {['All','New','Used'].map(t => (
              <button key={t} onClick={() => setTab(t)} className={`text-sm font-semibold pb-1 border-b-2 transition-all ${tab===t?'border-red-600 text-red-600':'border-transparent text-gray-400 hover:text-gray-700'}`}>{t}</button>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row gap-3">
            <select value={make}  onChange={e=>setMake(e.target.value)}  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500">{MAKES.map(m=><option key={m}>{m}</option>)}</select>
            <select value={model} onChange={e=>setModel(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500">{MODELS.map(m=><option key={m}>{m}</option>)}</select>
            <select value={price} onChange={e=>setPrice(e.target.value)} className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 focus:outline-none focus:ring-2 focus:ring-red-500">{PRICES.map(p=><option key={p}>{p}</option>)}</select>
            <button onClick={handleSearch} className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition-colors flex items-center gap-2 whitespace-nowrap">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
              Search Cars
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
