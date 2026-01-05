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
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-bgPrimary text-fgPrimary backdrop-blur-sm rounded-2xl shadow-xl border border-borderPrimary dark:border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="hidden sm:flex w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 items-center justify-center text-white text-lg font-semibold">
            H
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Welcome back</h2>
            <p className="text-sm text-fgPrimary/60">
              Log in to your Habitland account
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="rounded-md bg-yellow-50/80 p-3 text-sm text-yellow-800 border border-yellow-100">
            ⚠️ This is a beta version. Some functions may not work as expected.
          </div>
        </div>

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
              placeholder="you@company.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-fgPrimary/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
              placeholder="••••••••"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-fgPrimary/80 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
          <Link href="/signup" className="text-blue-500 font-medium underline">
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
      className={`${
        pending ? 'bg-gray-200 cursor-not-allowed text-black' : ''
      } border-2 border-fgPrimary px-4 py-2 rounded-lg hover:bg-fgPrimary/10`}
    >
      {pending ? 'Logging in..' : 'Log in'}
    </button>
  );
}
