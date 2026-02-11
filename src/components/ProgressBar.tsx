import React from 'react';
import { motion } from 'framer-motion';

interface ProgressBarProps {
    current: number;
    total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ current, total }) => {
    const progress = Math.min((current / total) * 100, 100);

    return (
        <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden mt-4">
            <motion.div
                className="h-full bg-blue-600"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            />
        </div>
    );
};

export default ProgressBar;
