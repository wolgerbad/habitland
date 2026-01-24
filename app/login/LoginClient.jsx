'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useFormStatus } from 'react-dom';

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
    <div className="min-h-[60vh] mt-8 flex flex-col gap-6 items-center justify-center p-6">
          <div className='flex flex-col gap-2 items-center'>
            <h2 className="text-buttonCta text-3xl font-semibold">Sign in to your account</h2>
            <p className="text-sm text-fgPrimary/60">
              Welcome back! Please enter your details
            </p>
          </div>
      <div className="w-full max-w-md bg-bgPrimary text-fgPrimary backdrop-blur-sm rounded-xl shadow-sm border border-borderPrimary dark:border-gray-800 p-8 ">
        <form className="flex flex-col gap-4" action={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-fgPrimary/80 block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              required
              className="w-full rounded-lg border text-fgPrimary border-borderPrimary px-3 py-2 bg-bgPrimary placeholder-gray-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-fgPrimary/80 block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              // placeholder="••••••••"
              className="w-full rounded-lg border border-borderPrimary px-3 py-2 text-fgPrimary bg-bgPrimary placeholder-gray-400 focus:outline-none transition"
            />
          </div>

          {error && (
            <p className="text-sm text-red-700 bg-red-50 border border-red-100 rounded-md p-2">
              {error}
            </p>
          )}

          <div className="flex items-center justify-between mt-1">
            <div className="text-sm text-gray-600">&nbsp;</div>
            <div>
              <LoginButton />
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-sm flex justify-between items-center">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-fgPrimary font-medium underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

function LoginButton() {
  const { pending } = useFormStatus();

  return (
    <button
     disabled={pending}
      className={`${
        pending ? 'bg-gray-400 cursor-not-allowed text-black' : ''
      } bg-buttonCta text-white font-semibold hover:bg-buttonCta/90 rounded-lg hover:bg-fgPrimary/3 px-6 py-2`}
    >
      {pending ? 'Logging in..' : 'Login'}
    </button>
  );
}
