export const About = () => {
  return (
    <div className="relative h-screen w-screen overflow-hidden">
      {/* Background image */}
      <img
        src="/images/about-page.jpg"
        alt="background"
        className="absolute top-0 left-0 w-full h-full object-cover blur-sm scale-105"
      />

      <div className="absolute inset-0 bg-black/40 backdrop-brightness-50"></div>


      <section className="absolute inset-0 z-10 flex flex-col items-center justify-center px-6 text-center overflow-y-auto">
        <h1 className="text-gray-200 text-5xl font-bold mb-6 drop-shadow-lg text-glow">
          Who We Are
        </h1>

        <p className="text-gray-300 text-lg max-w-3xl mb-10 leading-relaxed font-mono">
          We are a next-gen job platform designed to connect talented job seekers with 
          top employers. Our mission is to simplify hiring and empower careers with 
          technology-driven solutions.
        </p>

        <h2 className="text-2xl font-semibold text-gray-100 mb-4 text-glow">Our Mission</h2>
        <p className="text-gray-300 max-w-2xl mb-10">
          To connect talent with opportunities through <span className="font-semibold text-white">technology, trust, and transparency</span>.
        </p>

        <div className="bg-black/40 p-6 rounded-2xl shadow-lg max-w-3xl">
          <h3 className="text-xl font-semibold text-gray-100 mb-4 text-glow">Why Choose Us?</h3>
          <ul className="text-gray-300 space-y-3 list-disc list-inside text-left font-mono">
            <li>Smart job matching powered by technology</li>
            <li>Trusted platform for both employers & seekers</li>
            <li>Fast and transparent hiring process</li>
            <li>Opportunities across industries & locations</li>
          </ul>
        </div>
      </section>
    </div>
  );
};
