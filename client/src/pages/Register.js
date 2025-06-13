import { useState, useContext } from "react";
import api from "../utils/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const COLORS = {
  background: '#181A1B', // dark gray
  card: '#232526', // slightly lighter dark
  text: '#FFFFFF', // white
  accent: '#FF7300', // neon orange
  errorBg: '#2D1A13', // dark error bg
  errorText: '#FF7300', // neon orange
};

const Register = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      
      const res = await api.post("/api/auth/register", form);
      await login(res.data.token);
      navigate("/dashboard");
    } catch (err) {
      // Set user-friendly error message
      if (err.response?.status === 400) {
        setError(err.response.data.msg || "Invalid registration data");
      } else if (err.response?.status === 403) {
        setError("Access forbidden. Please check if the server is running.");
      } else if (err.response?.status === 500) {
        setError("Server error. Please try again later.");
      } else if (!err.response) {
        setError("Network error. Please check if the server is running at http://localhost:5001");
      } else {
        setError(err.response?.data?.msg || err.message || "Failed to register. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

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
      <form onSubmit={handleSubmit} style={{
        padding: '2.5rem',
        background: COLORS.card,
        borderRadius: '18px',
        boxShadow: '0 4px 32px 0 rgba(0,0,0,0.25)',
        width: '100%',
        maxWidth: '400px',
        color: COLORS.text,
        border: `1.5px solid ${COLORS.accent}`,
      }}>
        <h2 style={{
          textAlign: 'center',
          marginBottom: '2rem',
          color: COLORS.accent,
          letterSpacing: '2px',
          fontWeight: 700,
          fontSize: '2rem',
        }}>Register</h2>
        {error && (
          <div style={{
            color: COLORS.errorText,
            background: COLORS.errorBg,
            marginBottom: '1.5rem',
            textAlign: 'center',
            padding: '0.75rem',
            borderRadius: '8px',
            border: `1px solid ${COLORS.errorText}`,
            fontWeight: 500,
            fontSize: '1rem',
          }}>
            {error}
          </div>
        )}
        <div style={{ marginBottom: '1.5rem' }}>
          <input
            type="email"
            placeholder="Email"
            required
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              marginBottom: '1.2rem',
              border: `1.5px solid ${COLORS.accent}`,
              borderRadius: '6px',
              background: COLORS.background,
              color: COLORS.text,
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
          <input
            type="password"
            placeholder="Password"
            required
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            style={{
              width: '100%',
              padding: '0.75rem',
              border: `1.5px solid ${COLORS.accent}`,
              borderRadius: '6px',
              background: COLORS.background,
              color: COLORS.text,
              fontSize: '1rem',
              outline: 'none',
              transition: 'border 0.2s',
            }}
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%',
            padding: '0.9rem',
            background: COLORS.accent,
            color: COLORS.text,
            border: 'none',
            borderRadius: '6px',
            fontWeight: 700,
            fontSize: '1.1rem',
            letterSpacing: '1px',
            cursor: loading ? 'not-allowed' : 'pointer',
            opacity: loading ? 0.7 : 1,
            boxShadow: '0 2px 8px 0 rgba(255,115,0,0.15)',
            marginTop: '0.5rem',
            transition: 'background 0.2s, opacity 0.2s',
          }}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
};

export default Register;