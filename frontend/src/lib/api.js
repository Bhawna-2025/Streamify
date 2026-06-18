import { axiosInstance } from "./axios"

export const  getAuthUser = async ()=>{
  try{
    const res  = await axiosInstance.get("http://localhost:4000/api/auth/me")
    return res.data
  }catch(error){
    console.log("Error in getAuthUser:",error)
    return null
  }
}
  
export const signUp = async(signUpData)=>{
      const response = await axiosInstance.post("/auth/signup",signUpData)
      return response.data
    }
export const login = async(loginData)=>{
      const response = await axiosInstance.post("/auth/login",loginData)
      return response.data
    }

export const compeleteOnboarding = async(userData) =>{
  const response = await axiosInstance.post("auth/onboarding",userData)
  return response.data;
}

export const logOut = async () =>{
  const response = await axiosInstance.post("/auth/logout")
  return response.data;
}

export const getUserFriends = async()=>{
  const response = await axiosInstance.get("/users/friends")
  return response.data;
}

export const getRecommendeduser = async()=>{
  const response = await axiosInstance.get("/users")
  return response.data;
}

export const getOutgoingFriendRequests = async()=>{
  const response = await axiosInstance.get("/users/outgoing-friend-requests")
  return response.data;
}
     
export async function sendFriendRequest(userId){
  const response = await axiosInstance.post(`/users/friend-request/${userId}`)
  return response.data
}

export async function getFriendRequest(){
  const response = await axiosInstance.get("/users/friend-requests")
  return response.data
}

export async function acceptFriendRequest(requestId){
  const response = await axiosInstance.put(`/users/friend-request/${requestId}/accept`);
  return response.data
}

export async function getStreamToken(){
  const response = await axiosInstance.get("chat/token")
  return response.data
}