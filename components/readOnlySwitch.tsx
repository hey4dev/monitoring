'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { LockClosedIcon, LockOpenIcon } from '@heroicons/react/24/solid';

export default function ReadOnlySwitch() {
    const [isOn, setIsOn] = useState(() => {
        if (localStorage.getItem('readonly') === 'true') {
            return true;
        } else {
            return false;
        }
    });

    useEffect(() => {
        if (!('readonly' in localStorage)) {
            localStorage.setItem('readonly', 'true');
            setIsOn(true);
        } else if (isOn) {
            localStorage.setItem('readonly', 'true');
        } else {
            localStorage.setItem('readonly', 'false');
        }
    }, [isOn]);

    const toggleSwitch = () => {
        if (window.prompt('Password') === 'admin') setIsOn(!isOn);
    };

    const spring = {
        type: 'spring',
        stiffness: 700,
        damping: 30,
    };

    // absolute top-[88px] right-28
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
                <motion.div>
                    {isOn ? (
                        <LockClosedIcon className="h-4 w-4 text-slate-200" />
                    ) : (
                        <LockOpenIcon className="h-4 w-4 text-yellow-300" />
                    )}
                </motion.div>
            </motion.div>
        </div>
    );
}
