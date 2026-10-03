"use client";
import Link from "next/link";
import Image from "next/image";
import { useRef, useEffect, useState, useCallback } from "react";

export default function Home() {
  const sliderRef = useRef(null);
  const timerRef = useRef(null);

  // 拖拽相关
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const scrollStartRef = useRef(0);
  const velocityRef = useRef(0);
  const lastXRef = useRef(0);
  const lastTimeRef = useRef(0);
  const [isDragging, setIsDragging] = useState(false);

  const [percent, setPercent] = useState(0);

  const productList = [
    { name: "Perfume", img: "/img/perfume.jpg", href: "/parfum" },
    { name: "Smart Phone", img: "/img/phone.jpg", href: "/telephone" },
    { name: "Watch", img: "/img/watch.jpg", href: "/watch" },
    { name: "Sunglasses", img: "/img/sunglass.jpg", href: "/sunglass" },
    { name: "Charger", img: "/img/charger.jpg", href: "/charger" },
  ];
  // 克隆商品数组，实现无缝循环
  const loopProductList = [...productList, ...productList];
  const singleGroupWidthRef = useRef(0);

  // 循环校正：滚动超过一组宽度瞬间回滚，视觉无限
  const loopCorrection = useCallback(() => {
    if (!sliderRef.current || singleGroupWidthRef.current === 0) return;
    const el = sliderRef.current;
    const scrollVal = el.scrollLeft;
    const w = singleGroupWidthRef.current;

    if (scrollVal >= w) {
      el.scrollLeft = scrollVal - w;
    } else if (scrollVal <= 0) {
      el.scrollLeft = scrollVal + w;
    }
    const p = ((el.scrollLeft % w) / w) * 100;
    setPercent(isNaN(p) ? 0 : p);
  }, []);

  // 自动环绕播放
  const startAutoPlay = useCallback(() => {
    stopAutoPlay();
    timerRef.current = setInterval(() => {
      if (!sliderRef.current || isDraggingRef.current) return;
      sliderRef.current.scrollLeft += 1;
      loopCorrection();
    }, 16);
  }, [loopCorrection]);

  const stopAutoPlay = () => clearInterval(timerRef.current);

  // 惯性滑行动画
  const runInertia = useCallback(() => {
    if (!sliderRef.current) return;
    const el = sliderRef.current;
    let v = velocityRef.current;
    const friction = 0.93;

    const animate = () => {
      v *= friction;
      if (Math.abs(v) < 0.4) return;
      el.scrollLeft += v;
      loopCorrection();
      requestAnimationFrame(animate);
    };
    requestAnimationFrame(animate);
  }, [loopCorrection]);

  // 拖拽事件
  const handleMouseDown = (e) => {
    isDraggingRef.current = true;
    setIsDragging(true);
    stopAutoPlay();
    startXRef.current = e.clientX;
    lastXRef.current = e.clientX;
    lastTimeRef.current = Date.now();
    scrollStartRef.current = sliderRef.current.scrollLeft;
    velocityRef.current = 0;
    sliderRef.current.style.scrollBehavior = "auto";
  };
  const handleMouseMove = (e) => {
    if (!isDraggingRef.current) return;
    const now = Date.now();
    const dt = now - lastTimeRef.current;
    const dx = e.clientX - lastXRef.current;
    velocityRef.current = (dx / dt) * 16;
    lastXRef.current = e.clientX;
    lastTimeRef.current = now;

    const moveX = e.clientX - startXRef.current;
    sliderRef.current.scrollLeft = scrollStartRef.current - moveX;
    loopCorrection();
  };
  const handleMouseUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    setIsDragging(false);
    runInertia();
    sliderRef.current.style.scrollBehavior = "smooth";
  };
  const handleMouseLeave = () => {
    if (isDraggingRef.current) handleMouseUp();
  };

  // 箭头切换
  const slideLeft = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: -300, behavior: "smooth" });
    setTimeout(loopCorrection, 300);
  };
  const slideRight = () => {
    if (!sliderRef.current) return;
    sliderRef.current.scrollBy({ left: 300, behavior: "smooth" });
    setTimeout(loopCorrection, 300);
  };

  // 计算单组商品总宽度
  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const calcSingleWidth = () => {
      const itemDom = el.querySelector("a");
      if (itemDom) {
        singleGroupWidthRef.current = itemDom.offsetWidth * productList.length + 24 * (productList.length - 1);
      }
    };
    calcSingleWidth();
    window.addEventListener("resize", calcSingleWidth);

    startAutoPlay();

    return () => {
      window.removeEventListener("resize", calcSingleWidth);
      stopAutoPlay();
    };
  }, [startAutoPlay]);

  return (
    <main style={{ fontFamily: "sans-serif" }}>
      {/* 左上角品牌 BoxGoods */}
      <div
        style={{
          position: "fixed",
          top: "24px",
          left: "32px",
          zIndex: 99,
          fontSize: "24px",
          fontWeight: "700",
          color: "#000",
          letterSpacing: "1px",
          cursor: "pointer",
          transition: "all 0.3s cubic-bezier(0.25,0.8,0.25,1)",
        }}
        onMouseEnter={(e) => {
          e.target.style.transform = "scale(1.05) translateX(3px)";
          e.target.style.color = "#f27835";
        }}
        onMouseLeave={(e) => {
          e.target.style.transform = "scale(1) translateX(0)";
          e.target.style.color = "#000";
        }}
      >
        BoxGoods
      </div>

      {/* Hero区域 */}
      <section
        style={{
          width: "100%",
          height: "100vh",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#f29349",
          overflow: "hidden",
        }}
      >
        <Image
          src="/img/heromain.png"
          alt="hero"
          fill
          style={{ objectFit: "cover" }}
          priority
        />
        <div style={{ zIndex: 2, textAlign: "center", marginTop: "-180px" }}>
          <h1 style={{ fontSize: "72px", lineHeight: 0.9, margin: "0 0 20px" }}>
            Be ready<br />for every moment
          </h1>
          <p style={{ marginBottom: "32px", opacity: 0.8, fontSize: "18px" }}>
            Premium small goods for your daily life
          </p>
          {/* Shop now 按钮 */}
          <Link href="/categories" style={{ textDecoration: "none" }}>
            <button
              style={{
                backgroundColor: "#000",
                color: "#fff",
                padding: "14px 32px",
                borderRadius: "999px",
                border: "none",
                fontSize: "16px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: "8px",
                margin: "0 auto",
                transition: "all 0.3s cubic-bezier(0.25,0.8,0.25,1)",
                boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#222222";
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#000";
                e.target.style.transform = "translateY(0px)";
                e.target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
              }}
              onMouseDown={(e) => {
                e.target.style.transform = "translateY(1px)";
                e.target.style.boxShadow = "0 2px 8px rgba(0,0,0,0.2)";
              }}
              onMouseUp={(e) => {
                e.target.style.transform = "translateY(-3px)";
                e.target.style.boxShadow = "0 6px 18px rgba(0,0,0,0.25)";
              }}
            >
              Shop now <span>›</span>
            </button>
          </Link>
        </div>
      </section>

      {/* New arrivals 拖拽无限循环轮播 */}
      <section style={{ padding: "60px 40px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "32px" }}>
          <h2 style={{ fontSize: "28px", margin: 0 }}>New arrivals</h2>
          <div style={{ display: "flex", gap: "12px" }}>
            <button
              onClick={slideLeft}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#f27835",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.25,0.8,0.25,1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e06c2c";
                e.target.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f27835";
                e.target.style.transform = "scale(1)";
              }}
            >
              &lt;
            </button>
            <button
              onClick={slideRight}
              style={{
                width: "44px",
                height: "44px",
                borderRadius: "999px",
                border: "none",
                backgroundColor: "#f27835",
                color: "#fff",
                fontSize: "20px",
                cursor: "pointer",
                transition: "all 0.25s cubic-bezier(0.25,0.8,0.25,1)",
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#e06c2c";
                e.target.style.transform = "scale(1.08)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#f27835";
                e.target.style.transform = "scale(1)";
              }}
            >
              &gt;
            </button>
          </div>
        </div>

        <div
          ref={sliderRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{
            display: "flex",
            gap: "24px",
            overflowX: "auto",
            scrollBehavior: "smooth",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            WebkitOverflowScrolling: "touch",
            cursor: isDragging ? "grabbing" : "grab",
            userSelect: isDragging ? "none" : "auto",
          }}
        >
          <style jsx global>{`
            div::-webkit-scrollbar { display: none; }
          `}</style>
          {loopProductList.map((item, idx) => (
            <Link
              key={idx}
              href={item.href}
              style={{
                minWidth: "280px",
                textDecoration: "none",
                color: "#000",
                transition: "transform 0.35s cubic-bezier(0.25,0.8,0.25,1), box-shadow 0.35s ease",
              }}
              onMouseEnter={(e) => {
                if (!isDragging) {
                  e.target.style.transform = "translateY(-10px)";
                  e.target.style.boxShadow = "0 12px 24px rgba(0,0,0,0.08)";
                }
              }}
              onMouseLeave={(e) => {
                e.target.style.transform = "translateY(0)";
                e.target.style.boxShadow = "none";
              }}
            >
              <div
                style={{
                  background: "#f3f3f3",
                  padding: "20px",
                  height: "320px",
                  borderRadius: "16px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image src={item.img} alt={item.name} width={180} height={180} style={{ objectFit: "contain" }} />
                <p style={{ marginTop: "16px", fontSize: "18px" }}>{item.name}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* 进度条 */}
        <div style={{ width: "100%", height: "5px", background: "#e6e6e6", borderRadius: "999px", marginTop: "24px" }}>
          <div style={{ width: `${percent}%`, height: "100%", background: "#f27835", borderRadius: "999px", transition: "width 0.3s cubic-bezier(0.25,0.8,0.25,1)" }}></div>
        </div>
      </section>
    </main>
  );
}
