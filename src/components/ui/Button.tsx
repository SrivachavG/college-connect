import { ReactNode } from 'react'
import { clsx } from 'clsx'
import { motion, HTMLMotionProps } from 'framer-motion'

interface ButtonProps extends Omit<HTMLMotionProps<"button">, "children"> {
    children: ReactNode
    variant?: 'primary' | 'secondary' | 'accent' | 'outline'
    className?: string
}

export default function Button({
    children,
    variant = 'primary',
    className,
    ...props
}: ButtonProps) {
    const baseStyles = 'px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants = {
        primary: 'bg-gradient-to-r from-primary to-primary-dark text-white shadow-lg hover:shadow-primary/40 hover:scale-[1.02] border border-transparent backdrop-blur-md',
        secondary: 'glass text-gray-800 dark:text-gray-100 border border-white/40 dark:border-white/10 hover:bg-white/60 dark:hover:bg-white/10',
        accent: 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-lg hover:shadow-accent-purple/40 border border-transparent',
        outline: 'bg-transparent border-2 border-primary/30 text-primary dark:text-primary-light hover:border-primary hover:bg-primary/10',
    }

    return (
        <motion.button
            className={clsx(baseStyles, variants[variant], className)}
            whileHover={{ scale: 1.02, y: -1 }}
            whileTap={{ scale: 0.98 }}
            {...props}
        >
            {children}
        </motion.button>
    )
}
