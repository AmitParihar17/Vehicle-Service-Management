import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AppProvider } from './Context/AppContext.jsx';
const clientId =
  "219317021027-9fp1tmcvna3665c596m1la6m14a2r8ji.apps.googleusercontent.com";
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AppProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <App />
      </GoogleOAuthProvider>
    </AppProvider>
  </StrictMode>
);
