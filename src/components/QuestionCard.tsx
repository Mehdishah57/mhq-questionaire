import React from 'react';
import { motion } from 'framer-motion';
import { Question, Option } from '@/types/survey'; // You'll need to define these types
import { Check, ChevronRight } from 'lucide-react';
import clsx from 'clsx';

interface QuestionCardProps {
    question: Question;
    answer: any;
    onAnswer: (value: any) => void;
    onNext: () => void;
    isSubmitting?: boolean;
    isLastQuestion?: boolean;
}

const QuestionCard: React.FC<QuestionCardProps> = ({
    question,
    answer,
    onAnswer,
    onNext,
    isSubmitting = false,
    isLastQuestion = false,
}) => {
    const handleOptionClick = (value: number) => {
        if (isSubmitting) return; // Prevent changing answer while submitting
        onAnswer(value);
    };

    const getButtonText = () => {
        if (isSubmitting) return "Submitting...";
        if (isLastQuestion) return "Submit";
        return "Next";
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">{question.text}</h2>

            {question.type === 'number_input' && (
                <div className="flex flex-col gap-4">
                    <input
                        type="number"
                        className="w-full p-4 text-xl border-2 border-gray-200 rounded-xl focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50"
                        placeholder="Enter value..."
                        value={answer || ''}
                        onChange={(e) => onAnswer(parseFloat(e.target.value))}
                        disabled={isSubmitting}
                        autoFocus
                        onKeyDown={(e) => {
                            if (e.key === 'Enter' && answer && !isSubmitting) onNext();
                        }}
                    />
                    <button
                        onClick={onNext}
                        disabled={!answer || isSubmitting}
                        className="mt-4 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {getButtonText()} <ChevronRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            )}

            {question.type === 'radio' && question.options && (
                <div className="grid gap-3">
                    {question.options.map((option: Option) => (
                        <motion.button
                            key={option.key}
                            whileHover={isSubmitting ? {} : { scale: 1.02 }}
                            whileTap={isSubmitting ? {} : { scale: 0.98 }}
                            onClick={() => handleOptionClick(option.key)}
                            disabled={isSubmitting}
                            className={clsx(
                                "w-full text-left p-4 rounded-xl border-2 transition-all flex items-center justify-between group",
                                answer === option.key
                                    ? "border-blue-500 bg-blue-50 text-blue-700"
                                    : "border-gray-200 hover:border-blue-300 hover:bg-gray-50",
                                isSubmitting && "opacity-70 cursor-not-allowed hover:bg-transparent hover:border-gray-200"
                            )}
                        >
                            <span className="text-lg font-medium">{option.label}</span>
                            {answer === option.key && (
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    className="bg-blue-500 text-white p-1 rounded-full"
                                >
                                    <Check size={16} />
                                </motion.div>
                            )}
                        </motion.button>
                    ))}
                    <button
                        onClick={onNext}
                        disabled={!answer || isSubmitting}
                        className="mt-6 px-6 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full flex items-center justify-center gap-2"
                    >
                        {isSubmitting ? (
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        ) : (
                            <>
                                {getButtonText()} <ChevronRight size={20} />
                            </>
                        )}
                    </button>
                </div>
            )}
        </div>
    );
};

export default QuestionCard;
