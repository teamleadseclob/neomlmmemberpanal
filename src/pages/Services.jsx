import React, { useState, useEffect } from 'react';
import {
  ServicesHeader,
  ServicesTabs,
  HeroBanner,
  SearchBar,
  ModulesList,
} from '../components/services';
import { geteventes } from '../config/apiService';

// Maps tab id → API type param
const TAB_TYPE_MAP = {
  contest:  'contest',
  learning: 'learning_package',
  tools:    'tools',
}

async function fetchServices(tab) {
  const res = await geteventes(TAB_TYPE_MAP[tab])
  return res.data ?? []
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
        const data = await fetchServices(activeTab)
        setModules(data)
        setTotalPages(1)
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
    <div className="max-w-screen mx-auto">
      <ServicesHeader />

      <ServicesTabs activeTab={activeTab} onTabChange={handleTabChange} />

      <HeroBanner activeTab={activeTab} />

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
