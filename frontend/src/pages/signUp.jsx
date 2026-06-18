/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import { useState } from 'react'
import { ShipWheelIcon } from "lucide-react"
import {Link } from "react-router"
import useSignUp from '../hooks/useSignUp'

const signUpPage = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [signUpData, setsignUpData] = useState({
    fullName: "",
    email: "",
    password: ""
  })

  // const queryClient =useQueryClient()

  // {/*useMutation is used to change data*/}
  // const{mutate:signUpMutation, isPending , error}= useMutation({
  //   mutationFn:signUp,
  //   onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authUser"]})}//it will find the querykey named authUser and reftech it with authenticated user
  // })

  //use custom hook
  const{isPending,error,signUpMutation}= useSignUp()

  const handleSignUp = (e) => {
    e.preventDefault()
    signUpMutation(signUpData)
  }

  return (
    <div className="h-screen flex items-center justify-center p-4 sm:p-8 md:p-8" data-theme="forest">
      <div className="border border-primary/25 flex flex-col lg:flex-row w-full max-w-5xl mx-auto bg-base-100 rounded-xl shadow-lg overflow-hidden">
      {/*Sign Up left side */}
        <div className="w-full lg:w-1/2 p-4 sm:p-8 flex flex-col">
          <div className="mb-4 flex items-center justify-start gap-2">
            <ShipWheelIcon className="size-9 text-primary" />
            <span className="text-3xl font-bold font-mono bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary tracking-wider">
              Streamify
            </span>
          </div>

          {error && (
            <div className='alert alert-error'>
              <span>{error.response.data.message}</span>
            </div>
          )}

          <div className="w-full">
            <form onSubmit={handleSignUp}>
              <div className="space-y-4">
                <div>
                  <h2 className='text-xl font-semibold'>Create an account</h2>
                  <p className='text-sm opacity-70'>
                    Join Streamify and start your language learning journey!
                  </p>
                </div>

                <div className="space-y-3">
                  {  /*fullName */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className='label-text'>
                        Full Name
                      </span>
                    </label>

                    <input type="text"
                      placeholder='John Doe'
                      className='input input-bordered'
                      value={signUpData.fullName}
                      onChange={(e) => setsignUpData({ ...signUpData, fullName: e.target.value })}
                      required
                    />
                  </div>
                  {/*Email */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className='label-text'>
                        email
                      </span>
                    </label>
                    <input type="email"
                      placeholder='John@gmail.com'
                      className='input input-bordered'
                      value={signUpData.email}
                      onChange={(e) => setsignUpData({ ...signUpData, email: e.target.value })}
                      required
                    />
                  </div>
                  {/* password  */}
                  <div className="form-control w-full">
                    <label className="label">
                      <span className='label-text'>
                        Password
                      </span>
                    </label>
                    <input type="password"
                      placeholder='******'
                      className='input input-bordered'
                      value={signUpData.password}
                      onChange={(e) => setsignUpData({ ...signUpData, password: e.target.value })}
                      required
                    />
                    <p className='text-xs opacity-70 mt-1'>Password must be atleast 6 characters</p>
                  </div>
                  {/*checkbox */}
                  <div className="form-control">
                    <label className="label cursor-pointer justify-start gap-2">
                      <input type="checkbox" className='checkbox checkbox-sm ' required />
                      <span className='text-xs leading-tight'>I agree to{" "}
                        <span className='text-primary hover:underline'>terms of services</span> and {" "}
                         <span className='text-primary hover:underline'>privacy policy</span>
                      </span>
                    </label>
                  </div>
                </div>

                <button className='btn btn-primary w-full' type='submit'>
                 {isPending? (
                  <>
                    <span className='loading loading-spinnner loading-xs'></span>
                     Loading...
                  </>
                 ) : (
                  "Create Account"
                 )}
                </button>
                <div className="text-center mt-4">
                  <p className="text-sm">
                    Already have an account?{" "}
                    <Link to="/login" className='text-primary hover:underline'>Sign In</Link>
                  </p>
                </div>

              </div>
            </form>
          </div>
        </div>

        {/*sign up right side */}
        <div className="hidden lg:flex w-full lg:w-1/2 bg-primary/10 items-center justify-center">
          <div className="max-w-md p-8">
            {/*Illustration */}
            <div className="relative aspect-square max-w-sm mx-auto">
              <img src="/Halloween video call-amico.png" alt="Language Connection Illustration" className='w-full h-full' />
            </div>

            <div className="text-center space-y-3 mt-6">
              <h2 className='text-xl font-semibold'>Connect With Language Partner WorldWide</h2>
              <p className='opacity-70'>Prcatise conversations , make friends , and improve your language  skills together</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default signUpPage
