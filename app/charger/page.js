'use client';
import { useState, useRef } from 'react';
import Link from 'next/link';
const brandList = [
  { name: "绿联", logo: "/img/logo-lvlian.jpg" },
  { name: "倍思", logo: "/img/logo-baseus.jpg" },
  { name: "安克", logo: "/img/logo-anker.jpg" },
  { name: "小米", logo: "/img/logo-xiaomi.jpg" },
  { name: "华为", logo: "/img/logo-huawei.jpg" }
];
// 生成每个品牌50条充电设备商品数据
const generateBrandProducts = (brandName) => {
  const list = [];
  for(let i=1;i<=50;i++){
    list.push({
      id: `${brandName}-${i}`,
      name: `${brandName}充电器${i}`,
      img: `/img/${brandName}${i}.jpg`,
      params:{
        "功率":"65W",
        "接口":"Type-C+USB-A",
        "材质":"PC阻燃外壳",
        "特性":"氮化镓快充",
        "产地":"China"
      }
    })
  }
  return list;
}
const productData = {
  "绿联": generateBrandProducts("绿联"),
  "倍思": generateBrandProducts("倍思"),
  "安克": generateBrandProducts("安克"),
  "小米": generateBrandProducts("小米"),
  "华为": generateBrandProducts("华为"),
};
export default function ChargerPage() {
  const [activeBrand, setActiveBrand] = useState("绿联");
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
      {/* 左侧品牌栏 */}
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
            {/* 品牌Logo占位图 */}
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
      {/* 右侧商品区域 */}
      <div style={{flex:1, padding:'24px', display:'flex', flexDirection:'column'}}>
        <div style={{display:"flex",alignItems:"center",gap:"14px",margin:'0 0 20px 0'}}>
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
          <h2 style={{margin:0}}>{activeBrand}充电器（共{currentProducts.length}款）</h2>
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
