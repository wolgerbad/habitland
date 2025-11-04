'use client';

import Link from 'next/link';
// import { signIn } from '../lib/actions';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';
import { checkJwtValidity, generateToken } from '../_lib/helpers';
import { getCookie } from '../_lib/actions';

export default function LoginClient() {
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleLogin(formData) {
    setError('');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch(`/api/auth/login`, {
      method: 'POST',
      body: JSON.stringify({ email, password }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const result = await res.json();

    if (result.error) return setError(result.error);

    router.refresh();
  }

  return (
    <div className="m-10 max-w-72 text-fgPrimary">
      <h1 className="bg-neutral-200 p-2 text-gray-700 rounded-lg mb-4">
        ⚠️ This is a beta version. Some functions may not work as expected.
      </h1>
      <form className="flex flex-col gap-2" action={handleLogin}>
        <div>
          <label className="block">Email:</label>
          <input
            type="email"
            name="email"
            required
            className="border-2 border-fgPrimary w-full px-2 py-0.5 text-black"
          />
        </div>
        <div>
          <label className="block">Password:</label>
          <input
            type="password"
            name="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
        </div>
        {error && <p className="text-red-800 text-sm max-w-80">{error}</p>}
        <div className="self-end mb-8">
          <LoginButton />
        </div>
      </form>
      <div className="flex justify-between">
        Have no account?{' '}
        <Link href="/signup" className="underline decoration-blue-500">
          Sign Up!
        </Link>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed text-black' : ''
      } border-2 border-fgPrimary px-4 py-1`}
    >
      {pending ? 'Logging in..' : 'Log in'}
    </button>
  );
}
