import { Route, Routes } from "react-router"
import Homepage from "./pages/home.jsx";
import SignUpPage from "./pages/signUp.jsx" 
import LoginPage from "./pages/login.jsx" 
import NotificationPage from "./pages/notification.jsx" 
import CallPage from "./pages/callPage.jsx" 
import ChatPage from "./pages/chatPage.jsx" 
import OnboardingPage from "./pages/onboardingPage.jsx" 
import {Toaster} from "react-hot-toast"//react-hot-toast is a small library used in React apps to show toast notifications (those small pop-ups)



function App() {
  return (
    <div className=" h-screen" data-theme="coffee">
     <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/signup" element={<SignUpPage />}/>
      <Route path="/login" element={<LoginPage />}/>
      <Route path="/notification" element={<NotificationPage />}/>
      <Route path="/call" element={<CallPage />}/>
      <Route path="/chat" element={<ChatPage />}/>
      <Route path="/onBoarding" element={<OnboardingPage />}/>
     </Routes>
     <Toaster/>
    </div>
  )
}

export default App
