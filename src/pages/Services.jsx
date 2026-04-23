import { useState, useEffect } from 'react';
import {
  ServicesHeader,
  ServicesTabs,
  HeroBanner,
  SearchBar,
  ModulesList,
} from '../components/services';
import axiosConfig from '../config/axiosConfig';

async function fetchServices(tab, search, page) {
  const res = await axiosConfig.get('/api/services', {
    params: { type: tab, search, page },
  })
  return res.data
}

function Services() {
  const [activeTab, setActiveTab]   = useState('learning')
  const [search, setSearch]         = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [modules, setModules]       = useState([])
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading]       = useState(false)

  useEffect(() => {
    const load = async () => {
      setLoading(true)
      try {
        const data = await fetchServices(activeTab, search, currentPage)
        setModules(data.data ?? [])
        setTotalPages(data.totalPages ?? 1)
      } catch {
        setModules([])
      } finally {
        setLoading(false)
      }
    }
    load()
  }, [activeTab, search, currentPage])

  // Reset to page 1 when tab or search changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setCurrentPage(1)
  }

  const handleSearch = (val) => {
    setSearch(val)
    setCurrentPage(1)
  }

  return (
    <div className="max-w-[1200px] mx-auto">
      <ServicesHeader />

      <ServicesTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <HeroBanner />

      <SearchBar
        search={search}
        onSearch={handleSearch}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <ModulesList modules={modules} loading={loading} />
    </div>
  )
}

export default Services
