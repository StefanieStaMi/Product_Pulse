import { ImageResponse } from 'next/og'

export const alt = 'Product Pulse — Fractional Product Leadership for HRTech Startups'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

export default function Image() {
  return new ImageResponse(
    <div style={{background:'#151515',color:'#f7f5f1',width:'100%',height:'100%',display:'flex',flexDirection:'column',justifyContent:'space-between',padding:'64px',fontFamily:'Arial'}}>
      <div style={{fontSize:28,fontWeight:700}}>Product Pulse<span style={{color:'#ffcf56'}}>●</span></div>
      <div>
        <div style={{fontSize:24,color:'#a6a19a',marginBottom:20}}>Fractional Product Leadership · HRTech</div>
        <div style={{fontSize:74,fontWeight:800,lineHeight:1,letterSpacing:'-0.06em',maxWidth:950}}>Product leadership for founders who need momentum.</div>
      </div>
      <div style={{fontSize:22,color:'#c8c3bb'}}>Strategy · Execution · Product Ops</div>
    </div>,
    size
  )
}
