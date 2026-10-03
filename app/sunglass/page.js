'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
const brandList = [
  { name: "Ray-Ban", logo: "/img/logo-rayban.jpg" },
  { name: "Bolon", logo: "/img/logo-bolon.jpg" },
  { name: "Prsr", logo: "/img/logo-prsr.jpg" },
  { name: "Helen Keller", logo: "/img/logo-hk.jpg" },
  { name: "Mujiosh", logo: "/img/logo-mujosh.jpg" }
];

// 造型分类 5个
const styleList = [
  "Cool & Stylish",
  "Trendy & Versatile",
  "Minimal Commute",
  "Vintage Art",
  "Sports Outdoor"
];

// 生成每个品牌50条太阳镜商品数据，循环分配造型
const generateBrandProducts = (brandName) => {
  const list = [];
  for(let i=1;i<=50;i++){
    const styleIndex = (i-1) % styleList.length;
    list.push({
      id: `${brandName}-${i}`,
      name: `${brandName} Sunglasses ${i}`,
      style: styleList[styleIndex],
      img: `/img/${brandName}${i}.jpg`,
      params:{
        "Lens":"Polarized Resin",
        "Frame":"TR90",
        "Color":"Multiple Options",
        "UV Protection":"UV400",
        "Origin":"China"
      }
    })
  }
  return list;
}
const productData = {
  "Ray-Ban": generateBrandProducts("Ray-Ban"),
  "Bolon": generateBrandProducts("Bolon"),
  "Prsr": generateBrandProducts("Prsr"),
  "Helen Keller": generateBrandProducts("Helen Keller"),
  "Mujiosh": generateBrandProducts("Mujiosh"),
};
export default function SunglassPage() {
  const [activeStyle, setActiveStyle] = useState(styleList[0]);
  const [selectedItem, setSelectedItem] = useState(null);
  const pageScrollRef = useRef(0);
  const openDetail = (item) => {
    pageScrollRef.current = window.scrollY;
    setSelectedItem(item);
  };
  const closeDetail = () => {
    setSelectedItem(null);
    setTimeout(()=>{
      window.scrollTo(0, pageScrollRef.current);
    },0);
  };

  // 合并所有商品，按选中造型筛选
  const allProducts = Object.values(productData).flat();
  const currentProducts = allProducts.filter(item => item.style === activeStyle);

  return (
    <div style={{display:'flex', height:'100vh', overflow:'hidden'}}>
      {/* 左侧改为造型分类，去掉圆圈图片 */}
      <div style={{width:'200px',padding:'24px',borderRight:'1px solid #eee',flexShrink:0,overflowY:'auto'}}>
        {/* 返回分类页面按钮 */}
        <Link href="/categories" style={{
          display:"inline-block",
          marginBottom:"20px",
          padding:"8px 12px",
          backgroundColor:"#f27c38",
          color:"#fff",
          borderRadius:"6px",
          textDecoration:"none",
          fontSize:"14px",
          transition:"all 0.25s ease"
        }}
        onMouseEnter={(e)=>{
          e.target.style.backgroundColor="#dd6b28";
        }}
        onMouseLeave={(e)=>{
          e.target.style.backgroundColor="#f27c38";
        }}
        >
          ← Back to Categories
        </Link>
        <h3 style={{marginTop:0}}>Style Category</h3>
        {styleList.map(style=>(
          <div
            key={style}
            onClick={()=>setActiveStyle(style)}
            style={{
              padding:'12px',
              margin:'8px 0',
              cursor:'pointer',
              backgroundColor:activeStyle===style ? '#0066ff':'#f3f4f6',
              color:activeStyle===style ? '#fff':'#222',
              borderRadius:'8px',
              transition:"all 0.25s ease"
            }}
            onMouseEnter={(e)=>{
              if(activeStyle !== style){
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
              }
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {style}
          </div>
        ))}
      </div>
      {/* 右侧商品区域 */}
      <div style={{flex:1, padding:'24px', display:'flex', flexDirection:'column'}}>
        <h2 style={{margin:'0 0 20px 0'}}>{activeStyle} Sunglasses ({currentProducts.length} Items)</h2>
        <div style={{flex:1, overflowY:'auto'}}>
          <div style={{
            display:'grid',
            gridTemplateColumns:'repeat(5, minmax(0, 1fr))',
            gap:'24px'
          }}>
            {currentProducts.map(item=>(
              <div
                key={item.id}
                onClick={()=>openDetail(item)}
                style={{
                  border:'1px solid #eee',
                  borderRadius:'10px',
                  overflow:'hidden',
                  cursor:'pointer',
                  display:'flex',
                  flexDirection:'column',
                  minHeight:'300px',
                  backgroundColor:"#fff",
                  transition:"all 0.3s cubic-bezier(0.4,0,0.2,1)"
                }}
                onMouseEnter={(e)=>{
                  e.currentTarget.style.transform = "translateY(-6px) scale(1.02)";
                  e.currentTarget.style.boxShadow = "0 10px 20px rgba(0,0,0,0.12)";
                }}
                onMouseLeave={(e)=>{
                  e.currentTarget.style.transform = "translateY(0) scale(1)";
                  e.currentTarget.style.boxShadow = "none";
                }}
              >
                <img
                  src={item.img}
                  alt={item.name}
                  style={{width:'100%',height:'230px',objectFit:'cover',display:'block'}}
                />
                {/* 卡片底部文字已移除 */}
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 弹窗详情 */}
      {selectedItem && (
        <div
          onClick={closeDetail}
          style={{
            position:'fixed',
            inset:0,
            backgroundColor:'rgba(0,0,0,0.6)',
            display:'flex',
            alignItems:'center',
            justifyContent:'center',
            zIndex:999
          }}
        >
          <div
            onClick={(e)=>e.stopPropagation()}
            style={{
              background:'white',
              width:'620px',
              padding:'32px',
              borderRadius:'14px',
              transition:"all 0.25s ease"
            }}
          >
            <h2 style={{margin:"0 0 16px 0"}}>{selectedItem.name}</h2>
            <img
              src={selectedItem.img}
              alt={selectedItem.name}
              style={{width:'100%',maxHeight:'400px',objectFit:'contain',borderRadius:"8px"}}
            />
            <div style={{marginTop:'24px'}}>
              <h3 style={{margin:"0 0 12px 0"}}>Specifications</h3>
              {Object.entries(selectedItem.params).map(([key,val])=>(
                <div key={key} style={{display:'flex',padding:'8px 0',borderBottom:'1px solid #eee'}}>
                  <div style={{width:'120px',fontWeight:'bold'}}>{key}</div>
                  <div>{val}</div>
                </div>
              ))}
            </div>
            <button
              onClick={closeDetail}
              style={{
                marginTop:'28px',
                padding:'12px 22px',
                border:'none',
                background:'#0066ff',
                color:'white',
                borderRadius:'8px',
                cursor:'pointer',
                transition:"background 0.25s ease"
              }}
              onMouseEnter={(e)=>e.target.style.background="#0052d9"}
              onMouseLeave={(e)=>e.target.style.background="#0066ff"}
            >
              Back to List
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
