import { useQueryClient } from '@tanstack/react-query'
import { useMutation } from '@tanstack/react-query'
import { login } from '../lib/api'

const useLogin = () => {
const queryclient = useQueryClient();
const {
    mutate,
    isPending,
    error,
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryclient.invalidateQueries({ queryKey: ["authUser"] }),
  });
  
  return {isPending,error,loginMutation:mutate} ;
}

export default useLogin