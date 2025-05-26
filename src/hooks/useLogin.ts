import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@store/hook";
import { actAuthLogIn, resetUi } from "@store/auth/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema, signInType } from "@validations/logInSchema";


const useLogin = () => {
   const [searchParams, setSearchParams] = useSearchParams()

   const dispatch = useAppDispatch()
 
   const navigate = useNavigate()
 
   const { loading, error, accessToken } = useAppSelector((state) => state.auth)
 
 
 
   const {
     register,
     handleSubmit,
     formState: { errors },
   } = useForm<signInType>({
     mode: "onBlur",
     resolver: zodResolver(signInSchema),
   });
 
   const submitForm: SubmitHandler<signInType> = (data) => {
     if (searchParams.get('message')) {
       setSearchParams('')
     }
     dispatch(actAuthLogIn(data))
     .unwrap()
     .then(() => {
       navigate('/')
     })
   };
 
   useEffect(() => {
     return () => {
       dispatch(resetUi())
     }
   }, [dispatch])

  return { loading, error, accessToken, register, handleSubmit, submitForm, errors, searchParams }
}

export default useLogin