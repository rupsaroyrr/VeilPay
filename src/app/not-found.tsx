import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-onyx-950 text-white px-4 text-center">
      <div className="luxury-card p-8 sm:p-12 max-w-md w-full flex flex-col items-center space-y-6">
        <span className="text-emerald-neon text-3xl">✦</span>
        <h1 className="text-4xl font-bold font-mono text-gradient-silver">404</h1>
        <p className="text-sm text-onyx-300">
          The requested page or confidential route could not be found in the Midnight enclave.
        </p>
        <Link
          href="/"
          className="px-6 py-2.5 rounded-full bg-white text-onyx-950 font-bold text-xs hover:bg-neutral-200 transition shadow-sm"
        >
          Return to StealthPay
        </Link>
      </div>
    </div>
  );
}
