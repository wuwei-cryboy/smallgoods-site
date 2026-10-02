export default function Products() {
  const productList = [
    {name:"Metal Storage Box",desc:"Stainless steel custom box, support logo engraving",img:"/images/box.jpg"},
    {name:"Packaging Supplies",desc:"Custom printed packaging for daily goods",img:"/images/pack.jpg"},
    {name:"Hardware Accessories",desc:"Small hardware custom wholesale",img:"/images/hardware.jpg"}
  ]

  return (
    <div style={container}>
      <h1>Our Products</h1>
      <p style={subText}>All items support OEM & ODM custom service</p >
      <div style={grid}>
        {productList.map((item,idx)=>(
          <div key={idx} style={card}>
            <div style={imgBox}>Product Image</div>
            <h3>{item.name}</h3>
            <p>{item.desc}</p >
          </div>
        ))}
      </div>
    </div>
  )
}

const container = {maxWidth:'1200px',margin:'0 auto'}
const subText = {textAlign:'center',color:'#777'}
const grid = {display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:'30px',marginTop:'40px'}
const card = {border:'1px solid #eee',padding:'20px',borderRadius:'12px'}
const imgBox = {height:'180px',background:'#f5f5f5',borderRadius:'8px',marginBottom:'15px',display:'flex',alignItems:'center',justifyContent:'center',color:'#999'}