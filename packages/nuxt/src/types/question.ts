export interface Option {
  alpha: string; // e.g a, b, c
  id: string;
  is_correct: boolean;
  text: string;
}

export interface Question {
  _id: string;
  text: string;
  field: string;
  options: Option[];
  correct_option_explanation: string;
}

export interface QuestionObject {
  _id: string;
  available: boolean;
  text: string;
  field: string;
  options: {
    alpha: string;
    text: string;
    explanation: string;
    is_correct: boolean;
  }[];
  correct_option_explanation: {
    alpha: string;
    text: string;
    explanation: string;
    is_correct: boolean;
  };
  demo: boolean;
}
