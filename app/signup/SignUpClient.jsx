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
    <div className="min-h-[60vh] flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200 dark:border-gray-800 p-8">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center text-white text-lg font-semibold">
            H
          </div>
          <div>
            <h2 className="text-2xl font-semibold">Create your account</h2>
            <p className="text-sm text-gray-500">
              Sign up to start building healthy habits
            </p>
          </div>
        </div>

        <div className="mb-4">
          <div className="rounded-md bg-yellow-50/80 p-3 text-sm text-yellow-800 border border-yellow-100">
            ⚠️ This is a beta version. Some functions may not work as expected.
          </div>
        </div>

        <form className="flex flex-col gap-4" action={handleSignUp}>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Your full name"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="you@company.com"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700 block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              className="w-full rounded-lg border border-gray-200 px-3 py-2 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 transition"
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
              <SignUpButton />
            </div>
          </div>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-600 font-medium underline">
            Log in
          </Link>
        </div>
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
