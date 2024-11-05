import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaCheckCircle } from 'react-icons/fa';

function PaymentSuccess() {
  const navigate = useNavigate();

  const handleGoToDashboard = () => {
    navigate('/dashboard'); // Redirect to the dashboard or desired route
  };

  return (
    <div style={styles.container}>
      <div style={styles.content}>

        <h1 style={styles.title}>Payment Successful!</h1>
        <p style={styles.message}>
          Thank you for your purchase! Your transaction was completed successfully.
        </p>
        <div style={styles.details}>
          <p><strong>Order ID:</strong> #123456789</p>
          <p><strong>Amount Paid:</strong> $99.99</p>
        </div>
        <button style={styles.button} onClick={handleGoToDashboard}>
          Go to App
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f5f5f5',
    padding: '20px',
  },
  content: {
    textAlign: 'center',
    padding: '30px',
    maxWidth: '400px',
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: '12px',
    boxShadow: '0 8px 16px rgba(0, 0, 0, 0.2)',
  },
  icon: {
    fontSize: '50px',
    color: '#4CAF50',
    marginBottom: '10px',
    alignItems:'center'
  },
  title: {
    fontSize: '26px',
    color: '#333',
    fontWeight: 'bold',
  },
  message: {
    fontSize: '16px',
    color: '#666',
    margin: '10px 0',
    lineHeight: '1.6',
  },
  details: {
    fontSize: '15px',
    color: '#555',
    backgroundColor: '#f9f9f9',
    padding: '15px',
    borderRadius: '8px',
    margin: '20px 0',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  button: {
    padding: '12px 24px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease',
  },
};

export default PaymentSuccess;
