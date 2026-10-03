'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
const brandList = [
  { name: "迪奥", logo: "/img/logo-dior.jpg" },
  { name: "香奈儿", logo: "/img/logo-chanel.jpg" },
  { name: "伊斯兰·斯利", logo: "/img/logo-islamic.jpg" },
  { name: "古驰", logo: "/img/logo-gucci.jpg" },
  { name: "范思哲", logo: "/img/logo-versace.jpg" }
];
// 生成每个品牌50条商品数据
const generateBrandProducts = (brandName) => {
  const list = [];
  for(let i=1;i<=50;i++){
    list.push({
      id: `${brandName}-${i}`,
      name: `${brandName}香水${i}`,
      img: `/img/${brandName}${i}.jpg`,
      params:{
        "容量":"100ml",
        "香型":"木质花香调",
        "包装":"精品盒装",
        "MOQ":"10pcs",
        "产地":"China"
      }
    })
  }
  return list;
}
const productData = {
  "迪奥": generateBrandProducts("迪奥"),
  "香奈儿": generateBrandProducts("香奈儿"),
  "伊斯兰·斯利": generateBrandProducts("伊斯兰·斯利"),
  "古驰": generateBrandProducts("古驰"),
  "范思哲": generateBrandProducts("范思哲"),
};
export default function ParfumPage() {
  const [activeBrand, setActiveBrand] = useState("迪奥");
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
  const currentProducts = productData[activeBrand];
  // 获取当前选中品牌的logo
  const currentBrandInfo = brandList.find(b => b.name === activeBrand);

  return (
    <div style={{display:'flex', height:'100vh', overflow:'hidden'}}>
      {/* 左侧品牌栏，固定不动，增加品牌图片+hover交互 */}
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
          ← 返回商品分类
        </Link>
        <h3 style={{marginTop:0}}>品牌</h3>
        {brandList.map(brand=>(
          <div
            key={brand.name}
            onClick={()=>setActiveBrand(brand.name)}
            style={{
              display:"flex",
              alignItems:"center",
              gap:"10px",
              padding:'12px',
              margin:'8px 0',
              cursor:'pointer',
              backgroundColor:activeBrand===brand.name ? '#0066ff':'#f3f4f6',
              color:activeBrand===brand.name ? '#fff':'#222',
              borderRadius:'8px',
              transition:"all 0.25s ease"
            }}
            onMouseEnter={(e)=>{
              if(activeBrand !== brand.name){
                e.currentTarget.style.transform = "translateX(4px)";
                e.currentTarget.style.boxShadow = "0 3px 8px rgba(0,0,0,0.1)";
              }
            }}
            onMouseLeave={(e)=>{
              e.currentTarget.style.transform = "translateX(0)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            {/* 品牌Logo占位图，后续替换图片 */}
            <div style={{
              width:"32px",
              height:"32px",
              borderRadius:"50%",
              overflow:"hidden",
              backgroundColor:"#fff"
            }}>
              <img
                src={brand.logo}
                alt={brand.name}
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={(e)=>{
                  e.currentTarget.style.display = "none";
                }}
              />
            </div>
            <span>{brand.name}</span>
          </div>
        ))}
      </div>
      {/* 右侧区域：标题固定，商品列表独立滚动 */}
      <div style={{flex:1, padding:'24px', display:'flex', flexDirection:'column'}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px",margin:'0 0 20px 0'}}>
          {/* 当前品牌大图标识 */}
          {currentBrandInfo && (
            <div style={{width:"48px",height:"48px",borderRadius:"50%",overflow:"hidden",background:"#eee"}}>
              <img
                src={currentBrandInfo.logo}
                alt={activeBrand}
                style={{width:"100%",height:"100%",objectFit:"cover"}}
                onError={(e)=>e.currentTarget.style.display="none"}
              />
            </div>
          )}
          <h2 style={{margin:0}}>{activeBrand}香水（共{currentProducts.length}款）</h2>
        </div>
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
                <p style={{textAlign:'center',margin:'10px 0',fontSize:'14px',padding:'0 6px'}}>{item.name}</p >
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
              <h3 style={{margin:"0 0 12px 0"}}>产品参数</h3>
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
              返回产品列表
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
