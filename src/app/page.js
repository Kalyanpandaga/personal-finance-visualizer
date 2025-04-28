import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6">
      <h1 className="text-4xl font-bold mb-4">Welcome to Personal Finance Visualizer!</h1>
      <p className="text-lg text-gray-600 mb-6">Manage your transactions, categories, and budgets easily.</p>
      <Link
        href="/transactions"
        className="inline-block bg-primary text-white px-6 py-3 rounded-lg shadow-md hover:bg-primary/90 transition"
      >
        Get Started
      </Link>
    </main>
  );
}
