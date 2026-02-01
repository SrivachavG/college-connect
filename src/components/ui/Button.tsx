import { ButtonHTMLAttributes, ReactNode } from 'react'
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
        primary: 'bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-gray-800 dark:hover:bg-gray-100',
        secondary: 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600',
        accent: 'bg-blue-500 dark:bg-blue-600 text-white hover:bg-blue-600 dark:hover:bg-blue-700',
        outline: 'border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white bg-transparent',
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
