'use client';
import Link from 'next/link'
const categoryList = [
  { label: "香水", href: "/parfum" },
  { label: "手机", href: "/telephone" },
  { label: "腕表", href: "/watch" },
  { label: "太阳镜", href: "/sunglass" },
  { label: "充电设备", href: "/charger" }
]
export default function CategoriesPage() {
  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      fontFamily: "sans-serif",
      padding: "20px",
      backgroundColor: "#f5f5f5" // 浅灰色背景
    }}>
      <h1 style={{fontSize:"42px", marginBottom:"40px",color:"#222"}}>商品分类</h1>
      <div style={{
        display:'flex',
        gap:'24px',
        flexWrap:'wrap',
        justifyContent:"center"
      }}>
        {categoryList.map((item,i)=>(
          <Link 
            key={i} 
            href={item.href}
            style={{textDecoration:"none"}}
          >
            <div style={{
              border:'1px solid #ccc',
              padding:'16px 32px',
              borderRadius:"10px",
              fontSize:"18px",
              color:"#222",
              cursor:"pointer",
              transition: "all 0.25s ease",
              backgroundColor:"#fff"
            }}
            onMouseEnter={(e)=>{
              e.target.style.transform = "scale(1.08)";
              e.target.style.backgroundColor = "#f27c38";
              e.target.style.color = "#fff";
              e.target.style.borderColor = "#f27c38";
              e.target.style.boxShadow = "0 4px 12px rgba(242,124,56,0.3)";
            }}
            onMouseLeave={(e)=>{
              e.target.style.transform = "scale(1)";
              e.target.style.backgroundColor = "#fff";
              e.target.style.color = "#222";
              e.target.style.borderColor = "#ccc";
              e.target.style.boxShadow = "none";
            }}
            >
              {item.label}
            </div>
          </Link>
        ))}
      </div>
      {/* 返回首页按钮 */}
      <Link href="/" style={{
        marginTop:"40px",
        color:"#666",
        textDecoration:"none",
        fontSize:"16px"
      }}>← 返回首页</Link>
    </div>
  )
}
