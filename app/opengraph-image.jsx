import { ImageResponse } from 'next/og'

export const alt = 'Product Pulse — Fractional Product Leadership for HRTech Startups'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '72px',
          background: '#f4efe5',
          color: '#111111',
          fontFamily: 'Arial',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', fontSize: 30, fontWeight: 700 }}>
          <span>Product Pulse</span>
          <span
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: '#111111',
              marginLeft: 10,
            }}
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24, maxWidth: 980 }}>
          <div style={{ fontSize: 70, lineHeight: 1.04, fontWeight: 800 }}>
            Make the product work harder for the business.
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.35, color: '#5f5a52', maxWidth: 860 }}>
            Fractional Product Leadership for HRTech Startups
          </div>
        </div>

        <div style={{ display: 'flex', fontSize: 22, color: '#5f5a52' }}>
          Stefanie Stanislawski · Product strategy · Product leadership · Product operations
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
