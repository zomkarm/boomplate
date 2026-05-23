export default function Home() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-20">
      <h1 className="text-4xl font-bold mb-4">
        Next.js <span className="text-blue-400">App Router</span>
      </h1>
      <p className="text-gray-400 mb-8">
        Edit <code className="bg-gray-800 px-2 py-0.5 rounded text-sm">app/page.jsx</code> to start building.
      </p>

      <div className="grid grid-cols-2 gap-4">
        <a
          href="https://nextjs.org/docs"
          target="_blank"
          className="p-4 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="font-semibold mb-1">Docs →</h2>
          <p className="text-sm text-gray-500">Next.js official documentation</p>
        </a>
        <a
          href="/api/hello"
          className="p-4 border border-gray-800 rounded-lg hover:border-blue-500 transition-colors"
        >
          <h2 className="font-semibold mb-1">API Route →</h2>
          <p className="text-sm text-gray-500">Hit the sample API endpoint</p>
        </a>
      </div>
    </main>
  );
}
