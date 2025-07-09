import Messenger from "./components/Messenger";

import { GoogleOAuthProvider } from '@react-oauth/google';

import AccountProvider from "./context/AccountProvider";

function App() {
  const clientId='1098104427392-0ihous1dp02fcag8s9k4n73mhv42tq6n.apps.googleusercontent.com';
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <AccountProvider>
        <Messenger/>
      </AccountProvider>
      
    </GoogleOAuthProvider>
  );
}

export default App;
