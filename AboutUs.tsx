import { motion } from "framer-motion";

export default function AboutUs({ onBack }: { onBack: () => void }) {
  const team = [
    {
      name: "Kevin",
      role: "Team Lead",
      icon: "🚀",
      gradient: "from-cyan-500 to-blue-500"
    },
    {
      name: "Akash",
      role: "AI Engineer",
      icon: "⚡",
      gradient: "from-amber-500 to-red-500"
    },
    {
      name: "Mohsin",
      role: "Full-Stack Developer",
      icon: "💻",
      gradient: "from-emerald-500 to-cyan-500"
    },
    {
      name: "Harshi",
      role: "Research Analyst",
      icon: "🔬",
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="relative min-h-screen text-white overflow-hidden"
         style={{ background: "linear-gradient(135deg,#0f172a,#1e293b,#0f172a)" }}>

      {/* Glowing Grid Background */}
      <div className="absolute inset-0 opacity-20">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, #10b98133 1px, transparent 1px),
              linear-gradient(to bottom, #06b6d433 1px, transparent 1px)
            `,
            backgroundSize: "70px 70px"
          }}
        ></div>
      </div>

      {/* Animated Orbs */}
      <motion.div
        className="absolute top-24 left-10 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle,rgba(16,185,129,0.5),transparent)" }}
        animate={{ x: [0, 60, 0], y: [0, -40, 0] }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      <motion.div
        className="absolute bottom-10 right-10 w-80 h-80 rounded-full blur-3xl opacity-30"
        style={{ background: "radial-gradient(circle,rgba(139,92,246,0.5),transparent)" }}
        animate={{ x: [0, -60, 0], y: [0, 40, 0] }}
        transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
      ></motion.div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 pt-28 pb-20">

        {/* Header */}
        <motion.h1
          className="text-5xl md:text-6xl font-extrabold text-center mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
            Visionary Minds
          </span>
        </motion.h1>

        <motion.p
          className="text-xl text-gray-300 text-center max-w-2xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          We are a student-driven team focused on transforming healthcare diagnostics
          using AI-powered brain tumor detection systems.
        </motion.p>

        {/* Mission */}
        <motion.div
          className="mt-16 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-10"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-3xl font-bold mb-4 flex items-center gap-3">
            <span className="text-5xl">🧠</span> Our Mission
          </h2>

          <p className="text-gray-300 text-lg leading-relaxed">
            To revolutionize medical imaging with intelligent, accurate, and
            accessible tumor detection tools. Our goal is to assist healthcare
            professionals with AI systems that bring clarity, speed, and precision
            to diagnosis.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">⚡</div>
              <h3 className="font-semibold text-white text-xl">Fast Results</h3>
              <p className="text-gray-400 text-sm">Under 60 seconds per scan</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🎯</div>
              <h3 className="font-semibold text-white text-xl">High Accuracy</h3>
              <p className="text-gray-400 text-sm">Precision-driven detections</p>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
              <div className="text-3xl mb-3">🤝</div>
              <h3 className="font-semibold text-white text-xl">Designed for Hospitals</h3>
              <p className="text-gray-400 text-sm">Built for real-world use</p>
            </div>
          </div>
        </motion.div>

        {/* TEAM */}
        <motion.div
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-4xl font-bold text-center mb-10">Meet the Team</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
            {team.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * i }}
                whileHover={{ y: -10, scale: 1.05 }}
                className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-8 text-center relative"
              >
                {/* Glow */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${member.gradient} opacity-20 blur-2xl rounded-2xl`}
                />

                {/* Avatar */}
                <div className="relative z-10">
                  <div
                    className={`w-28 h-28 mx-auto rounded-full flex items-center justify-center text-6xl bg-gradient-to-br ${member.gradient}`}
                  >
                    {member.icon}
                  </div>

                  <h3 className="text-2xl font-bold mt-5">{member.name}</h3>
                  <p
                    className={`font-medium bg-gradient-to-r ${member.gradient} text-transparent bg-clip-text`}
                  >
                    {member.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
