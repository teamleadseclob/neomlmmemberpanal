function PlaceholderPage({ title }) {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-purple-500/15 flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M11.42 15.17 17.25 21A2.652 2.652 0 0 0 21 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 1 1-3.586-3.586l5.653-4.655m5.014-2.024-.001-.002a9.822 9.822 0 0 1 .29-1.726c.293-1.108.764-2.314 1.569-3.252.845-.985 2.012-1.676 3.556-1.676 1.084 0 2.058.413 2.82.998.37.285.697.617.968.99A4.727 4.727 0 0 1 24 8.455c0 1.544-.691 2.711-1.676 3.556-.938.805-2.144 1.276-3.252 1.57a9.777 9.777 0 0 1-1.726.289" />
          </svg>
        </div>
        <h2 className="text-xl font-bold text-white mb-2">{title}</h2>
        <p className="text-sm text-gray-500">This page is under construction.</p>
      </div>
    </div>
  );
}

export default PlaceholderPage;
