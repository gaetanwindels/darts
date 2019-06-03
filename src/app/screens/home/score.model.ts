export interface Throw {
    points?: number
    multiplicator?: number
}

export interface Score {
    throw1?: Throw;
    throw2?: Throw;
    throw3?: Throw;
    over?: boolean
}

export interface ScoreHistory {
    player: string;
    scores: Score[];
}
