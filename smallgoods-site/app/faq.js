export default function Faq() {
  return (
    <div style={box}>
      <h1>FAQ — Frequently Asked Questions</h1>

      <div style={item}>
        <h3>1. What is OEM & ODM service?</h3>
        <p><strong>ODM:</strong> Choose our existing products, we print your own logo. Low cost & fast delivery.</p >
        <p><strong>OEM:</strong> Custom new size, new shape or new design according to your drawings or samples.</p >
      </div>

      <div style={item}>
        <h3>2. Can I get free samples?</h3>
        <p>Yes, we support sample checking. Customers only need to pay the shipping fee.</p >
      </div>

      <div style={item}>
        <h3>3. What is your MOQ?</h3>
        <p>Low MOQ for custom logo products. Negotiable for large wholesale orders.</p >
      </div>

      <div style={item}>
        <h3>4. How long is production time?</h3>
        <p>Standard order: 7–15 days. Custom OEM order: 15–25 days.</p >
      </div>

      <div style={item}>
        <h3>5. Do you support worldwide shipping?</h3>
        <p>Yes, we ship to Europe, America, Southeast Asia and all over the world.</p >
      </div>
    </div>
  )
}

const box = {maxWidth:'900px',margin:'0 auto'}
const item = {margin:'30px 0',paddingBottom:'20px',borderBottom:'1px solid #eee'}