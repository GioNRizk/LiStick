import type { SlideItem } from "../components/features/SplitFeatureSlider";

export interface V2FeatureBlock {
  title: string;
  description: string;
  points: string[];
  status?: string;
  icon: "obstacle" | "vibration" | "motion" | "sweep" | "adaptive" | "urgency" | "stable" | "head" | "fall" | "sos" | "control" | "local";
}

export const V2_EMBEDDED_FEATURES: V2FeatureBlock[] = [
  {
    title: "Three-Zone Obstacle Awareness",
    description: "Left, right and head-level sensing helps detect directional, path and upper-body hazards.",
    points: [
      "Sequential sensor sampling reduces interference",
      "Head-level hazards receive the highest obstacle priority",
      "A blocked path activates both vibration motors",
    ],
    icon: "obstacle",
  },
  {
    title: "Directional Tactile Guidance",
    description: "Two vibration motors communicate obstacle direction and urgency.",
    points: [
      "Left obstacle → left vibration",
      "Right obstacle → right vibration",
      "Closer obstacle → stronger vibration",
      "Critical distance → maximum vibration",
    ],
    icon: "vibration",
  },
  {
    title: "IMU Motion Intelligence",
    description: "The MPU6050 allows Li-Stick to interpret motion context.",
    points: [
      "Detects left and right cane sweeping",
      "Detects faster walking movement",
      "Supports fall detection",
      "Adjusts obstacle behavior based on motion",
    ],
    icon: "motion",
  },
  {
    title: "Sweep-Aware Detection",
    description: "Li-Stick identifies intentional cane sweeping and reduces misleading warnings.",
    points: [
      "Opposite-side detection is suppressed during sweeping",
      "Side sensitivity is reduced",
      "Helps avoid unnecessary alerts near walls and surrounding objects",
    ],
    icon: "sweep",
  },
  {
    title: "Adaptive Warning Distance",
    description: "Detection thresholds change according to movement.",
    points: [
      "Standard thresholds during normal movement",
      "Earlier warnings during faster walking",
      "Head, side and path ranges expand when greater reaction time is needed",
    ],
    icon: "adaptive",
  },
  {
    title: "Predictive Collision Urgency",
    description: "Li-Stick considers how quickly obstacle distance is decreasing.",
    points: [
      "Compares current and previous readings",
      "Rapidly approaching obstacles receive stronger vibration",
      "Provides urgency before the critical distance is reached",
    ],
    icon: "urgency",
  },
  {
    title: "Stable Object Suppression",
    description: "The cane reduces repeated vibration from stable nearby objects.",
    points: [
      "Detects nearly unchanged side distances",
      "Suppresses continuous wall-like feedback",
      "Restores warning when the object begins moving closer again",
    ],
    icon: "stable",
  },
  {
    title: "Head-Level Safety Pattern",
    description: "A distinct two-motor pattern differentiates head hazards from normal side obstacles.",
    points: [
      "Uses both vibration motors",
      "Repeats while the obstacle remains",
      "Does not override higher-priority fall behavior",
    ],
    icon: "head",
  },
  {
    title: "Fall Detection",
    status: "Implemented — Validation Ongoing",
    description: "A staged process evaluates free-fall, impact and orientation change before confirming a possible fall.",
    points: [
      "Uses multiple conditions instead of one reading",
      "Provides local tactile confirmation",
      "Queues a caregiver alert",
      "Uses current or latest available location information",
    ],
    icon: "fall",
  },
  {
    title: "SOS Emergency Control",
    description: "Holding the SOS button triggers the emergency alert flow.",
    points: [
      "Remains available during privacy and pause modes",
      "Sends or queues emergency location data",
      "Connects the cane event with caregiver alerts",
    ],
    icon: "sos",
  },
  {
    title: "Multifunction Safety Control",
    description: "One physical control manages temporary alert mute, camera privacy and guidance pause.",
    points: [
      "Single click → temporary mute",
      "Double click → camera privacy",
      "Long press → temporary guidance pause",
      "SOS, GPS and heartbeat remain active",
    ],
    icon: "control",
  },
  {
    title: "Local Safety Independence",
    description: "The ESP32 remains responsible for immediate safety behavior.",
    points: [
      "Obstacle detection remains local",
      "Vibration continues without internet",
      "Cloud communication runs in the background",
      "AI and cloud services enhance but do not replace safety",
    ],
    icon: "local",
  },
];

export interface ConnectedSafetyItem {
  title: string;
  description: string;
}

export const CONNECTED_SAFETY_ITEMS: ConnectedSafetyItem[] = [
  { title: "GPS and live location", description: "Location data can support SOS handling, caregiver awareness and recent history." },
  { title: "Wi-Fi setup and reconnection", description: "A captive portal supports setup, stored credentials and automatic reconnection." },
  { title: "Heartbeat status", description: "The current firmware sends a heartbeat every 5 seconds for online/offline monitoring." },
  { title: "Background cloud queue", description: "Cloud events are queued without replacing local safety behavior." },
  { title: "Cloudflare + Firebase", description: "Middleware connects authenticated cane events with live state and history." },
  { title: "Caregiver synchronization", description: "Alerts, live state, location and access relationships support the caregiver experience." },
];

