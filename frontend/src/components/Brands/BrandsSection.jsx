// src/components/Brands/BrandsSection.jsx
const BRANDS = ['Audi','BMW','Ford','Honda','Mercedes-Benz','Toyota','Volkswagen','Hyundai']

export default function BrandsSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-black text-gray-900 uppercase mb-2">Explore Our</h2>
        <h2 className="text-4xl font-black text-gray-900 uppercase mb-10">Premium Brands</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {BRANDS.map(b => (
            <button key={b} className="px-6 py-3 border-2 border-gray-200 rounded-full text-sm font-bold text-gray-600 hover:border-red-500 hover:text-red-600 transition-all">
              {b}
            </button>
          ))}
        </div>
      </div>
    </section>
  )
}
