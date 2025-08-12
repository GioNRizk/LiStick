import React from "react";
import { Eye, Navigation, Users, Heart, Shield, Zap, Target, Award } from "lucide-react";

// shared components
import Hero from "../components/features/Hero";
import Section from "../components/ui/Section";
import CTA from "../components/common/CTA";

// images
import pic1 from "../assets/images/pic1.jpg";
import pic2 from "../assets/images/pic2.jpg";
import pic3 from "../assets/images/pic3.jpg";

const productImages = [
  { id: 1, image: pic1 },
  { id: 2, image: pic2 },
  { id: 3, image: pic3 },
];

const AboutPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      {/* HERO — uses the shared component with a shorter height */}
      <Hero
        badge={
          <div className="inline-flex items-center justify-center w-7 h-7 bg-gradient-to-r from-blue-500 to-teal-500 rounded-lg">
            <Eye className="w-4 h-4 text-white" />
          </div>
        }
        title={
          <span className="bg-gradient-to-r from-blue-400 via-teal-400 to-purple-400 bg-clip-text text-transparent">
            LiStick
          </span>
        }
        subtitle="Pioneering a new era of independence and safety for the visually impaired through cutting-edge technology."
        showScrollHint
      />

      {/* Product Showcase */}
      <Section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
            See LiStick in Action
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            A revolutionary device meticulously designed for reliability and ease of use.
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {productImages.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 bg-white"
              >
                <img
                  src={item.image}
                  alt={`LiStick product image ${item.id}`}
                  className="w-full h-full object-contain p-3 transition-transform duration-500 ease-in-out group-hover:scale-105"
                  loading="lazy"
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-500 transition-all duration-500 opacity-0 group-hover:opacity-100"></div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Feature Highlights */}
      <Section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Revolutionary Features</h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Every aspect of LiStick is designed to enhance independence and safety.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: Eye, title: "Advanced Obstacle Detection", description: "Real-time ultrasonic sensing keeps you aware of hazards ahead.", color: "from-blue-500 to-blue-600" },
            { icon: Navigation, title: "Precise GPS Tracking", description: "Accurate location services and caregiver visibility for peace of mind.", color: "from-teal-500 to-teal-600" },
            { icon: Zap, title: "Li-Fi Communication", description: "Fast, secure, light-based data transfer between cane and hub.", color: "from-purple-500 to-purple-600" },
            { icon: Shield, title: "Safety-First Design", description: "Redundant systems and clear alerts inspire user confidence.", color: "from-green-500 to-green-600" },
            { icon: Target, title: "Precision Navigation", description: "Seamless guidance indoors and outdoors.", color: "from-orange-500 to-orange-600" },
            { icon: Heart, title: "User-Centric & Ergonomic", description: "Comfortable grip and intuitive controls for all-day use.", color: "from-rose-500 to-rose-600" },
          ].map((f, i) => (
            <div key={i} className="group bg-white border border-gray-200 rounded-2xl p-8 hover:shadow-xl transition-all duration-500 hover:-translate-y-1">
              <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${f.color} rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <f.icon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Mission */}
      <Section className="py-16 bg-gradient-to-br from-blue-50 via-white to-teal-50">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-teal-500/20 rounded-3xl blur-2xl"></div>
              <div className="relative bg-white rounded-3xl p-8 shadow-xl">
                <Heart className="w-16 h-16 text-blue-500 mb-6" />
                <h2 className="text-4xl font-bold mb-6 text-gray-900">Our Mission</h2>
                <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                  LiStick was born from a simple yet profound goal: to empower visually impaired individuals with the freedom of safe and independent navigation.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  We deliver a cutting-edge assistive device that addresses critical mobility challenges and provides peace of mind for users and their loved ones.
                </p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative flex items-center justify-center">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-200 to-teal-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
              <div className="relative w-80 h-80 bg-gradient-to-br from-blue-500 to-teal-500 rounded-full flex items-center justify-center shadow-2xl">
                <Users className="w-32 h-32 text-white" />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Impact */}
      <Section className="py-16 bg-gray-900 text-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Making a Real Impact</h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            LiStick is more than a product—it’s a commitment to accessibility.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            { number: "500K+", label: "People Supported", icon: Users },
            { number: "99.9%", label: "Accuracy Rate", icon: Target },
            { number: "24/7", label: "Support Available", icon: Shield },
          ].map((s, i) => (
            <div key={i} className="bg-white/10 rounded-2xl p-8 backdrop-blur-sm hover:bg-white/20 transition-all duration-300">
              <s.icon className="w-12 h-12 text-blue-400 mx-auto mb-4" />
              <div className="text-4xl font-bold text-white mb-2">{s.number}</div>
              <div className="text-gray-300">{s.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* Team */}
      <Section className="py-16 bg-white">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-3">Meet the Innovators</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Engineers, designers, and accessibility advocates shaping real change.
          </p>
        </div>

        <div className="bg-gradient-to-r from-blue-50 to-teal-50 rounded-3xl p-12 text-center">
          <Award className="w-16 h-16 text-blue-500 mx-auto mb-6" />
          <h3 className="text-2xl font-bold mb-4">Innovation Through Collaboration</h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our diverse team blends assistive tech, UX, and engineering to build solutions that truly help people.
          </p>
        </div>
      </Section>

      {/* CTA */}
      <CTA
        title="Ready to Experience Freedom?"
        subtitle="Join thousands of users who discovered independence with LiStick."
        primary={{ label: "Get LiStick Today", href: "/contact" }}
        secondary={{ label: "Contact Sales", href: "/contact" }}
      />
    </div>
  );
};

export default AboutPage;
