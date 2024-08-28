"use client"

import axios from "axios"
import { useState } from "react"
import { setAdmin } from "@/features/adminSlice";
import { useAppDispatch } from "@/hooks/hooks";
import { toast } from 'react-hot-toast';
import { useRouter } from "next/navigation";

function AdminLogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handlerSumit = async (e: any)=>{
    e.preventDefault()
    try {
      const response = await axios.post('/api/userAuth/admin-login', {username, password});
      const admin = response.data.admin
      toast.error(response.data.msg)
      dispatch(setAdmin({ admin: admin }));
      router.push('/admin/dashbord') 
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <form onSubmit={handlerSumit}>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
        <input type="text" className="grow" placeholder="Username" value={username} onChange={(e)=>setUsername(e.target.value)} />
      </label>
      <label className="input input-bordered flex items-center gap-2 mb-4">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
        <input type="password" className="grow" placeholder="Password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </label>
      <button className="btn">Login</button>
    </form>
  )
}

export default AdminLogin
