import { motion } from 'framer-motion';

export default function Logo({ className = "w-10 h-10" }: { className?: string }) {
    return (
        <motion.div
            className={`relative flex items-center justify-center ${className}`}
            whileHover="hover"
            initial="initial"
        >
            <svg
                viewBox="0 0 100 100"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                {/* Outer Ring - Rotates */}
                <motion.circle
                    cx="50"
                    cy="50"
                    r="45"
                    stroke="url(#gradient-outer)"
                    strokeWidth="4"
                    strokeLinecap="round"
                    strokeDasharray="280"
                    strokeDashoffset="75"
                    variants={{
                        initial: { rotate: 0 },
                        hover: { rotate: 360, transition: { duration: 2, ease: "linear", repeat: Infinity } }
                    }}
                />

                {/* Inner Hexagon - Pulses */}
                <motion.path
                    d="M50 20 L76 35 V65 L50 80 L24 65 V35 Z"
                    stroke="url(#gradient-inner)"
                    strokeWidth="4"
                    fill="url(#gradient-inner-fill)"
                    fillOpacity="0.2"
                    variants={{
                        initial: { scale: 1 },
                        hover: { scale: 1.1, transition: { duration: 0.5, yoyo: Infinity } }
                    }}
                />

                {/* Core Connection Nodes */}
                <circle cx="50" cy="50" r="6" fill="#fff" />
                <circle cx="50" cy="20" r="4" fill="#4f46e5" />
                <circle cx="76" cy="65" r="4" fill="#06b6d4" />
                <circle cx="24" cy="65" r="4" fill="#8b5cf6" />

                {/* Connecting Lines */}
                <path d="M50 50 L50 20" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
                <path d="M50 50 L76 65" stroke="white" strokeWidth="2" strokeOpacity="0.5" />
                <path d="M50 50 L24 65" stroke="white" strokeWidth="2" strokeOpacity="0.5" />

                <defs>
                    <linearGradient id="gradient-outer" x1="0" y1="0" x2="100" y2="100">
                        <stop offset="0%" stopColor="#4f46e5" />
                        <stop offset="100%" stopColor="#06b6d4" />
                    </linearGradient>
                    <linearGradient id="gradient-inner" x1="50" y1="20" x2="50" y2="80">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#ec4899" />
                    </linearGradient>
                    <linearGradient id="gradient-inner-fill" x1="50" y1="20" x2="50" y2="80">
                        <stop offset="0%" stopColor="#8b5cf6" />
                        <stop offset="100%" stopColor="#4f46e5" />
                    </linearGradient>
                </defs>
            </svg>

            {/* Glow Effect */}
            <motion.div
                className="absolute inset-0 bg-primary-glow/30 blur-xl rounded-full -z-10"
                variants={{
                    initial: { opacity: 0 },
                    hover: { opacity: 1, scale: 1.2 }
                }}
            />
        </motion.div>
    );
}
