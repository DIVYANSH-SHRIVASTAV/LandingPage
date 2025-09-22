export default function Landing({ dark }) {
  return (
    <div className={`flex flex-col items-center justify-center h-[calc(100vh-64px)] ${dark ? "bg-gray-900 text-white" : "bg-white text-black"}`}>
      <h1 className="text-5xl font-bold mb-6">Welcome to MERN Auth 🚀</h1>
      <p className="text-lg max-w-xl text-center">
        Now with a {dark ? "✨Dark" : "☀️Light"} theme toggle.
      </p>
    </div>
  );
}