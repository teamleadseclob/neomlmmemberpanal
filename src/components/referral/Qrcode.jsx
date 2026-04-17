import { QRCodeSVG } from 'qrcode.react'

function QRCodeGenerator() {
  const url = 'https://seclob.com'

  return (
    <div className="inline-flex flex-col items-center gap-2">
      <div className="p-3 rounded-xl border border-[#1e1e3a] bg-[#0d0b2e]">
        <QRCodeSVG
          value={url}
          size={140}
          bgColor="#12122a"
          fgColor="#E8E8F0"
          level="H"
          includeMargin={false}
        />
      </div>
      <p className="text-[10px] text-gray-600 tracking-widest uppercase">Scan to join</p>
    </div>
  )
}

export default QRCodeGenerator
