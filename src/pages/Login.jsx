import React from 'react';
import PlexusBackground from './bg';
import LoginCard from '../components/auth/loginCard';
import logo from '../assets/logo.svg';

export default function Login() {
  return (
    <PlexusBackground>
      <div className="absolute top-6 left-8 z-10">
        <img src={logo} alt="NeoFi" className="h-14 w-auto object-contain" />
      </div>
      <LoginCard />
    </PlexusBackground>
  );
}
