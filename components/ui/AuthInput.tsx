import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { BACKEND_URL } from '@/app/config';

const AuthInput = () => {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setNotification(null);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 5000); // Auto-close after 5 seconds
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setNotification(null);

    try {
      const url = isLogin
        ? `${BACKEND_URL}/api/v1/auth/user/signin`
        : `${BACKEND_URL}/api/v1/auth/user/signup`;

      const { data } = await axios.post(url, formData);

      setNotification({
        message: isLogin
          ? 'Login successful! Redirecting...'
          : 'Signup successful! Please login',
        type: 'success'
      });

      if (isLogin) {
        // Redirect after 2 seconds to show the notification
        setTimeout(() => router.push('/dashboard'), 2000);
      } else {
        // Switch to login after 2 seconds
        setTimeout(() => setIsLogin(true), 2000);
      }
    } catch (err: any) {
      setNotification({
        message: err.response?.data?.message || 'Something went wrong',
        type: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <NotificationSidebar show={!!notification} type={notification?.type}>
        {notification?.message}
      </NotificationSidebar>

      <StyledWrapper>
        <div className="wrapper">
          <div className="card-switch">
            <label className="switch">
              <input
                type="checkbox"
                className="toggle"
                checked={!isLogin}
                onChange={handleToggle}
              />
              <span className="slider" />
              <span className="card-side" />
              <div className="flip-card__inner" style={{ transform: isLogin ? 'rotateY(0deg)' : 'rotateY(180deg)' }}>
                <div className="flip-card__front">
                  <div className="title">Log in</div>
                  <form className="flip-card__form" onSubmit={handleSubmit}>
                    <input
                      className="flip-card__input"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="flip-card__input"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="flip-card__btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Logging in...' : "Let's go!"}
                    </button>
                  </form>
                </div>
                <div className="flip-card__back">
                  <div className="title">Sign up</div>
                  <form className="flip-card__form" onSubmit={handleSubmit}>
                    <input
                      className="flip-card__input"
                      name="username"
                      placeholder="Username"
                      type="text"
                      value={formData.username}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="flip-card__input"
                      name="email"
                      placeholder="Email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                    <input
                      className="flip-card__input"
                      name="password"
                      placeholder="Password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      className="flip-card__btn"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Signing up...' : 'Confirm!'}
                    </button>
                  </form>
                </div>
              </div>
            </label>
          </div>
        </div>
      </StyledWrapper>
    </>
  );
};

// Notification Sidebar Styles
const NotificationSidebar = styled.div<{ show: boolean; type?: 'success' | 'error' }>`
    position: fixed;
    top: 20px;
    right: ${props => props.show ? '20px' : '-300px'};
    background-color: ${props => props.type === 'success' ? '#4CAF50' : '#F44336'};
    color: white;
    padding: 15px 25px;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    z-index: 1000;
    transition: right 0.3s ease-in-out;
    max-width: 300px;
    word-wrap: break-word;
`;

const StyledWrapper = styled.div`
  .wrapper {
    --input-focus: #2d8cf0;
    --font-color: #323232;
    --font-color-sub: #666;
    --bg-color: #fff;
    --bg-color-alt: #666;
    --main-color: #323232;
  }
  
  /* Error message styling */
  .error-message {
    color: #ff3333;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: center;
  }

  /* switch card */
  .switch {
    transform: translateY(-200px);
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 30px;
    width: 50px;
    height: 20px;
  }

  .card-side::before {
    position: absolute;
    content: 'Log in';
    left: -70px;
    top: 0;
    width: 100px;
    text-decoration: underline;
    color: black;
    font-weight: 600;
  }

  .card-side::after {
    position: absolute;
    content: 'Sign up';
    left: 70px;
    top: 0;
    width: 100px;
    text-decoration: none;
    color: black;
    font-weight: 600;
  }

  .toggle {
    opacity: 0;
    width: 0;
    height: 0;
  }

  .slider {
    box-sizing: border-box;
    border-radius: 5px;
    border: 2px solid gray;
    box-shadow: 4px 4px green;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--bg-colorcolor);
    transition: 0.3s;
  }

  .slider:before {
    box-sizing: border-box;
    position: absolute;
    content: "";
    height: 20px;
    width: 20px;
    border: 2px solid var(--main-color);
    border-radius: 5px;
    left: -2px;
    bottom: 2px;
    background-color: var(--bg-color);
    box-shadow: 0 3px 0 var(--main-color);
    transition: 0.3s;
  }

  .toggle:checked + .slider {
    background-color: var(--input-focus);
  }

  .toggle:checked + .slider:before {
    transform: translateX(30px);
  }

  .toggle:checked ~ .card-side:before {
    text-decoration: none;
  }

  .toggle:checked ~ .card-side:after {
    text-decoration: underline;
  }

  /* card */ 
  .flip-card__inner {
    cursor: pointer;
    width: 300px;
    height: 350px;
    position: relative;
    background-color: transparent;
    perspective: 1000px;
    text-align: center;
    transition: transform 0.8s;
    transform-style: preserve-3d;
  }

  .flip-card__front, .flip-card__back {
    padding: 20px;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    background: lightgrey;
    gap: 20px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    box-shadow: 4px 4px var(--main-color);
  }

  .flip-card__back {
    width: 100%;
    transform: rotateY(180deg);
  }

  .flip-card__form {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }

  .title {
    margin: 20px 0 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;
    color: var(--main-color);
  }

  .flip-card__input {
    width: 250px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 15px;
    font-weight: 600;
    color: var(--font-color);
    padding: 5px 10px;
    outline: none;
  }

  .flip-card__input::placeholder {
    color: black;
    font-weight: bold;
    opacity: 0.8;
  }

  .flip-card__input:focus {
    border: 2px solid var(--input-focus);
  }

  .flip-card__btn:active, .button-confirm:active {
    box-shadow: 0px 0px var(--main-color);
    transform: translate(3px, 3px);
  }

  .flip-card__btn {
    margin: 20px 0 20px 0;
    width: 120px;
    height: 40px;
    border-radius: 5px;
    border: 2px solid var(--main-color);
    background-color: var(--bg-color);
    box-shadow: 4px 4px var(--main-color);
    font-size: 17px;
    font-weight: 600;
    color: var(--font-color);
    cursor: pointer;
  }

  .flip-card__btn:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

export default AuthInput;