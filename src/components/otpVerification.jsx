// OTPVerification.jsx
import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { verifyOtp } from './api';
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
      const response = await verifyOtp({
        otp: parseInt(otp),
        email
      });

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
      // Add resend OTP API call
      setCountdown(30);
      setError('');
      setDigits(Array(6).fill(''));
    } catch (err) {
      setError('Failed to resend OTP');
    }
  };

  return (
    <div className="otp-premium-container">
      <div className="otp-glass-card">
        <div className="otp-header">
          <div className="verification-badge">
            <i className="fas fa-shield-check"></i>
          </div>
          <h1>Secure Verification</h1>
          <p>Enter the 6-digit code sent to<br/><span>{email}</span></p>
        </div>

        <div className="otp-inputs-container">
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
          <div className="otp-error-message">
            <i className="fas fa-exclamation-circle"></i>
            {error}
          </div>
        )}

        <div className="otp-action-bar">
          <button
            type="button"
            onClick={handleResend}
            disabled={countdown > 0}
            className="resend-button"
          >
            {countdown > 0 ? `Resend in ${countdown}s` : 'Resend Code'}
          </button>
          
          <button
            type="button"
            disabled={isLoading || digits.some(d => d === '')}
            className="verify-button"
            onClick={() => handleSubmit(digits.join(''))}
          >
            {verified ? (
              <i className="fas fa-check"></i>
            ) : isLoading ? (
              <div className="dual-ring-spinner"></div>
            ) : (
              'Verify Now'
            )}
          </button>
        </div>

        <div className="otp-decorative-line"></div>
      </div>
    </div>
  );
}