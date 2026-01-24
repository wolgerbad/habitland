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
    <div className="mt-8 min-h-[60vh] flex flex-col gap-4 items-center justify-center p-6">
          <div className='flex flex-col items-center gap-2'>
            <h2 className="text-buttonCta text-3xl font-semibold">Create your account</h2>
            <p className="text-sm text-gray-500">
              Sign up to start building healthy habits
            </p>
          </div>
      <div className="w-full max-w-md bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-lg shadow-sm border border-gray-200 dark:border-gray-800 p-8">
        <form className="flex flex-col gap-4" action={handleSignUp}>
          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-fgPrimary block mb-1"
            >
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              className="w-full rounded-lg border border-borderPrimary px-3 py-2 bg-bgPrimary text-fgPrimary placeholder-gray-400 focus:outline-none transition"
            />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-fgPrimary block mb-1"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="w-full rounded-lg border border-borderPrimary px-3 py-2 bg-bgPrimary text-fgPrimary focus:outline-none  transition"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-fgPrimary block mb-1"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="w-full rounded-lg border border-borderPrimary px-3 py-2 bg-bgPrimary text-fgPrimary focus:outline-none transition"
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

        <div className="mt-6 text-center text-sm flex justify-between items-center">
          Already have an account?{' '}
          <Link href="/login" className="text-fgPrimary font-medium underline">
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
      disabled={pending}
      className={`${
        pending ? 'bg-gray-400 cursor-not-allowed' : ''
      } bg-buttonCta hover:bg-buttonCta/90 px-6 py-2 rounded-lg`}
    >
      {pending ? 'Signing up..' : 'Sign Up'}
    </button>
  );
}
