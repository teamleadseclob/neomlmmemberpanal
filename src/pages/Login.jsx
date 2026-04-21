import PlexusBackground from './bg';
import LoginCard from '../components/auth/loginCard';
import logo from '../assets/logo.png';

export default function Login() {
  return (
    <PlexusBackground>
      <div className="absolute top-6 left-8 z-10">
        <img src={logo} alt="NeoFi" className="h-10 w-auto object-contain" />
      </div>
      <LoginCard />
    </PlexusBackground>
  );
}
