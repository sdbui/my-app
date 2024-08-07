'use client'
import { useState } from 'react';
import {
  login,
  logout,
  toggleAdmin
} from '@/redux/features/auth-slice'
import { useDispatch } from 'react-redux';
import { AppDispatch } from '@/redux/store';
import { useRouter } from 'next/navigation';

export default function Login() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const dispatch = useDispatch<AppDispatch>();

  const onClickLogin = () => {
    dispatch(login(username))
  };
  const onClickToggle = () => {
    dispatch(toggleAdmin());
  };
  const onClickLogout = () => {
    dispatch(logout());
  };

  return (
    <div>
      <p>debug {username}</p>
      <input type="text" onChange={(e) => setUsername(e.target.value) } />
      <br />
      <button onClick={() => {
        router.push('/assessment')
      }}>Back to Homepage</button>
      <button onClick={onClickLogin}>Login</button>
      <br/>
      <button onClick={onClickLogout}>Logout</button>
      <button onClick={onClickToggle}>toggle admin</button>
    </div>
  )
}