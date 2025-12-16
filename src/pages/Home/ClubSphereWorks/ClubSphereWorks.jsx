import { Search, UserPlus, LineChart, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

const ClubSphereWorks = () => {
  const steps = [
    {
      id: "01",
      title: "Discover Clubs",
      description:
        "Explore a wide variety of local clubs based on your interests and hobbies in your area.",
      icon: <Search className="w-7 h-7" />,
      accentColor: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      id: "02",
      title: "Join & Participate",
      description:
        "Easily join your favorite clubs and participate in events and community discussions.",
      icon: <UserPlus className="w-7 h-7" />,
      accentColor: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      id: "03",
      title: "Track Your Progress",
      description:
        "Keep track of your club activities, personal achievements and growth.",
      icon: <LineChart className="w-7 h-7" />,
      accentColor: "text-emerald-600",
      bgColor: "bg-emerald-50",
    },
    {
      id: "04",
      title: "Secure Membership",
      description:
        "Manage your digital ID and verified status within a safe, private club environment.",
      icon: <ShieldCheck className="w-7 h-7" />,
      accentColor: "text-purple-600",
      bgColor: "bg-purple-50",
    },
  ];

   const cardVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.2, duration: 0.5 },
    }),
  };

  return (
    <section className="py-20 px-4 lg:px-8">
      <div className="md:max-w-7xl w-full mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-6xl font-extrabold tracking-tight mb-4">
            How <span className="text-orange-600">ClubSphere</span> Works
          </h2>
          <p className="text-slate-500 text-lg max-w-2xl mx-auto">
            Experience a seamless way to manage your community interactions in
            just four simple steps.
          </p>
        </div>

        {/* Responsive Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              initial="hidden"
              custom={i}
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              variants={cardVariants}
              className="group relative bg-white p-10 rounded-4xl shadow-sm border border-slate-100 hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 flex flex-col items-center text-center"
            >
              {/* Icon Container */}
              <div
                className={`relative z-10 mb-8 p-5 rounded-2xl ${step.bgColor} ${step.accentColor} group-hover:scale-110 transition-transform duration-500 shadow-inner`}
              >
                {step.icon}
              </div>

              {/* Text Content */}
              <h3 className="relative z-10 text-xl font-bold text-slate-800 mb-4 group-hover:text-orange-600 transition-colors duration-300">
                {step.title}
              </h3>
              <p className="relative z-10 text-slate-500 leading-relaxed text-sm font-medium">
                {step.description}
              </p>

              {/* Bottom Decorative Element */}
              <div className="mt-8 h-1 w-12 bg-slate-100 rounded-full group-hover:w-24 group-hover:bg-orange-500 transition-all duration-500"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ClubSphereWorks;
