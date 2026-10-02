export default function About() {
  return (
    <div style={box}>
      <h1>About Us</h1>
      <p style={text}>
        We are a professional manufacturer and wholesaler of daily small goods, metal containers and packaging products.
        With rich OEM & ODM customization experience, we can customize size, logo, surface treatment and packaging according to customer requirements.
      </p >
      <p style={text}>
        We support global wholesale, stable supply, fast production cycle and strict quality inspection.
        Provide free sample service for bulk order customers.
      </p >
      <h2>Our Service</h2>
      <ul style={ul}>
        <li>ODM: Custom logo on our existing products</li>
        <li>OEM: Custom size, shape and design</li>
        <li>Wholesale bulk shipping worldwide</li>
        <li>Professional after-sale service</li>
      </ul>
    </div>
  )
}

const box = {maxWidth:'900px',margin:'0 auto'}
const text = {fontSize:'17px',lineHeight:'1.9',color:'#555'}
const ul = {lineHeight:'2.2',fontSize:'17px'}