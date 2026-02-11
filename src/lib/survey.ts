import { SurveyData, Section, Question } from '@/types/survey';
import surveyData from '../../data.json';

export const getQuestions = (): Question[] => {
    const data = surveyData as unknown as SurveyData; // Type assertion as JSON import
    const questions: Question[] = [];

    data.sections.forEach((section) => {
        if (section.questions) {
            questions.push(...section.questions.map(q => ({
                ...q,
                type: q.type || (q.options ? 'radio' : 'number_input')
            })));
        }
        if (section.subsections) {
            section.subsections.forEach((subsection) => {
                questions.push(...subsection.questions.map(q => ({
                    ...q,
                    type: q.type || (q.options ? 'radio' : 'number_input')
                })));
            });
        }
    });

    return questions;
};

export const getTotalQuestions = (): number => {
    return getQuestions().length;
};