export interface AppRoleGroup {
  id: "blind" | "caregiver";
  title: string;
  description: string;
  slides: SlideItem[];
}

export const APP_ROLE_GROUPS: AppRoleGroup[] = [
  {
    id: "blind",
    title: "For the Visually Impaired User",
    description: "An accessible interface focused on independence, nearby awareness, navigation and caregiver connection.",
    slides: [
      {
        src: new URL("../assets/images/app_pic/blind-user-home.jpeg", import.meta.url).href,
        title: "Accessible Home",
        alt: "Visually impaired user home screen showing cane status, location, nearby information and accessible actions",
        bullets: ["Cane status and essential information", "Large accessible actions", "Speech and haptic support"],
      },
      {
        src: new URL("../assets/images/app_pic/voice-commands.jpeg", import.meta.url).href,
        title: "Voice Assistance",
        alt: "Voice assistance screen with location, nearby places, navigation and caregiver actions",
        bullets: ["Ask for current location", "Discover nearby surroundings", "Launch accessible actions by voice"],
      },
      {
        src: new URL("../assets/images/app_pic/navigation-screen.jpeg", import.meta.url).href,
        title: "Accessible Navigation",
        alt: "Accessible navigation screen with start and stop guidance, live cane location and saved destinations",
        bullets: ["Start and stop guidance", "Select a destination", "Access saved places"],
      },
      {
        src: new URL("../assets/images/app_pic/nearby-places.jpeg", import.meta.url).href,
        title: "What’s Around Me",
        alt: "Nearby places screen listing useful locations and distances around the visually impaired user",
        bullets: ["Discover nearby useful locations", "Understand the surrounding area", "Connect places with navigation"],
      },
    ],
  },
  {
    id: "caregiver",
    title: "For Caregivers",
    description: "A connected safety and supervision interface for cane access, location, alerts and activity review.",
    slides: [
      {
        src: new URL("../assets/images/app_pic/people-i-support-screen.jpeg", import.meta.url).href,
        title: "People I Support",
        alt: "Caregiver people I support screen showing connected users and access actions",
        bullets: ["View supported users", "Review access relationships", "Manage caregiver connections"],
      },
      {
        src: new URL("../assets/images/app_pic/linked-canes-with-device.jpeg", import.meta.url).href,
        title: "Linked Canes",
        alt: "Caregiver linked canes screen showing a connected cane, owner and device status",
        bullets: ["View linked canes", "Review cane status and ownership", "Manage device relationships"],
      },
      {
        src: new URL("../assets/images/app_pic/live-cane-location-modal.jpeg", import.meta.url).href,
        title: "Live Cane Location",
        alt: "Caregiver live cane location modal with map actions and location sharing",
        bullets: ["View the latest live position", "Open map directions", "Share location when needed"],
      },
      {
        src: new URL("../assets/images/app_pic/map-overview.jpeg", import.meta.url).href,
        title: "Map and Location Awareness",
        alt: "Caregiver map overview showing cane status and location markers",
        bullets: ["Review cane locations", "See online and offline awareness", "Understand location context"],
      },
      {
        src: new URL("../assets/images/app_pic/li-stick-lock-screen-notifications.jpg", import.meta.url).href,
        title: "Safety Notifications",
        alt: "Caregiver phone lock screen showing Li-Stick SOS, fall and status notifications",
        bullets: ["Receive SOS and fall alerts", "See cane status changes", "Keep urgent events visible"],
      },
      {
        src: new URL("../assets/images/app_pic/activity-history-overview.jpeg", import.meta.url).href,
        title: "Activity and Alert History",
        alt: "Caregiver activity history screen showing Li-Stick alerts and connectivity events",
        bullets: ["Review alert history", "Track online and offline activity", "Understand recent cane events"],
      },
      {
        src: new URL("../assets/images/app_pic/history-filter-modal.jpeg", import.meta.url).href,
        title: "History Filters",
        alt: "Caregiver history filter modal with date, alert and status options",
        bullets: ["Filter by date and event", "Focus on alert or status changes", "Review relevant history"],
      },
      {
        src: new URL("../assets/images/app_pic/export-options.jpeg", import.meta.url).href,
        title: "History Export",
        alt: "Caregiver history export options showing available report and sharing actions",
        bullets: ["Export selected history", "Preserve important events", "Share information when appropriate"],
      },
      {
        src: new URL("../assets/images/app_pic/get-access-screen.jpeg", import.meta.url).href,
        title: "Secure Access Linking",
        alt: "Caregiver secure access screen with QR scanning and manual access code entry",
        bullets: ["Link access securely", "Use QR or access code", "Connect to the correct cane relationship"],
      },
      {
        src: new URL("../assets/images/app_pic/account-hub.jpeg", import.meta.url).href,
        title: "Account and Cane Management",
        alt: "Caregiver account hub with profile, cane, caregiver and support management tools",
        bullets: ["Manage profile and account settings", "Access cane and caregiver tools", "Find support and related controls"],
      },
    ],
  },
];
