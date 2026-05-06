import React, { useState, useEffect } from 'react';
import {
  SupportHeader,
  TicketStats,
  RaiseTicket,
  SupportHistory,
  ElitePrivilege,
  FaqQuickLinks,
  SystemsStatus,
} from '../components/support';
import { gettickets } from '../config/apiService';

function Support() {
  const [tickets, setTickets]   = useState([])
  const [summary, setSummary]   = useState(null)
  const [loading, setLoading]   = useState(false)

  const fetchTickets = async () => {
    setLoading(true)
    try {
      const res = await gettickets()
      setTickets(res.data ?? [])
      setSummary(res.summary ?? null)
    } catch {
      setTickets([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchTickets() }, [])

  return (
    <div className="max-w-screen mx-auto">
      <SupportHeader />
      <TicketStats summary={summary} />
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-3 flex flex-col gap-4">
          <RaiseTicket onSuccess={fetchTickets} />
          <SupportHistory tickets={tickets} loading={loading} />
        </div>
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ElitePrivilege />
          <FaqQuickLinks />
          {/* <SystemsStatus /> */}
        </div>
      </div>
    </div>
  );
}

export default Support;
