// src/components/Shop/ShopSection.jsx
const CATS = {
  'New Cars For Sale':  ['Abarth Cars','Alfa Romeo Cars','Audi Cars','Bentley Cars','BMW Cars','Chevrolet Cars'],
  'Used Cars For Sale': ['Chrysler Cars','Crown Cars','Dacia Cars','DS Cars','Fiat Cars'],
  'Browse By Type':     ['SUVs','Sedans','Coupes','Pickups','MPVs'],
  'Browse By Brand':    ['Kia Cars','Land Rover Cars','Lexus Cars','Mazda Cars','Mercedes Cars'],
}

export function ShopSection() {
  return (
    <section className="py-14 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-end justify-between mb-10">
          <h2 className="text-4xl font-black text-gray-900 uppercase leading-tight">Shop ZoomCar<br/>Your Way</h2>
          <a href="#" className="text-sm font-semibold text-red-600 hover:underline">View All</a>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {Object.entries(CATS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-sm font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">{title}</h4>
              <ul className="space-y-2">
                {links.map(l => <li key={l}><a href="#" className="text-sm text-gray-500 hover:text-red-600 transition-colors">{l}</a></li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function FeaturedBanner() {
  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-gray-900 via-blue-950 to-gray-900 min-h-[280px] flex items-center">
        <div className="relative z-10 p-10 sm:p-14 max-w-sm">
          <span className="text-blue-400 text-xs font-bold uppercase tracking-widest">Model Y</span>
          <p className="text-gray-300 text-sm mt-1">1.99% APR Financing</p>
          <p className="text-white text-3xl font-black mt-1 mb-6">from $24,990</p>
          <div className="flex gap-3">
            <button className="bg-white text-gray-900 font-bold text-sm px-5 py-2.5 rounded-full hover:bg-gray-100 transition-colors">Order Now</button>
            <button className="border border-white/40 text-white font-semibold text-sm px-5 py-2.5 rounded-full hover:bg-white/10 transition-colors">Demo Drive</button>
          </div>
        </div>
        <div className="absolute right-0 bottom-0 w-1/2 h-full flex items-end justify-end pointer-events-none">
          <img src="https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80" alt="" className="h-full object-contain object-right-bottom opacity-80"/>
        </div>
      </div>
    </section>
  )
}
