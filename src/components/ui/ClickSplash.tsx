// src/components/ui/ClickSplash.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';

const ClickSplash: React.FC = () => {
    const [ripples, setRipples] = useState<{ id: number, x: number, y: number }[]>([]);

    const createRipple = (event: React.MouseEvent<HTMLDivElement>) => {
        const rect = event.currentTarget.getBoundingClientRect();
        const newRipple = {
            id: Date.now(),
            x: event.clientX - rect.left,
            y: event.clientY - rect.top,
        };
        setRipples(prevRipples => [...prevRipples, newRipple]);

        // Cleanup after animation completes to prevent memory issues
        setTimeout(() => {
            setRipples(prevRipples => prevRipples.filter(ripple => ripple.id !== newRipple.id));
        }, 1500); // Duration matches the animation duration
    };

    return (
        <div
            className="absolute inset-0 z-0 overflow-hidden cursor-pointer"
            onClick={createRipple}
        >
            {ripples.map(ripple => (
                <motion.div
                    key={ripple.id}
                    className="absolute rounded-full bg-white/20"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                    }}
                    initial={{
                        width: 0,
                        height: 0,
                        opacity: 1,
                        x: '-50%',
                        y: '-50%',
                    }}
                    animate={{
                        width: '200%',
                        height: '200%',
                        opacity: 0,
                    }}
                    transition={{
                        duration: 1.5,
                        ease: 'easeOut',
                    }}
                />
            ))}
        </div>
    );
};

export default ClickSplash;