import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from './api';
import { FaShieldAlt, FaExclamationCircle, FaCheckCircle } from 'react-icons/fa';
import '../css/otp.css';

export default function OTPVerification() {
  const [digits, setDigits] = useState(Array(6).fill(''));
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(30);
  const [verified, setVerified] = useState(false);
  const inputs = useRef([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    }
  }, [location]);

  useEffect(() => {
    let timer;
    if (countdown > 0 && !verified) {
      timer = setInterval(() => setCountdown(prev => prev - 1), 1000);
    }
    return () => clearInterval(timer);
  }, [countdown, verified]);

  const handleDigitChange = (index, value) => {
    if (/^\d$/.test(value) || value === '') {
      const newDigits = [...digits];
      newDigits[index] = value;
      setDigits(newDigits);

      if (value && index < 5) {
        inputs.current[index + 1].focus();
      }

      if (newDigits.every(d => d !== '')) {
        handleSubmit(newDigits.join(''));
      }
    }
  };

  const handleSubmit = async (otp) => {
    setError('');
    setIsLoading(true);

    try {
      const response = await verifyOtp({ otp: parseInt(otp), email });

      if (response.success) {
        setVerified(true);
        setTimeout(() => {
          localStorage.setItem('token', response.accessToken);
          navigate('/home');
        }, 1500);
      }
    } catch (err) {
      setDigits(Array(6).fill(''));
      inputs.current[0].focus();
      setError(err.message || 'Invalid OTP. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleResend = async () => {
    try {
      // You can integrate resend OTP logic here
      setCountdown(30);
      setError('');
      setDigits(Array(6).fill(''));
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="otp-page">
      <div className="otp-card">
        <div className="otp-logo">
          <FaShieldAlt />
        </div>
        <h2>Verify Your Email</h2>
        <p className="otp-subtext">Enter the 6-digit code sent to <strong>{email}</strong></p>

        <div className="otp-inputs">
          {digits.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              ref={(el) => (inputs.current[index] = el)}
              disabled={isLoading || verified}
              className={verified ? 'verified' : ''}
            />
          ))}
        </div>

        {error && (
          <div className="otp-error">
            <FaExclamationCircle /> {error}
          </div>
        )}

        <div className="otp-actions">
          <button
            className="resend-btn"
            onClick={handleResend}
            disabled={countdown > 0}
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>

          <button
            className="verify-btn"
            onClick={() => handleSubmit(digits.join(''))}
            disabled={isLoading || digits.some(d => d === '')}
          >
            {verified ? <FaCheckCircle /> : isLoading ? 'Verifying...' : 'Verify'}
          </button>
        </div>

        <p className="otp-footer">Back to <span onClick={() => navigate("/")}>Login</span></p>
      </div>
    </div>
  );
}