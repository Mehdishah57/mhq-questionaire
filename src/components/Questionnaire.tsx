'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getQuestions } from '@/lib/survey';
import { Question } from '@/types/survey';
import QuestionCard from './QuestionCard';
import ProgressBar from './ProgressBar';
import { Loader2 } from 'lucide-react';

export default function Questionnaire() {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState<Record<string, any>>({});
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);

    useEffect(() => {
        setQuestions(getQuestions());
    }, []);

    const handleAnswer = (value: any) => {
        const currentQuestion = questions[currentStep];
        setAnswers((prev) => ({
            ...prev,
            [currentQuestion.id]: value,
        }));
    };

    const handleNext = async () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep((prev) => prev + 1);
        } else {
            await handleSubmit();
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ answers }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit');
            }

            setIsCompleted(true);
        } catch (error) {
            console.error(error);
            alert('Something went wrong. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (questions.length === 0) return <div className="flex justify-center items-center h-screen"><Loader2 className="animate-spin text-blue-600" /></div>;

    if (isCompleted) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 p-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="bg-white p-10 rounded-3xl shadow-xl max-w-lg w-full"
                >
                    <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2 }}
                        >
                            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path>
                            </svg>
                        </motion.div>
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Assessment Complete</h2>
                    <p className="text-gray-600 mb-8">Thank you for taking the time to complete this questionnaire. Your responses have been recorded successfully.</p>
                    <a href="/" className="inline-block px-8 py-3 bg-gray-900 text-white rounded-xl font-medium hover:bg-gray-800 transition-colors">
                        Return Home
                    </a>
                </motion.div>
            </div>
        );
    }

    const currentQuestion = questions[currentStep];

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex flex-col font-sans text-slate-800">
            <div className="w-full max-w-3xl mx-auto px-6 py-8 flex-grow flex flex-col justify-center">
                <div className="mb-8">
                    <div className="flex justify-between items-end mb-2">
                        <span className="text-sm font-medium text-gray-500 uppercase tracking-wider">Question {currentStep + 1} of {questions.length}</span>
                        <span className="text-sm font-bold text-blue-600">{Math.round(((currentStep + 1) / questions.length) * 100)}%</span>
                    </div>
                    <ProgressBar current={currentStep + 1} total={questions.length} />
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentQuestion.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                    >
                        <QuestionCard
                            question={currentQuestion}
                            answer={answers[currentQuestion.id]}
                            onAnswer={handleAnswer}
                            onNext={handleNext}
                        />
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
}
