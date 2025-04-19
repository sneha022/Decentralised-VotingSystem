import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import voteIcon from '../assets/vote.png';
import nominationIcon from '../assets/nomination.png';

const WelcomePage = () => {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <img src={logo} alt="BVRIT Logo" style={styles.logo} />
      <h1 style={styles.college}>BVRIT HYDERABAD</h1>
      <h2 style={styles.subtitle}>College of Engineering for Women</h2>
      <p style={styles.ugc}>UGC – Autonomous</p>
      <h2 style={styles.welcome}>WELCOME TO STUDENT ELECTIONS</h2>

      <div style={styles.buttons}>
        <div style={styles.buttonBox} onClick={() => navigate('/login')}>
          <img src={voteIcon} alt="Vote" style={styles.icon} />
          <p style={styles.voteText}>Student Vote</p>
        </div>
        <div style={{ ...styles.buttonBox, borderColor: '#3aaa35' }} onClick={() => navigate('/nominations')}>
          <img src={nominationIcon} alt="Nominate" style={{ ...styles.icon, filter: 'hue-rotate(90deg)' }} />
          <p style={styles.nominateText}>Student Nominations</p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    textAlign: 'center',
    padding: '40px',
    backgroundColor: '#f2f9f3',
    fontFamily: '"Segoe UI", sans-serif',
  },
  logo: {
    width: '100px',
    marginBottom: '10px',
  },
  college: {
    color: 'green',
    fontWeight: 'bold',
    fontSize: '28px',
    margin: '5px',
  },
  subtitle: {
    color: 'green',
    fontSize: '18px',
    margin: '0',
  },
  ugc: {
    fontWeight: 'bold',
    marginTop: '5px',
    marginBottom: '30px',
  },
  welcome: {
    fontSize: '28px',
    color: '#0a2540',
    marginBottom: '40px',
  },
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '40px',
  },
  buttonBox: {
    width: '150px',
    padding: '20px',
    border: '2px solid #0a2540',
    borderRadius: '15px',
    cursor: 'pointer',
    backgroundColor: '#fff',
  },
  icon: {
    width: '50px',
    marginBottom: '10px',
  },
  voteText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#0a2540',
  },
  nominateText: {
    fontSize: '16px',
    fontWeight: 'bold',
    color: '#3aaa35',
  },
};

export default WelcomePage;
