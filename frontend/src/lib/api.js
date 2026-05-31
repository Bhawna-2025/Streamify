import { axiosInstance } from "./axios"

export const  getAuthUser = async ()=>{
    const res  = await axiosInstance.get("http://localhost:4000/api/auth/me")
    return res.data
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
     