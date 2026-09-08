import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from "motion/react"
function LoadingAnimation() {

    const Thinking_Lables = ["Thinking", "Analyzing", "Reasoning", "Generating"]
    const [labelIndex, setLabelIndex] = useState(0)

    useEffect(() => {
        const interval = setInterval(() => {
            setLabelIndex((prev) => (prev + 1) % Thinking_Lables.length)
        }, 1800)
        return () => clearInterval(interval)
    }, [])

    const label = Thinking_Lables[labelIndex]

    return (
        <div className='beast-loading flex items-center gap-3 max-w-[72%] py-1'>
            <div className='loading-beacon relative flex h-9 w-10 items-end justify-center gap-1.5 rounded-xl border border-red-400/15 bg-red-950/20 px-2.5 pb-2 pt-1.5 shrink-0'>
                {[0, 1, 2].map((bar) => (
                    <motion.span
                        key={bar}
                        className='w-1.5 rounded-full bg-linear-to-t from-red-700 via-red-400 to-red-200'
                        animate={{ height: ['35%', '90%', '52%', '78%', '35%'], opacity: [0.55, 1, 0.7, 1, 0.55] }}
                        transition={{
                            duration: 1.25,
                            repeat: Infinity,
                            delay: bar * 0.16,
                            ease: 'easeInOut',
                        }}
                        style={{ boxShadow: '0 0 12px rgba(248, 113, 113, 0.45)' }}
                    />
                ))}
                <motion.span
                    className='absolute bottom-1 left-2.5 right-2.5 h-px bg-red-300/70'
                    animate={{ opacity: [0.35, 0.9, 0.35] }}
                    transition={{ duration: 1.25, repeat: Infinity, ease: 'easeInOut' }}
                />
            </div>
            <div className='loading-label flex overflow-hidden rounded-full border border-red-400/10 bg-red-950/20 px-3 py-1.5'>
                <AnimatePresence mode='wait'>
                    <motion.div
                        key={label}
                        className="flex"
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                    >
                        {
                            label.split("").map((ch, i) => (
                                <motion.div
                                    key={i}
                                    className="text-[13px] font-medium tracking-wide text-slate-400"
                                    animate={{ opacity: [0.3, 1, 0.3] }}
                                    transition={{
                                        duration: 1.4,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                        delay: i * 0.07,
                                    }}

                                >
                                    {ch}
                                </motion.div>
                            ))
                        }

                    </motion.div>
                </AnimatePresence>
            </div>

        </div>
    )
}

export default LoadingAnimation
