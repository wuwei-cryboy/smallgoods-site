'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
const brandList = [
  { name: "Dior", logo: "/img/logo-dior.jpg" },
  { name: "Chanel", logo: "/img/logo-chanel.jpg" },
  { name: "Islamic Slay", logo: "/img/logo-islamic.jpg" },
  { name: "Gucci", logo: "/img/logo-gucci.jpg" },
  { name: "Versace", logo: "/img/logo-versace.jpg" }
];

// 香型池，循环随机分配
const scentList = [
  "Woody Floral Fragrance",
  "Citrus Aromatic",
  "Oriental Spicy",
  "Fresh Aquatic",
  "Fruity Sweet",
  "Soft Musk",
  "Amber Vanilla",
  "Green Herbal",
  "Powdery Floral",
  "Smoky Woody"
];

// 生成每个品牌50条商品数据，去掉商品编号，香型循环轮换
const generateBrandProducts = (brandName) => {
  const list = [];
  for(let i=1;i<=50;i++){
    list.push({
      id: `${brandName}-${i}`,
      name: `${brandName} Perfume`,
      img: `/img/${brandName}${i}.jpg`,
      params:{
        "Volume":"100ml",
        "Scent": scentList[(i-1) % scentList.length],
        "Package":"Premium Box",
        "MOQ":"10pcs",
        "Origin":"China"
      }
    })
  }
  return list;
}

const productData = {
  "Dior": generateBrandProducts("Dior"),
  "Chanel": generateBrandProducts("Chanel"),
  "Islamic Slay": generateBrandProducts("Islamic Slay"),
  "Gucci": generateBrandProducts("Gucci"),
  "Versace": generateBrandProducts("Versace"),
};

export default function ParfumPage() {
  const [activeScent, setActiveScent] = useState(scentList[0]);
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

  // 全部商品合并，然后按选中香型筛选
  const allProducts = Object.values(productData).flat();
  const currentProducts = allProducts.filter(item => item.params.Scent === activeScent);

  return (
    <div style={{display:'flex', height:'100vh', overflow:'hidden'}}>
      {/* 左侧改为香型栏，移除圆圈图片 */}
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
        <h3 style={{marginTop:0}}>Scent Types</h3>
        {scentList.map(scent=>(
          <div
            key={scent}
            onClick={()=>setActiveScent(scent)}
            style={{
              padding:'12px',
              margin:'8px 0',
              cursor:'pointer',
              backgroundColor:activeScent===scent ? '#0066ff':'#f3f4f6',
              color:activeScent===scent ? '#fff':'#222',
              borderRadius:'8px',
              transition:"all 0.25s ease"
            }}
            onMouseEnter={(e)=>{
              if(activeScent !== scent){
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
              }
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {scent}
          </div>
        ))}
      </div>
      {/* 右侧区域：标题固定，商品列表独立滚动 */}
      <div style={{flex:1, padding:'24px', display:'flex', flexDirection:'column'}}>
        <h2 style={{margin:0, marginBottom:"20px"}}>{activeScent} Perfume ({currentProducts.length} Items)</h2>
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
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* 产品弹窗 */}
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
              <h3 style={{margin:"0 0 12px 0"}}>Product Specs</h3>
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
