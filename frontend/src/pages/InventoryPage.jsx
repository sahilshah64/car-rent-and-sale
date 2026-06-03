// src/pages/InventoryPage.jsx
import VehicleSection from '../components/Vehicles/VehicleSection'

export default function InventoryPage() {
  return (
    <main className="pt-16">
      <div className="bg-gray-900 py-14 text-center">
        <h1 className="text-4xl font-black text-white uppercase">All Inventory</h1>
        <p className="text-gray-400 mt-2 text-sm">Browse our complete collection of cars</p>
      </div>
      <VehicleSection searchFilters={null} />
    </main>
  )
}
