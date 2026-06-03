// src/pages/HomePage.jsx
import { useState } from 'react'
import Hero from '../components/Hero/Hero'
import BrandsSection from '../components/Brands/BrandsSection'
import VehicleSection from '../components/Vehicles/VehicleSection'
import { ShopSection, FeaturedBanner } from '../components/Shop/ShopSection'

export default function HomePage() {
  const [filters, setFilters] = useState(null)

  return (
    <main>
      <Hero onSearch={setFilters} />
      <BrandsSection />
      <VehicleSection searchFilters={filters} />
      <ShopSection />
      <FeaturedBanner />
    </main>
  )
}
