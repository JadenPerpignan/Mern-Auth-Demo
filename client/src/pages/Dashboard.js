import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const COLORS = {
  background: '#181A1B', // dark gray
  card: '#232526', // slightly lighter dark
  text: '#FFFFFF', // white
  accent: '#FF7300', // neon orange
};

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);

  // Set global background color
  document.body.style.background = COLORS.background;

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      background: COLORS.background,
    }}>
      <div style={{
        background: COLORS.card,
        borderRadius: '18px',
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
        padding: '2.5rem',
        width: '100%',
        maxWidth: '420px',
        color: COLORS.text,
        border: `1.5px solid ${COLORS.accent}`,
        textAlign: 'center',
      }}>
        <h1 style={{
          color: COLORS.accent,
          fontWeight: 700,
          fontSize: '2.2rem',
          marginBottom: '1.5rem',
          letterSpacing: '2px',
        }}>
          Welcome, {user?.email}
        </h1>
        <button
          onClick={logout}
          style={{
            marginTop: '2rem',
            width: '100%',
            padding: '0.9rem',
            background: COLORS.accent,
            color: COLORS.text,
            border: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '1px',
            cursor: 'pointer',
            boxShadow: '0 2px 8px 0 rgba(255,115,0,0.15)',
            transition: 'background 0.2s, opacity 0.2s',
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;