import React, { useState } from "react";
import './order.css';

const PaymentPage = ({ totalPrice }) => {
    const [cvv, setCvv] = useState('');
    const [cvvError, setCvvError] = useState('');
    //Expiry date validation
    const [expiry, setExpiry] = useState('');
    const [expiryError, setExpiryError] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [cardNumberError, setCardNumberError] = useState('');


    const handleCvvChange = (e) => {
        const { value } = e.target;
        // Validate CVV input
        if (value.length <= 3) {
          setCvv(value);
          setCvvError('');
        } else {
          setCvvError('CVV must be 3 digits');
        }
      };




const handleExpiryChange = (e) => {
  let value = e.target.value;
  // Validate MM/YY input
  if (value.length === 2 && value.charAt(2) !== '/') {
      value += '/';
  }
  setExpiry(value);

  const [monthString, yearString] = value.split('/');
  const month = parseInt(monthString, 10);
  const year = parseInt(yearString, 10);
  const currentYear = new Date().getFullYear() % 100;

  // Check if month is within the valid range (1 to 12) and year is valid
  if (
      month < 1 ||
      month > 12 ||
      isNaN(month) ||
      isNaN(year) ||
      year < currentYear
  ) {
      setExpiryError('Invalid expiry date');
  } else {
      setExpiryError('');
  }
};

const handleCardNumberChange = (e) => {
  let value = e.target.value;
  // Remove non-digit characters
  value = value.replace(/\D/g, '');
  // Add spaces after every 4 characters
  value = value.replace(/(.{4})/g, '$1 ').trim();
  setCardNumber(value);

  if (value.length !== 19) {
      setCardNumberError('Card number must be 16 digits');
  } else {
      setCardNumberError('');
  }
};
  return (
    <div className="Payment">
      <h2>Payment Details</h2>
      <form style={{ display: 'flex', flexDirection: 'column' }}>
        <label htmlFor="cardName">Name on Card:</label>
        <input type="text" id="cardName" name="cardName" required />
        <label htmlFor="cardNumber">Card Number:</label>
        <input type="text" id="cardNumber" name="cardNumber" value={cardNumber} onChange={handleCardNumberChange} maxLength="19" required />
        {cardNumberError && <p style={{ color: 'red' }}>{cardNumberError}</p>}
        <label htmlFor="cvv">CVV:</label>
        <input type="text" id="cvv" name="cvv" value={cvv}onChange={handleCvvChange} maxLength="3" required />
        {cvvError && <p style={{ color: 'red' }}>{cvvError}</p>}
        <label htmlFor="expiry">Expiry MM/YY:</label>
        <input type="text" id="expiry" name="expiry" value={expiry} onChange={handleExpiryChange} maxLength="5" required />
        {expiryError && <p style={{ color: 'red' }}>{expiryError}</p>}
        <p>Total Price: {totalPrice}</p>
        <button type="submit">Pay Now</button>
      </form>
    </div>
  );
};

export default PaymentPage;
