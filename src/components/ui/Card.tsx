import { motion, HTMLMotionProps } from 'framer-motion'
import { ReactNode, HTMLAttributes } from 'react'
import { clsx } from 'clsx'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
    children: ReactNode
    className?: string
    hover?: boolean
}

export default function Card({ children, className, hover = false, ...props }: CardProps) {
    const Component = hover ? motion.div : 'div'

    return (
        <Component
            className={clsx(
                'minimal-card rounded-xl',
                className
            )}
            {...(hover ? {
                whileHover: {
                    scale: 1.01,
                    y: -2,
                    transition: { duration: 0.2 }
                },
                initial: { opacity: 0, y: 20 },
                animate: { opacity: 1, y: 0 },
                transition: { duration: 0.3 }
            } : {})}
            {...(props as any)}
        >
            {children}
        </Component>
    )
}
