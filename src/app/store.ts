import { map } from "lodash-es"
import { allSets } from "./sets"

export interface GameAnswer {
    isAnswered: boolean,
    answer: string,
    value: number
}

export interface GameQuestion {
    question: string,
    answers: Array<GameAnswer>
}

export interface GameQuestionSet {
    setName: string,
    questions: Array<GameQuestion>
}

export interface GameStore {
    selectedSetIndex: number,
    currentQuestionIndex: number,
    errors: {
        teamLeft1: boolean,
        teamLeft2: boolean,
        teamLeft3: boolean,
        teamRight1: boolean,
        teamRight2: boolean,
        teamRight3: boolean,
        teamLeftBig: boolean,
        teamRightBig: boolean
    },
    scores: {
        teamLeft: number,
        teamRight: number,
        roundScore: number
    },
    questionsSets: Array<GameQuestionSet>
}

export const store: GameStore = {
    selectedSetIndex: -1,
    currentQuestionIndex: -1,
    errors: {
        teamLeft1: false,
        teamLeft2: false,
        teamLeft3: false,
        teamRight1: false,
        teamRight2: false,
        teamRight3: false,
        teamLeftBig: false,
        teamRightBig: false
    },
    scores: {
        teamLeft: 0,
        teamRight: 0,
        roundScore: 0
    },
    questionsSets: allSets.map((questions, index) => {
        return {
            setName: `Gra ${index + 1}`,
            questions: questions.map(({question, answers}) => ({
                question,
                answers: map(answers, (value, key) => ({
                    isAnswered: false,
                    answer: key as string,
                    value: value as number
                }))
            }))
        }
    }),
};
