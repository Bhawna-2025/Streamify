import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { signUp } from '../lib/api'

const useSignUp = () => {
  const queryClient =useQueryClient()

  {/*useMutation is used to change data*/}
  const{mutate:signUpMutation, isPending , error}= useMutation({
    mutationFn:signUp,
    onSuccess:()=>{queryClient.invalidateQueries({queryKey:["authUser"]})}//it will find the querykey named authUser and reftech it with authenticated user
  })
  return {isPending, error, signUpMutation}
}

export default useSignUp