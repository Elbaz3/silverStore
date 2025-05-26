import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@store/hook';
import { resetUi, actAuthSignUp } from '@store/auth/authSlice';
import { useNavigate } from 'react-router-dom';
import useCheckEmailAvailability from "@hooks/useCheckEmailAvailability";
import { useForm, SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signUpSchema, TFormData } from '@validations/signUpSchema';


const useSignUp = () => {
   const dispatch = useAppDispatch()

   const navigate = useNavigate()
 
   const { loading, error, accessToken } = useAppSelector(state => state.auth)
 
 
   const {
     register,
     handleSubmit,
     getFieldState,
     trigger,
     formState: { errors },
   } = useForm<TFormData>({
     mode: "onBlur",
     resolver: zodResolver(signUpSchema),
   });
 
   const submitForm: SubmitHandler<TFormData> = (data) => {
     const { firstName, lastName, email, password } = data
   
     dispatch(actAuthSignUp({ firstName, lastName, email, password }))
     .unwrap()
     .then(() => {
       navigate('/login?message=account_created')
     })
   }
   const {
     emailAvailabilityStatus,
     enteredEmail,
     checkEmailAvailability,
     resetCheckEmailAvailability,
   } = useCheckEmailAvailability();
 
   const emailOnBlurHandler = async (e: React.FocusEvent<HTMLInputElement>) => {
     await trigger("email");
     const value = e.target.value;
     const { isDirty, invalid } = getFieldState("email");
 
     if (isDirty && !invalid && enteredEmail !== value) {
       // checking
       checkEmailAvailability(value);
     }
 
     if (isDirty && invalid && enteredEmail) {
       resetCheckEmailAvailability();
     }
   };
 
   useEffect(() => {
     return () => {
       dispatch(resetUi())
     }
   }, [dispatch])

  
   return { loading, error, accessToken, handleSubmit, submitForm, register, errors, getFieldState, emailOnBlurHandler, emailAvailabilityStatus }
}

export default useSignUp