export default function Home() {
  return (
    <div style={container}>
      <h1>Custom Small Goods Wholesale</h1>
      <h2>OEM & ODM Custom Packaging & Metal Container Manufacturer</h2>
      <p style={pStyle}>
        We provide high-quality daily small goods, metal storage boxes, packaging supplies and hardware accessories.
        Support custom logo, custom size, OEM & ODM service. Global wholesale shipping.
      </p >
      <div style={btnBox}>
        < a href=" " style={btnStyle}>View Products</ a>
        < a href="/contact" style={btnStyle}>Get Free Quote</ a>
      </div>

      <div style={advantageBox}>
        <div className="item">✅ Custom Logo Accepted</div>
        <div className="item">✅ OEM / ODM Service</div>
        <div className="item">✅ Fast Delivery</div>
        <div className="item">✅ Worldwide Shipping</div>
        <div className="item">✅ Sample Support</div>
      </div>
    </div>
  )
}

const container = {maxWidth:'1200px',margin:'0 auto',textAlign:'center'}
const pStyle = {fontSize:'18px',color:'#666',lineHeight:'1.8'}
const btnBox = {margin:'40px 0',display:'flex',gap:'20px',justifyContent:'center'}
const btnStyle = {
  padding:'14px 28px',
  background:'#0070f3',
  color:'#fff',
  borderRadius:'8px',
  textDecoration:'none'
}
const advantageBox = {
  display:'grid',
  gridTemplateColumns:'repeat(3,1fr)',
  gap:'15px',
  marginTop:'60px'
}