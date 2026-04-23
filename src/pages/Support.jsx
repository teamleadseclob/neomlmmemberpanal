import {
  SupportHeader,
  TicketStats,
  RaiseTicket,
  SupportHistory,
  ElitePrivilege,
  FaqQuickLinks,
  SystemsStatus,
} from '../components/support';

function Support() {
  return (
    <div className="max-w-[1200px] mx-auto">
      {/* Page header */}
      <SupportHeader />

      {/* Ticket stats row */}
      <TicketStats />

      {/* Main content: Left (form + history) | Right (privilege + FAQ + status) */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
        {/* Left column */}
        <div className="lg:col-span-3 flex flex-col gap-4">
          <RaiseTicket />
          <SupportHistory />
        </div>

        {/* Right column */}
        <div className="lg:col-span-2 flex flex-col gap-4">
          <ElitePrivilege />
          <FaqQuickLinks />
          <SystemsStatus />
        </div>
      </div>
    </div>
  );
}

export default Support;
