'use client'
import { useRouter } from 'next/navigation';
export default function ThanksPage () {
  const router = useRouter();
  return (
    <>
      <h1>Thank you</h1>
      <button onClick={() => {
        router.push('/')
      }}>Back to Homepage</button>
    </>
  )
}