/* eslint-disable no-unused-vars */
import { Navigate, Route, Routes } from "react-router"
import Homepage from "./pages/home.jsx";
import SignUpPage from "./pages/signUp.jsx" 
import LoginPage from "./pages/loginPage.jsx" 
import NotificationPage from "./pages/notification.jsx" 
import CallPage from "./pages/callPage.jsx" 
import ChatPage from "./pages/chatPage.jsx" 
import OnboardingPage from "./pages/onboardingPage.jsx" 
import {Toaster} from "react-hot-toast"//react-hot-toast is a small library used in React apps to show toast notifications (those small pop-ups)
import PageLoader from "./components/pageLoader.jsx";
import useAuthUser from "./hooks/useAuthUser.js";
function App() {

const {isLoading,authUser}= useAuthUser()

const isAuthenticated = Boolean(authUser)

const isOnboarded = authUser?.isOnboarded

if(isLoading) return <PageLoader/>

  return (
    <div className=" h-screen" data-theme="coffee">
     <Routes>
      <Route path="/" element={isAuthenticated && isOnboarded ?(
        <Homepage />
      ):(
        <Navigate to={!isAuthenticated? "/login" : "/onboarding" }/>
      )}/>
      <Route path="/signup" element={!isAuthenticated ?<SignUpPage />: <Navigate to={
        isOnboarded? "/":"/onboarding"
      }/>}/>
      <Route path="/login" element={!isAuthenticated ?<LoginPage />: <Navigate to={
        isOnboarded? "/":"/onboarding"
      }/>}/>
      <Route path="/notification" element={isAuthenticated ?<NotificationPage />: <Navigate to="/login"/>}/>
      <Route path="/call" element={isAuthenticated ?<CallPage />: <Navigate to="/login"/>}/>
      <Route path="/chat" element={isAuthenticated ?<ChatPage />: <Navigate to="/login"/>}/>
      <Route path="/onBoarding" element={isAuthenticated ? (
        !isOnboarded ? (
        <OnboardingPage />
          ) : (
          <Navigate to="/"/>
        ) 
      ): (
        <Navigate to="/login"/>
      )} />

     </Routes>
     <Toaster/>
    </div>
  )
}

export default App
