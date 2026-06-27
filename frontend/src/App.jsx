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
import Layout from "./components/layout.jsx";
import { useThemeStore } from "./store/useThemeStore.js";

function App() {
const {isLoading,authUser}= useAuthUser()
const isAuthenticated = Boolean(authUser)
const isOnboarded = authUser?.isOnboarded

const {theme }= useThemeStore()

if(isLoading) return <PageLoader/>

  return (
    <div className=" min-h-screen" data-theme={theme}>
      
     <Routes>
      <Route path="/" element={isAuthenticated && isOnboarded ?(
        <Layout showSidebar>
          <Homepage />
        </Layout>
      ):(
        <Navigate to={!isAuthenticated? "/login" : "/onboarding" }/>
      )}/>
      <Route path="/signup" element={!isAuthenticated ?<SignUpPage />: <Navigate to={
        isOnboarded? "/":"/onboarding"
      }/>}/>
      <Route path="/login" element={!isAuthenticated ?<LoginPage />: <Navigate to={
        isOnboarded? "/":"/onboarding"
      }/>}/>
      <Route path="/notification" element={isAuthenticated && isOnboarded?(
        <Layout showSidebar={true}>
          <NotificationPage/>
        </Layout>
      ):(
        <Navigate to={!isAuthenticated?"/login":"/onboarding"}/>
      ) }/>
      <Route path="/call/:id" element={isAuthenticated && isOnboarded?( <CallPage />):( <Navigate to={!isAuthenticated? "/login":"/onboarding"}/>)}/>


      <Route path="/chat/:id" element={
        isAuthenticated && isOnboarded?(
          <Layout showsSidebar={false}>
            <ChatPage/>
          </Layout>
        ):(
          <Navigate to={!isAuthenticated ? "login":"/onboarding"}/>
        ) 
      }/>

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
