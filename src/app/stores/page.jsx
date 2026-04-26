import LeafletMap from "@/app/stores/LeafletMap"
import StoreFinderClient from "@/app/stores/StoreFinderClient"

import Navbar from "../components/Navbar"
import Footer from "../components/Footer"

export default function store_find() {


  return (
    /* Full-viewport white wrapper */
    <div>
        <LeafletMap />
        <StoreFinderClient />

    </div>
  )
}
