"use client"
import Link from 'next/link'
import styles from '../component/Login/login.module.css'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from "react-redux"
import { useEffect, useState } from 'react';

const schema = yup.object().shape({
  name: yup.string().required("Name required"),
  email: yup.string().email().required("Email required"),
  password: yup.string().required("Password required")
})



function Signup() {

  const state: any = useSelector(state => state);
  const dispatch = useDispatch();
  const [done, setDone] = useState(false);
  const [userExist, setUserExist] = useState(false);



  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });


  const handleSignupSubmit = (formData: any) => {
    const user = state.find((user: any) => user.email === formData.email)
    if (user) {
      setUserExist(true)
      reset()
      setTimeout(() => {
        setUserExist(false)
      }, 3000);
    } else {
      dispatch({
        type: "Register",
        payload: formData
      })
      setDone(true)
      reset()
      reset(formData);
      setTimeout(() => {
        setDone(false)
      }, 4000);
    }
  }


  return (
    <div className={`bg-slate-200 align-middle rounded-md justify-center p-10 m-10 ${styles.container}`}>
      <form onSubmit={handleSubmit(handleSignupSubmit)}>
        <h1 className='flex justify-center mb-6 '>Signup Page</h1>
        <label htmlFor="name" className='block mb-2'>Name:</label>
        <input type="text" {...register('name')} className={`block mb-2 p-1 ${styles.email}`} id='name' placeholder='Enter your name' />
        <p className='text-center text-red-950 font-bold mb-1'>{errors.name?.message}</p>
        <label htmlFor="email" className='block mb-2'>Email:</label>
        <input type="email" {...register('email')} className={`block mb-2 p-1 ${styles.email}`} id='email' placeholder='Enter your mail' />
        <p className='text-center text-red-950 font-bold mb-1'>{errors.email?.message}</p>

        <label htmlFor="password" className='block mb-2'>Password:</label>
        <input type="password" {...register('password')} className={`block mb-2 p-1 ${styles.password}`} id='password' placeholder='Create password' />
        <p className='text-center text-red-950 font-bold mb-1'>{errors.password?.message}</p>
        <p className='text-center text-sky-950 font-bold mb-1'>{done ? "Registration completed,Go to Login page" : null}</p>
        <p className='text-center text-red-950 font-bold mb-1'>{userExist && "User exists,Try with new mail id"}</p>

        <input type="submit" value='Register' className={`bg-teal-200 p-2 rounded-full ${styles.submit}`} />
      </form>
      <p>Already have an account? <Link href={"/"}><span className='text-sky-950 font-bold mb-1 p-2'>Login</span></Link> </p>
    </div>
  )
}

export default Signup