'use client'
import { useState } from 'react';
import {
  login,
} from '@/redux/features/auth-slice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogin = () => {
    dispatch(login())
      .unwrap()
      .then(() => {
        router.push('/admin')
      })
  };

  return (
    <div>
      <h1>Login</h1>
      <label htmlFor='username'>Username</label>
      <input id='username' type="text" onChange={(e) => setUsername(e.target.value) } />
      <br />
      <label htmlFor='password'>Password</label>
      <input id='password' type="password" onChange={(e) => setPassword(e.target.value) } />
      <br/>
      <button onClick={onClickLogin}>Login</button>
    </div>
  )
}