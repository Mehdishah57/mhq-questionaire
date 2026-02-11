export type Option = {
    key: number;
    label: string;
};

export type Question = {
    id: string;
    text: string;
    type: 'number_input' | 'radio';
    options?: Option[];
};

export type Section = {
    section_id?: string;
    title: string;
    questions?: Question[];
    subsections?: {
        title: string;
        questions: Question[];
    }[];
};

export type SurveyData = {
    survey_meta: {
        title: string;
        outcome_variables: string[];
        source_id: string;
    };
    sections: Section[];
};
