'use client'
import { useState } from 'react'

export default function Contact() {
  const [data,setData] = useState({name:'',email:'',company:'',product:'',qty:'',msg:''})

  const submit = async(e)=>{
    e.preventDefault()
    alert('Inquiry sent successfully! We will reply within 24 hours.')
    setData({name:'',email:'',company:'',product:'',qty:'',msg:''})
  }

  return (
    <div style={box}>
      <h1>Get Free Wholesale Inquiry</h1>
      <p style={tip}>Leave your information, we will send you quotation ASAP</p >
      <form onSubmit={submit} style={form}>
        <input placeholder="Your Name" value={data.name} onChange={e=>setData({...data,name:e.target.value})} required style={input}/>
        <input placeholder="Your Email" value={data.email} onChange={e=>setData({...data,email:e.target.value})} required style={input}/>
        <input placeholder="Company Name" value={data.company} onChange={e=>setData({...data,company:e.target.value})} style={input}/>
        <input placeholder="Interested Product" value={data.product} onChange={e=>setData({...data,product:e.target.value})} style={input}/>
        <input placeholder="Quantity" value={data.qty} onChange={e=>setData({...data,qty:e.target.value})} style={input}/>
        <textarea placeholder="Your Custom Requirement / Message" rows={4} value={data.msg} onChange={e=>setData({...data,msg:e.target.value})} style={textarea}/>
        <button type="submit" style={btn}>Send Inquiry</button>
      </form>
    </div>
  )
}

const box = {maxWidth:'700px',margin:'0 auto'}
const tip = {color:'#666',textAlign:'center'}
const form = {display:'flex',flexDirection:'column',gap:'15px',marginTop:'30px'}
const input = {padding:'12px',border:'1px solid #ddd',borderRadius:'6px'}
const textarea = {padding:'12px',border:'1px solid #ddd',borderRadius:'6px'}
const btn = {padding:'14px',background:'#000',color:'#fff',border:'none',borderRadius:'6px',fontSize:'16px'}