import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
export default function Portfolio() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6 py-12">
      <div className="text-center space-y-6">
        <h1 className="text-5xl font-extrabold text-blue-400 animate-fade-in">
          Alao Abdul-salam Olayinka
        </h1>
        <p className="text-xl max-w-2xl mx-auto leading-relaxed">
          A passionate software engineer specializing in modern web development.
          I build high-performance applications using React, Next.js, and
          Node.js.
        </p>
        <div className="flex gap-6 mt-6 justify-center">
          <a
            href="#projects"
            className="bg-blue-500 px-6 py-3 rounded-full text-lg font-semibold hover:bg-blue-600 transition duration-300"
          >
            View Projects
          </a>
          <a
            href="#contact"
            className="border border-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-800 transition duration-300"
          >
            Contact Me
          </a>
        </div>
        <div className="flex gap-6 mt-6 text-3xl justify-center">
          <a
            href="https://github.com/yourgithub"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaGithub />
          </a>
          <a
            href="https://linkedin.com/in/yourlinkedin"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaLinkedin />
          </a>
          <a
            href="https://twitter.com/yourtwitter"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition duration-300"
          >
            <FaTwitter />
          </a>
        </div>
      </div>

      {/* About Section */}
      <section id="about" className="mt-16 text-center max-w-3xl space-y-4">
        <h2 className="text-4xl font-bold text-blue-400">About Me</h2>
        <p className="text-lg text-gray-300">
          Passionate software engineer with experience in full-stack
          development. I enjoy solving problems, optimizing code, and creating
          efficient, scalable applications.
        </p>
      </section>

      {/* Skills Section */}
      <section id="skills" className="mt-16 text-center max-w-3xl space-y-4">
        <h2 className="text-4xl font-bold text-blue-400">Skills</h2>
        <p className="text-lg text-gray-300">
          React, Next.js, Node.js, Tailwind CSS, MongoDB, PostgreSQL, Firebase
        </p>
      </section>

      {/* Projects Section */}
      <section id="projects" className="mt-16 text-center max-w-3xl space-y-4">
        <h2 className="text-4xl font-bold text-blue-400">Projects</h2>
        <p className="text-lg text-gray-300">
          Some of my featured work includes:
        </p>
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold">E-commerce Platform</h3>
            <p className="mt-2 text-gray-400">
              Built with Next.js and Stripe for seamless transactions.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold">Task Management App</h3>
            <p className="mt-2 text-gray-400">
              A productive app using React and Firebase for real-time updates.
            </p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition duration-300">
            <h3 className="text-2xl font-semibold">Personal Portfolio</h3>
            <p className="mt-2 text-gray-400">
              A sleek and responsive portfolio showcasing my skills.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="mt-16 text-center max-w-3xl space-y-4">
        <h2 className="text-4xl font-bold text-blue-400">Contact</h2>
        <p className="text-lg text-gray-300">
          Feel free to reach out via email or social media:
        </p>
        <p className="text-lg text-blue-400 font-semibold">
          yourname@example.com
        </p>
      </section>
    </div>
  );
}
