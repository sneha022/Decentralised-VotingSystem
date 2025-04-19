import React from 'react';

const VerificationSent = () => {
  return (
    <div style={styles.container}>
      <h2>Verification Email Sent!</h2>
      <p>Please check your BVRIT email and click the link to verify your account.</p>
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    textAlign: 'center',
    backgroundColor: '#e0ffe0',
    fontFamily: '"Segoe UI", sans-serif',
  },
};

export default VerificationSent;
