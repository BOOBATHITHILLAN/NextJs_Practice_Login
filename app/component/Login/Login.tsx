"use client"
import { useRouter } from "next/navigation"
import styles from './login.module.css'
import { useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import Link from "next/link";
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';

const schema = yup.object().shape({
  email: yup.string().email().required("Email required"),
  password: yup.string().required("Password required")
})


export default function Login() {

  const state: any = useSelector(state => state);
  const dispatch = useDispatch();

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });
  const [checkpassword, setCheckpassword] = useState(false);
  const [userNotExist, setUserNotExist] = useState(false);
  const router = useRouter()


  const handleLogin = (formData: any) => {

    const user = state.find((user: any) => user.email === formData.email)
    if (user && user.password === formData.password) {
      router.push("/home")
      setUserNotExist(false)
    } else if (user && user.password !== formData.password) {
      setCheckpassword(true)
      setTimeout(() => {
        setCheckpassword(false)
      }, 4000);
    } else {
      setUserNotExist(true)
      reset()
      setTimeout(() => {
        setUserNotExist(false);
      }, 4000);

    }
  }

  return (
    <div className={`bg-slate-200 align-middle rounded-md justify-center p-10 m-10 ${styles.container}`}>
      <form onSubmit={handleSubmit(handleLogin)}>
        <h1 className='flex justify-center mb-6 '>Login Page</h1>
        <label htmlFor="email" className='block mb-2'>Email:</label>
        <input type="email" {...register('email')} className={`block mb-2 p-1 ${styles.email}`} id='email' />
        <p className='text-center text-red-950 font-bold mb-1'>{errors.email?.message}</p>

        <label htmlFor="password" className='block mb-2'>Password:</label>
        <input type="password" {...register('password')} className={`block mb-2 p-1 ${styles.password}`} id='password' />
        <p className='text-center text-red-950 font-bold mb-1'>{errors.password?.message}</p>
        <p className='text-center text-red-950 font-bold mb-1'>{userNotExist && "User not registered yet... "}</p>
        <p className='text-center text-red-950 font-bold mb-1'>{checkpassword && "Invalid credentials... "}</p>

        <input type="submit" value={"Login"} className={`bg-teal-200 p-2 rounded-full ${styles.submit}`} />
      </form>
      <p>Dont have an account?  <Link href={"/signup"}><span className='text-sky-950 font-bold p-2'>Register</span></Link> </p>

    </div>
  )
}