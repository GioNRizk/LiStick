// src/pages/About.tsx
import React from "react";
import { Eye, Navigation, Users, Heart, Shield, Zap, Target, Award } from "lucide-react";

// shared components
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";

// gallery images
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";

// team photos
import gioImg from "../assets/images/gio.jpg";
import marcImg from "../assets/images/marc.jpg";
import rimaImg from "../assets/images/teamli.jpg"; // Rima photo (we crop via CSS)

// award banner photo (team)
//import teamAwardImg from "../assets/images/teamli.jpg";

const productImages = [
  { id: 1, image: pic1 },
  { id: 2, image: pic2 },
  { id: 3, image: pic3 },
];

const teamMembers = [
  {
    name: "Gio Rizk",
    role: "Computer Engineer",
    subtitle: "Head of LiStick Software",
    image: gioImg,
    cropStyle: "object-center",
  },
  {
    name: "Marc Salameh",
    role: "Computer Engineer",
    subtitle: "Functional Consultant",
    image: marcImg,
    cropStyle: "object-center",
  },
  {
    name: "Rima Mghames",
    role: "Biomedical Engineer",
    subtitle: "Head of LiStick Medical",
    image: rimaImg,
    cropStyle: "object-[center_15%] scale-150", // Focus on center person, zoom in
  },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO — shared component, consistent height with other pages */}
      <Hero
        badge={
          <div className="inline-flex items-center justify-center w-8 h-8 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-xl shadow-lg">
            <Eye className="w-5 h-5 text-white" />
          </div>
        }
        title={
          <span className="bg-gradient-to-r from-blue-500 via-teal-500 to-purple-500 bg-clip-text text-transparent font-extrabold">
            LiStick
          </span>
        }
        subtitle="Pioneering a new era of independence and safety for the visually impaired through cutting-edge technology and compassionate innovation."
        showScrollHint
      />

      {/* Product Showcase */}
      <Section className="py-20 bg-gradient-to-br from-gray-50 via-blue-50/30 to-teal-50/30 relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-blue-100/40 via-transparent to-transparent" />
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-teal-200/30 to-transparent rounded-full blur-3xl" />
        
        <div className="relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl mb-6">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-gray-900 via-blue-800 to-teal-800 bg-clip-text text-transparent">
              See LiStick in Action
            </h2>
            <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light leading-relaxed">
              A revolutionary assistive device meticulously engineered for reliability, accessibility, and seamless daily use.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {productImages.map((item, index) => (
                <div
                  key={item.id}
                  className="group relative aspect-[3/4] rounded-3xl overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-700 bg-white/80 backdrop-blur-sm border border-white/50"
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-teal-500/5" />
                  <img
                    src={item.image}
                    alt={`LiStick product showcase ${item.id}`}
                    className="w-full h-full object-contain p-4 transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-1"
                    loading="lazy"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute inset-0 rounded-3xl border-2 border-transparent group-hover:border-gradient-to-r group-hover:from-blue-400 group-hover:to-teal-400 transition-all duration-500" />
                  
                  {/* Hover overlay content */}
                  <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-white font-semibold text-lg">Innovation in Motion</p>
                    <p className="text-white/80 text-sm">Advanced assistive technology</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Feature Highlights */}
      <Section className="py-20 bg-white relative">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl mb-6">
            <Zap className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Revolutionary Features</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
            Every component of LiStick is meticulously crafted to enhance independence, safety, and confidence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {[
            { 
              icon: Eye, 
              title: "Advanced Obstacle Detection", 
              description: "Real-time ultrasonic sensing technology with 360° awareness keeps you informed of potential hazards ahead.", 
              color: "from-blue-500 to-blue-600",
              bgColor: "from-blue-50 to-blue-100/50"
            },
            { 
              icon: Navigation, 
              title: "Precise GPS Tracking", 
              description: "Military-grade location services with real-time caregiver visibility for ultimate peace of mind.", 
              color: "from-teal-500 to-teal-600",
              bgColor: "from-teal-50 to-teal-100/50"
            },
            { 
              icon: Zap, 
              title: "Li-Fi Communication", 
              description: "Lightning-fast, ultra-secure light-based data transfer between your cane and smart hub.", 
              color: "from-purple-500 to-purple-600",
              bgColor: "from-purple-50 to-purple-100/50"
            },
            { 
              icon: Shield, 
              title: "Safety-First Design", 
              description: "Triple-redundant safety systems with crystal-clear audio alerts inspire complete user confidence.", 
              color: "from-green-500 to-green-600",
              bgColor: "from-green-50 to-green-100/50"
            },
            { 
              icon: Target, 
              title: "Precision Navigation", 
              description: "Seamless indoor-outdoor guidance with centimeter-level accuracy and intuitive waypoint system.", 
              color: "from-orange-500 to-orange-600",
              bgColor: "from-orange-50 to-orange-100/50"
            },
            { 
              icon: Heart, 
              title: "Ergonomic Excellence", 
              description: "Thoughtfully designed grip with haptic feedback and intuitive controls for comfortable all-day use.", 
              color: "from-rose-500 to-rose-600",
              bgColor: "from-rose-50 to-rose-100/50"
            },
          ].map((f, i) => (
            <div 
              key={i} 
              className={`group relative bg-gradient-to-br ${f.bgColor} border border-gray-100/50 rounded-3xl p-8 hover:shadow-2xl transition-all duration-700 hover:-translate-y-2 overflow-hidden`}
              style={{
                animationDelay: `${i * 50}ms`,
              }}
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-white/30 to-transparent rounded-full blur-2xl" />
              
              <div className={`inline-flex items-center justify-center w-18 h-18 bg-gradient-to-r ${f.color} rounded-3xl mb-6 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-lg`}>
                <f.icon className="w-9 h-9 text-white" />
              </div>
              
              <h3 className="text-2xl font-bold mb-4 text-gray-900 group-hover:text-gray-800 transition-colors duration-300">
                {f.title}
              </h3>
              <p className="text-gray-600 leading-relaxed text-lg font-light group-hover:text-gray-700 transition-colors duration-300">
                {f.description}
              </p>
              
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-gray-200 to-transparent group-hover:via-blue-400 transition-all duration-500" />
            </div>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section className="py-20 bg-gradient-to-br from-blue-50 via-indigo-50/50 to-teal-50 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-tl from-teal-200/30 to-transparent rounded-full blur-3xl" />
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-teal-500/10 rounded-3xl blur-3xl" />
              <div className="relative bg-white/90 backdrop-blur-sm rounded-3xl p-10 shadow-2xl border border-white/50">
                <div className="flex items-center mb-8">
                  <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-teal-500 rounded-2xl flex items-center justify-center mr-6">
                    <Heart className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-4xl md:text-5xl font-black text-gray-900">Our Mission</h2>
                </div>
                
                <div className="space-y-6">
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    LiStick was born from a simple yet profound vision: to empower visually impaired individuals with unprecedented freedom through safe, reliable, and intelligent navigation technology.
                  </p>
                  <p className="text-xl text-gray-700 leading-relaxed font-light">
                    We are committed to delivering cutting-edge assistive solutions that don't just address mobility challenges—they eliminate barriers and unlock possibilities, providing peace of mind for users and their families.
                  </p>
                </div>
                
                <div className="mt-8 p-6 bg-gradient-to-r from-blue-50 to-teal-50 rounded-2xl border border-blue-100">
                  <p className="text-lg font-semibold text-blue-800 mb-2">"Technology with Purpose"</p>
                  <p className="text-gray-700 italic">Every line of code, every sensor calibration, every design decision is made with our users' independence in mind.</p>
                </div>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/40 via-purple-300/30 to-teal-300/40 rounded-full blur-3xl animate-pulse" />
              <div className="relative w-96 h-96 bg-gradient-to-br from-blue-500 via-indigo-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl border-4 border-white/20">
                <Users className="w-40 h-40 text-white animate-pulse" />
              </div>
              
              {/* Floating elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.5s' }}>
                <Zap className="w-8 h-8 text-white" />
              </div>
              <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-gradient-to-br from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '1s' }}>
                <Shield className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact */}
      <Section className="py-20 bg-gradient-to-br from-gray-900 via-blue-900/50 to-black text-white relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-800/30 via-transparent to-transparent" />
        
        <div className="text-center mb-16 relative z-10">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-2xl mb-6">
            <Award className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 bg-gradient-to-r from-white via-blue-200 to-teal-200 bg-clip-text text-transparent">
            Making a Real Impact
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-light">
            LiStick isn't just a product—it's a movement toward universal accessibility and independence.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center max-w-6xl mx-auto relative z-10">
          {[
            { number: "500K+", label: "Lives Enhanced", icon: Users, color: "from-blue-400 to-blue-500" },
            { number: "99.9%", label: "Accuracy Rate", icon: Target, color: "from-teal-400 to-teal-500" },
            { number: "24/7", label: "Support Available", icon: Shield, color: "from-purple-400 to-purple-500" },
          ].map((s, i) => (
            <div 
              key={i} 
              className="group bg-white/5 backdrop-blur-md rounded-3xl p-8 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all duration-500 hover:-translate-y-2"
              style={{
                animationDelay: `${i * 200}ms`,
              }}
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${s.color} rounded-2xl mx-auto mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <s.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-5xl font-black text-white mb-3 group-hover:scale-110 transition-transform duration-300">
                {s.number}
              </div>
              <div className="text-gray-300 text-lg font-medium">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="py-20 bg-gradient-to-br from-white via-gray-50/30 to-blue-50/30">
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl mb-6">
            <Users className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-5xl md:text-6xl font-black mb-6 text-gray-900">Meet the Innovators</h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-4xl mx-auto font-light">
            Passionate engineers, visionary designers, and dedicated accessibility advocates working together to reshape the future of assistive technology.
          </p>
        </div>

        <div className="mx-auto max-w-7xl grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {[teamMembers[0], teamMembers[2], teamMembers[1]].map((member, index) => (
            <div
              key={member.name}
              className="group relative rounded-3xl border border-gray-200/50 bg-white/80 backdrop-blur-sm p-8 shadow-lg hover:shadow-2xl transition-all duration-700 hover:-translate-y-3 overflow-hidden"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Background decoration */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl from-blue-100/50 to-transparent rounded-full blur-2xl" />
              
              <div className="relative z-10">
                <div className="relative mx-auto h-44 w-44 overflow-hidden rounded-3xl ring-4 ring-gray-100 group-hover:ring-blue-300 transition-all duration-500 mb-6">
                  <img
                    src={member.image}
                    alt={`${member.name} - ${member.role}`}
                    className={`h-full w-full object-cover transition-all duration-700 group-hover:scale-110 ${member.cropStyle}`}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                </div>
                
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold text-gray-900 group-hover:text-blue-700 transition-colors duration-300">
                    {member.name}
                  </h3>
                  <p className="text-lg font-semibold text-teal-600 group-hover:text-teal-700 transition-colors duration-300">
                    {member.role}
                  </p>
                  {member.subtitle && (
                    <p className="text-gray-600 font-medium group-hover:text-gray-700 transition-colors duration-300">
                      {member.subtitle}
                    </p>
                  )}
                </div>
                
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 via-blue-400/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-3xl flex items-end p-6">
                  <div className="text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                    <p className="font-semibold text-lg mb-1">{member.name}</p>
                    <p className="text-blue-100 text-sm">{member.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Award highlight */}
      <Section className="py-16 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="mx-auto max-w-6xl">
          <div className="relative overflow-hidden rounded-3xl border border-blue-200/50 bg-white/90 backdrop-blur-sm shadow-2xl p-12">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-3xl mb-8 shadow-lg">
                <Award className="w-10 h-10 text-white" />
              </div>
              
              <h3 className="text-4xl sm:text-5xl lg:text-6xl font-black text-gray-900 mb-6">
                🏆 Champions of Innovation
              </h3>
              
              <div className="space-y-4 mb-8">
                <p className="text-xl sm:text-2xl text-gray-700 font-light">
                  Proud winners of the <span className="font-bold text-blue-600">UEC 2025 Entrepreneurship Competition</span>
                </p>
                
                <p className="text-xl sm:text-2xl text-gray-700 font-light">
                  Winner of <span className="font-bold text-teal-600">YCE 2025</span>
                </p>
              </div>
              
              <p className="text-gray-600 text-lg max-w-4xl mx-auto leading-relaxed">
                Recognized for our groundbreaking approach to assistive technology and our unwavering commitment to creating meaningful change in the lives of visually impaired individuals worldwide.
              </p>
            </div>
            
            {/* Decorative background elements */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-br from-yellow-200/30 to-orange-200/30 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tl from-blue-200/30 to-purple-200/30 rounded-full blur-3xl" />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Ready to Experience True Freedom?"
        subtitle="Join thousands of users worldwide who have discovered independence, safety, and confidence with LiStick's revolutionary assistive technology."
        primary={{ label: "Get LiStick Today", href: "/contact" }}
        secondary={{ label: "Schedule a Demo", href: "/contact" }}
      />
    </div>
  );
};

export default AboutPage;