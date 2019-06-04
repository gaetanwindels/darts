import { ScoreHistory } from "src/app/screens/home/score.model";

export interface GameState {
    currentScore?: ScoreHistory
    scores?: ScoreHistory[]
}

