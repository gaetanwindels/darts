import { Injectable } from '@angular/core';
import { ScoreHistory, Throw } from 'src/app/screens/home/score.model';

@Injectable({
  providedIn: 'root'
})
export class ScoreService {

  private START_POINTS = 101;

  constructor() { }

  public getRemaining(scoreHistory: ScoreHistory): number {
    return scoreHistory.scores.reduce((acc, score) => {
      const throw1 = score.throw1 ? score.throw1.points * score.throw1.multiplicator : 0;
      const throw2 = score.throw2 ? score.throw2.points * score.throw2.multiplicator : 0;
      const throw3 = score.throw3 ? score.throw3.points * score.throw3.multiplicator : 0;
      return acc - (throw1 + throw2 + throw3);
    }, this.START_POINTS);
  }

  public isNextPlayer(scoreHistory: ScoreHistory): boolean {
    const lastScore = [...scoreHistory.scores].pop() || {};
    return lastScore.throw3 !== null && typeof lastScore.throw3 !== 'undefined';
  }

  public removeLastThrow(scoreHistory: ScoreHistory) {
    let lastScore = [...scoreHistory.scores].pop() || {};
    lastScore.over = false;
    if (lastScore.throw3) {
      lastScore.throw3 = null;
    } else if (lastScore.throw2) {
      lastScore.throw2 = null;
    } else if (lastScore.throw1) {
      lastScore.throw1 = null;
    }
  }

  public getLastThrow(scoreHistory: ScoreHistory) {
    let lastScore = [...scoreHistory.scores].pop() || {};
    if (lastScore.throw3) {
      return lastScore.throw3;
    } else if (lastScore.throw2) {
      return lastScore.throw2;
    } else if (lastScore.throw1) {
      return lastScore.throw1;
    }
    return {};
  }

  public hasWon(scoreHistory: ScoreHistory) {
    let lastThrow = this.getLastThrow(scoreHistory);
    return this.getRemaining(scoreHistory) === 0 &&
      (this.getLastThrow(scoreHistory).multiplicator === 2 ||
        this.getLastThrow(scoreHistory).multiplicator === 1 && this.getLastThrow(scoreHistory).points === 50);
  }

  public isOver(scoreHistory: ScoreHistory) {
    let lastScore = [...scoreHistory.scores].pop() || {};
    return !!lastScore.over;
  }

  public addPoints(scoreHistory: ScoreHistory, points: Throw): ScoreHistory {
    // can't add points if it goes over
    let remaining = this.getRemaining(scoreHistory);
    let totalPoints = points.points * points.multiplicator;

    let lastScore = scoreHistory.scores.pop() || {};

    if (totalPoints > remaining ||
      remaining - totalPoints === 1 ||
      totalPoints === remaining && points.multiplicator !== 2) {
      scoreHistory.scores.push(lastScore);
      lastScore.over = true;
      return scoreHistory;
    }

    // adding points
    let newScore = null;
    if (lastScore.throw1 === null || typeof lastScore.throw1 === 'undefined') {
      lastScore.throw1 = points;
    } else if (lastScore.throw2 === null || typeof lastScore.throw2 === 'undefined') {
      lastScore.throw2 = points;
    } else if (lastScore.throw3 === null || typeof lastScore.throw3 === 'undefined') {
      lastScore.throw3 = points;
    } else {
      // adding new score
      newScore = {};
      newScore.throw1 = points;
    }
    scoreHistory.scores.push(lastScore);

    if (newScore) {
      scoreHistory.scores.push(newScore);
    }

    return scoreHistory;
  }
}
