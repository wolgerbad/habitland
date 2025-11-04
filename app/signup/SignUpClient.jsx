'use client';

import Link from 'next/link';
import { useFormStatus } from 'react-dom';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SignUpClient() {
  const [error, setError] = useState('');

  const router = useRouter();

  async function handleSignUp(formData) {
    setError('');
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');

    const res = await fetch('/api/auth/signup', {
      method: 'POST',
      body: JSON.stringify({ name, email, password }),
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
      <form className="flex flex-col gap-2" action={handleSignUp}>
        <div>
          <label className="block">Name:</label>
          <input
            name="name"
            type="text"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
        </div>
        <div>
          <label className="block">Email:</label>
          <input
            name="email"
            type="email"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
        </div>
        <div>
          <label className="block">Password</label>
          <input
            name="password"
            type="password"
            className="border-2 border-gray-900 w-full px-2 py-0.5 text-black"
          />
        </div>
        {error && <p className="text-red-800 text-sm w-80">{error}</p>}
        <div className="self-end mb-4">
          <SignUpButton />
        </div>
      </form>
      <div className="flex justify-between">
        Already have an account?{' '}
        <Link href="/login" className="underline decoration-blue-600">
          Log In!
        </Link>
      </div>
    </div>
  );
}

function SignUpButton() {
  const { pending } = useFormStatus();
  return (
    <button
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed' : ''
      } border-2 border-fgPrimary px-3 py-1`}
    >
      {pending ? 'Signing up..' : 'Sign Up'}
    </button>
  );
}
