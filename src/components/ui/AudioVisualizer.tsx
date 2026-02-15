import { motion } from 'framer-motion'

export default function AudioVisualizer({ isActive }: { isActive: boolean }) {
    return (
        <div className="flex items-center justify-center gap-1 h-8">
            {[...Array(5)].map((_, i) => (
                <motion.div
                    key={i}
                    className="w-1 bg-cyan-400 rounded-full"
                    animate={{
                        height: isActive ? [8, 24, 8] : 4,
                        opacity: isActive ? 1 : 0.3
                    }}
                    transition={{
                        repeat: Infinity,
                        duration: 0.5,
                        delay: i * 0.1,
                        ease: "easeInOut"
                    }}
                />
            ))}
        </div>
    )
}
