// src/pages/FeaturesPage.tsx
import React from "react";
import Hero from "../components/features/Hero";
import AnnotatedImage from "../components/features/AnnotatedImage";
import type { Hotspot } from "../components/features/AnnotatedImage";
import CTA from "../components/common/CTA";
import { BellRing, Droplets, SatelliteDish, Siren, Volume2, Waves } from "lucide-react";
import pic4 from "../assets/images/pic4.png";

const HOTSPOTS: Hotspot[] = [
  { x: "11%", y: "6%",  label: "Emergency Button", icon: <Siren className="h-4 w-4" /> },
  { x: "20%", y: "12%", label: "Freeze Button",    icon: <BellRing className="h-4 w-4" /> },
  { x: "18%", y: "30%", label: "Buzzer",           icon: <Volume2 className="h-4 w-4" /> },
  { x: "16%", y: "52%", label: "Ultrasonic Sensors", icon: <Waves className="h-4 w-4" /> },
  { x: "47%", y: "24%", label: "Speaker 1",        icon: <Volume2 className="h-4 w-4" /> },
  { x: "47%", y: "43%", label: "Speaker 2",        icon: <Volume2 className="h-4 w-4" /> },
  { x: "78%", y: "30%", label: "GPS",              icon: <SatelliteDish className="h-4 w-4" /> },
  { x: "45%", y: "94%", label: "Water Sensor",     icon: <Droplets className="h-4 w-4" /> },
];

const FeaturesPage: React.FC = () => {
  return (
    <div className="bg-white text-gray-800 overflow-x-hidden">
      <Hero
        badge="Feature Overview"
        title="Built-in Intelligence. Everyday Safety."
        subtitle="Explore the hardware and software that power LiStick—engineered for independence, safety, and confidence."
        showScrollHint
      />

      <AnnotatedImage
        image={pic4}
        hotspots={HOTSPOTS}
        description="Hover the markers to learn about each component. These modules work together to detect obstacles, share location and communicate with the app."
        bullets={[
          { icon: <Siren className="h-6 w-6 text-blue-600" />, title: "Emergency Button", desc: "Instant SOS with live GPS for caregivers." },
          { icon: <BellRing className="h-6 w-6 text-blue-600" />, title: "Freeze Button", desc: "Pause motion feedback for safe stops." },
          { icon: <Volume2 className="h-6 w-6 text-blue-600" />, title: "Dual Speakers & Buzzer", desc: "Clear audio/haptic alerts for hazards." },
          { icon: <SatelliteDish className="h-6 w-6 text-blue-600" />, title: "GPS Module", desc: "Reliable positioning for tracking & SOS." },
          { icon: <Waves className="h-6 w-6 text-blue-600" />, title: "Ultrasonic Sensors", desc: "Detects near/mid-range obstacles." },
          { icon: <Droplets className="h-6 w-6 text-blue-600" />, title: "Water Sensor (Tip)", desc: "Warns on puddles/flooded areas." },
        ]}
      />

      <CTA
        title="Ready to Experience LiStick?"
        subtitle="Pair powerful hardware with a smart app to unlock safer, more independent travel."
        primary={{ label: "Get a Demo", href: "#" }}
        secondary={{ label: "Contact Sales", href: "#" }}
      />
    </div>
  );
};

export default FeaturesPage;
