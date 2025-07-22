function calculateTotal() {
  const jobValue = parseFloat(document.getElementById("jobValue").value);
  const method = document.getElementById("paymentMethod").value;
  const discountPercent = parseFloat(
    document.getElementById("discount").value || 0
  );
  const deposit = parseFloat(document.getElementById("deposit").value || 0);

  if (isNaN(jobValue) || jobValue <= 0) {
    alert("Please enter a valid job value.");
    return;
  }

  const gst = jobValue * 0.1;
  const discount = jobValue * (discountPercent / 100);
  let surcharge = 0;

  if (method === "card") {
    const baseTotal = jobValue + gst - discount;
    surcharge = baseTotal * 0.022;
  }

  const total = jobValue + gst - discount + surcharge - deposit;

  document.getElementById("result").innerHTML = `
      <strong>Total to Collect:</strong> $${total.toFixed(2)}<br/>
      <ul>
        <li>Job Value: $${jobValue.toFixed(2)}</li>
        <li>GST (10%): $${gst.toFixed(2)}</li>
        <li>Discount (${discountPercent}%): -$${discount.toFixed(2)}</li>
        ${
          surcharge > 0
            ? `<li>Card Surcharge (2.2%): $${surcharge.toFixed(2)}</li>`
            : ""
        }
        <li>Deposit Deducted: -$${deposit.toFixed(2)}</li>
      </ul>
    `;

  let instructions = "";

  if (method === "cash") {
    instructions = `
        <strong>Instructions for Cash Payment:</strong><br/>
        Confirm full amount (including GST and discount).<br/>
        Notify the office immediately after collecting payment.
      `;
  } else if (method === "bank") {
    instructions = `
        <strong>Instructions for Bank Transfer:</strong><br/>
        Provide these details:<br/>
        <ul>
          <li>Account Name: 247 Victoria Cleaners</li>
          <li>BSB: 033186</li>
          <li>Account Number: 788692</li>
        </ul>
        Ask to see their payment screen.<br/>
        Take a clear photo showing BSB and Account Number.<br/>
        Do not leave until the office confirms payment is received.
      `;
  } else if (method === "card") {
    instructions = `
        <strong>Instructions for Card Payment:</strong><br/>
        Inform the customer that a 2.2% surcharge applies.<br/>
        Ask them to pay via: <br/>
        <a href="https://buy.stripe.com/4gwcOpad9fGyci4cMN" target="_blank">
          Stripe Payment Link
        </a><br/>
        No further confirmation is needed after payment.
      `;
  }

  document.getElementById("instructions").innerHTML = instructions;
}

// 🌙 DARK MODE TOGGLE
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem(
    "darkMode",
    document.body.classList.contains("dark-mode")
  );
}

// 🧠 Remember user preference
window.onload = () => {
  if (localStorage.getItem("darkMode") === "true") {
    document.body.classList.add("dark-mode");
  }
};
