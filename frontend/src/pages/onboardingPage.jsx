/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React from 'react'
import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { compeleteOnboarding } from '../lib/api'
import toast from 'react-hot-toast'
import { CameraIcon, LoaderIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import { LANGUAGES } from '../constants'


const OnboardingPage = () => {
  const { authUser } = useAuthUser();
  const queryClient = useQueryClient();

  const [FormState, setFormState] = useState({
    fullname: authUser?.fullname || authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    location: authUser?.location || "",
    profilePic: authUser?.profilePic || "",
  });

  const { mutate: onboardingMutation, isPending } = useMutation({
    mutationFn: compeleteOnboarding,
    onSuccess: () => {
      toast.success("Profile updated Successfully")
      queryClient.invalidateQueries({ queryKey: ["authUser"] });
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Something went wrong")
      console.log(error)
    }
  })


  const handleSubmit = (e) => {
    e.preventDefault()
    onboardingMutation(FormState)
  }

  const handleRandomAvatar = () => {
    const idx = Math.floor(Math.random()*100)
    const avataUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${idx}`

    setFormState({
      ...FormState,
      profilePic:avataUrl,
    })
    toast.success("Avatar changed successfully")
  }


  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center p-4">
      <div className="card bg-base-200 w-full max-w-md shadow-xl">
        <div className="card-body p-6 sm:p-8">
          <h1 className="text-2xl sm:text-3xl font-body text-center mb-6">Complete Your Profile</h1>
          <form onSubmit={handleSubmit} className='space-y-6'>
            {/*Profile pic container*/}
            <div className="flex flex-col items-center justify-center space-y-4">
              {/*Image Preview*/}
              <div className='size-32 rounded-full bg-base-300 overflow-hidden'>
                {FormState.profilePic ? (
                  <img 
                    src={FormState.profilePic}
                    alt='Profile Preview'
                    className='w-full h-full object-cover'
                  />
                ):(
                  <div className="flex items-center justify-center h-full">
                    <CameraIcon className='size-12 text-base-content opacity-40' />
                  </div>
                )}
              </div>

              {/*Generate Random Avatar BTN*/}
              <div className="flex items-center gap-2">
                  <button type="button" onClick={handleRandomAvatar} className='btn btn-accent'>
                  <ShuffleIcon className='size-4 mr-2'/>
                  Generate Random Avatar
                </button>
              </div>
            </div>

            {/*FULL NAME*/}
            <div className="form-control w-full">
              <label className="label">
                <span className='label-text'>Full Name</span>
              </label>
              <input 
                type="text" 
                name="fullname"
                value={FormState.fullname}
                onChange={(e)=>setFormState({...FormState,fullname:e.target.value})}
                className='input input-bordered w-full'
                placeholder='Your full name'
              />
            </div>

            {/*BIO*/}
            <div className='form-control w-full'>
              <label className='label'>
                <span className='label-text'>Bio</span>
              </label>
              <textarea
                name='bio'
                value={FormState.bio}
                onChange={(e)=>setFormState({...FormState,bio:e.target.value})}
                className='textarea textarea-bordered w-full h-24'
                placeholder='Tell others about yourself and your language learning goals'
              />
            </div>

            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            {/*NATIVE LANGUAGE*/}
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Native Language</span>
                </label>
                <select
                  name='nativeLanguage'
                  value={FormState.nativeLanguage}
                  onChange={(e)=>setFormState({...FormState,nativeLanguage:e.target.value})}
                  className='select select-bordered w-full'
                >
                  <option value="" disabled>Select your native language</option>
                  {LANGUAGES.map((lang)=>(
                    <option key={`native-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>

              {/*LEARNING LANGUAGE*/}
              <div className='form-control w-full'>
                <label className='label'>
                  <span className='label-text'>Learning Language</span>
                </label>
                <select
                  name='learningLanguage'
                  value={FormState.learningLanguage}
                  onChange={(e)=>setFormState({...FormState,learningLanguage:e.target.value})}
                  className='select select-bordered w-full'
                >
                  <option value="" disabled>Select the language you are learning</option>
                  {LANGUAGES.map((lang)=>(
                    <option key={`learning-${lang}`} value={lang.toLowerCase()}>
                      {lang}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/*LOCATION*/}
            <div className='form-control'>
              <label className='label'>
                <span className='label-text'>Location</span>
              </label>
              <div className='relative'>
                <MapPinIcon className='absolute left-3 top-1/2 transform -translate-y-1/2 size-5 text-base-content opacity-70' />
                <input
                  type='text'
                  name='location'
                  value={FormState.location}
                  onChange={(e)=>setFormState({...FormState,location:e.target.value})}
                  className='input input-bordered w-full pl-10'
                  placeholder='City, Country'
                />
              </div>
            </div>

            {/*SUBMIT BUTTON*/}
            <button
              type='submit'
              className='btn btn-primary w-full'
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <LoaderIcon className='animate-spin size-5 mr-2'/>
                  Onboarding....
                </>
              ) : (
                <>
                  <ShipWheelIcon className='size-5 mr-2'/>
                  Complete Onboarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
