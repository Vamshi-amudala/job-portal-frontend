export const Home = () => {
  return (
    <div className="fixed top-0 left-0 w-screen h-screen overflow-hidden">
      <img
        src="/images/home-page.jpg"
        alt="background"
        className="w-full h-full object-cover blur-sm scale-110"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-brightness-50"></div>

      <section className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center">
        <h1 className="text-gray-200 text-5xl font-bold mb-6 drop-shadow-lg text-glow">
          Welcome to Careerly
        </h1>
        <p className="text-gray-300 text-2xl font-mono mb-8 text-glow">
          Find your dream job today
        </p>

        <div className="flex gap-4">
          <button onClick={() => navigate("/register")}
          className="text-white font-semibold py-2 px-6 border border-gray-600 rounded shadow hover:scale-110 hover:bg-gray-600 transition">
            Join Us
          </button>
          <button  onClick={() => navigate("/login")}
          className="text-white font-semibold py-2 px-6 border border-gray-600 rounded shadow hover:scale-110 hover:bg-gray-600 transition">
            Explore Jobs
          </button>
        </div>
      </section>
    </div>
  );
};
