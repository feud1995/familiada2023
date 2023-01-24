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
    questionsSets: [{
        setName: 'Gra 1',
        questions: [
            {
                question: 'Więcej niż kanapka to?',
                answers: [
                    {
                        isAnswered: false,
                        answer: 'Lama',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'Koza',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'Owca',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'CHECHUSZKI',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'MAŁE SŁODKIE KIT',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'TESTOWA ODP.',
                        value: 34
                    },
                    
                ],
            },
            {
                question: 'Najlepszy sklep na jedzonko?',
                answers: [
                    {
                        isAnswered: false,
                        answer: 'Biedronka',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'Lidl',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'Allegro',
                        value: 34
                    },
                    {
                        isAnswered: false,
                        answer: 'Carfą',
                        value: 34
                    },
                ],
            },
        ]
    }]
};
