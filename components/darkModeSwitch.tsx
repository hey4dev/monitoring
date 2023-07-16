'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid';

export default function DarkModeSwitch() {
    const [isOn, setIsOn] = useState(() => {
        if (localStorage.getItem('theme') === 'light') {
            return true;
        } else {
            return false;
        }
    });

    const toggleSwitch = () => setIsOn(!isOn);

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    };

    if (isOn) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }

    if (!('theme' in localStorage)) {
        document.documentElement.classList.add('dark');
    }

    // absolute top-[88px] right-5

    return (
        <div
            onClick={toggleSwitch}
            className={`flex-start flex h-[40px] w-[80px] rounded-tremor-small p-[5px] hover:cursor-pointer dark:bg-white/10 bg-black/10 ${
                isOn && 'place-content-end'
            }`}
        >
            <motion.div
                className="flex h-[30px] w-[30px] items-center justify-center rounded-tremor-small dark:bg-slate-800 bg-gray-500"
                layout
                transition={spring}
            >
                <motion.div whileTap={{ rotate: 360 }}>
                    {isOn ? (
                        <SunIcon className="h-4 w-4 text-yellow-300" />
                    ) : (
                        <MoonIcon className="h-4 w-4 text-slate-200" />
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
