import { Github } from '@/icons/Github';
import { Instagram } from '@/icons/Instagram';
import { Linkedin } from '@/icons/Linkedin';
import { X } from '@/icons/X';
import React from 'react';
import styled from 'styled-components';

const SocialCard = () => {
    return (
        <StyledWrapper>
            <div className="container">
                <div onClick={() => {window.open("https://github.com/shubhashish-Chakraborty")}} data-text="Github" style={{ '--r': -15 } as React.CSSProperties} className="glass">
                    <Github/>
                </div>
                <div onClick={() => {window.open("https://www.instagram.com/___shubhashish___")}} data-text="Instagram" style={{ '--r': 5 } as React.CSSProperties} className="glass">
                    <Instagram/>
                </div>
                <div onClick={() => {window.open("https://x.com/__Shubhashish__")}} data-text="X" style={{ '--r': 25 } as React.CSSProperties} className="glass">
                    <X/>
                </div>
                <div onClick={() => {window.open("https://www.linkedin.com/in/Shubhashish-Chakraborty/")}} data-text="LinkedIn" style={{ '--r': 25 } as React.CSSProperties} className="glass">
                    <Linkedin/>
                </div>
            </div>
        </StyledWrapper>
    );
}

const StyledWrapper = styled.div`
  .container {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }

  .container .glass {
    position: relative;
    width: 180px;
    height: 200px;
    background: linear-gradient(#fff2, transparent);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 25px 25px rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    border-radius: 10px;
    margin: 0 -45px;
    backdrop-filter: blur(10px);
    transform: rotate(calc(var(--r) * 1deg));
  }

  .container:hover .glass {
    transform: rotate(0deg);
    margin: 0 10px;
  }

  .container .glass::before {
    content: attr(data-text);
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    background: rgba(255, 255, 255, 0.05);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
  }
  .container .glass svg {
    font-size: 2.5em;
    fill: #fff;
  }`;

export default SocialCard;
