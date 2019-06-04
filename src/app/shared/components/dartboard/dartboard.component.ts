import { Component, OnInit, Output } from '@angular/core';
import { Throw } from 'src/app/screens/home/score.model';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-dartboard',
  templateUrl: './dartboard.component.html',
  styleUrls: ['./dartboard.component.scss']
})
export class DartboardComponent implements OnInit {

  @Output() play = new EventEmitter<Throw>();

  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  colorGreen: string = "#22a063";
  colorRed: string = "#f63b1d";
  colorBlack: string = "#373d3d";
  colorWhite: string = "#f3f6e5";

  // Size conf
  outerWidth: number = 0.85;

  tripleWidth: number = 0.72;
  tripleDoubleSpaceWidth = 0.52;
  doubleWidth: number = 0.38;
  outerCenterWidth: number = 0.21;
  centerWidth: number = 0.1;

  // position
  positionX: number = 0.1;

  // font size
  fontSize: number;

  constructor() { }

  ngOnInit() {
    // draw
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.canvas.height = window.innerHeight / 2
    this.canvas.width = this.canvas.height
    this.context = this.canvas.getContext("2d");
    this.fontSize = (this.canvas.width / 20);
    this.draw();
  }

  playAction(event: MouseEvent) {
    this.play.emit(this.getPoints(event));
  }

  getPoints(event: MouseEvent): Throw {
    let numbers = [1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20];
    let x = event.offsetX;
    let y = event.offsetY;
    let radius = this.getRadius();
    let distanceFromMiddle = Math.sqrt(Math.pow(this.canvas.width / 2 - x, 2) + Math.pow(this.canvas.height / 2 - y, 2));

    let multiplier = 0;
    let point = null;

    // compute triple, double...
    if (distanceFromMiddle < radius * this.centerWidth) {
      multiplier = 1;
      point = 50;
    } else if (distanceFromMiddle < radius * this.outerCenterWidth) {
      multiplier = 1;
      point = 25;
    } else if (distanceFromMiddle < radius * this.doubleWidth) {
      multiplier = 1;
    } else if (distanceFromMiddle < radius * this.tripleDoubleSpaceWidth) {
      multiplier = 3;
    } else if (distanceFromMiddle < radius * this.tripleWidth) {
      multiplier = 1;
    } else if (distanceFromMiddle < radius * this.outerWidth) {
      multiplier = 2;
    }

    // get the points
    let angleDeg = Math.atan2(this.canvas.height / 2 - y, this.canvas.width / 2 - x) * 180 / Math.PI - 99;
    if (angleDeg < 0) {
      angleDeg += 360;
    }

    point = point || numbers[(angleDeg / 18) | 0];
    return { multiplicator: multiplier, points: point };
  }

  getRadius() {
    return this.canvas.width * (0.5 - (this.positionX / 2));
  }

  // Drawing part of the component 

  draw() {
    let radius = this.getRadius();

    this.drawNumbers(radius);

    this.context.restore();
    this.context.resetTransform();

    // circles
    this.drawCircle(radius * this.outerWidth, this.colorGreen, this.colorRed);
    this.drawCircle(radius * this.tripleWidth, this.colorBlack, this.colorWhite);
    this.drawCircle(radius * this.tripleDoubleSpaceWidth, this.colorGreen, this.colorRed);
    this.drawCircle(radius * this.doubleWidth, this.colorBlack, this.colorWhite);

    // middle circles
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * this.outerCenterWidth, 0, Math.PI * 2);
    this.context.fillStyle = this.colorGreen;
    this.context.fill();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * this.centerWidth, 0, Math.PI * 2);
    this.context.fillStyle = this.colorRed;
    this.context.fill();
    //return;

    // thin lines
    this.context.strokeStyle = "#ababab";
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
    this.context.stroke();

    let outerRadius = radius * this.outerWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, outerRadius, 0, Math.PI * 2);
    this.context.stroke();

    let doubleRadius = radius * this.tripleWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, doubleRadius, 0, Math.PI * 2);
    this.context.stroke();

    let tripleDoubleRadius = radius * this.tripleDoubleSpaceWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, tripleDoubleRadius, 0, Math.PI * 2);
    this.context.stroke();

    let tripleRadius = radius * this.doubleWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, tripleRadius, 0, Math.PI * 2);
    this.context.stroke();

    let outerCenterRadius = radius * this.outerCenterWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, outerCenterRadius, 0, Math.PI * 2);
    this.context.stroke();

    let centerRadius = radius * this.centerWidth;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, centerRadius, 0, Math.PI * 2);
    this.context.stroke();
  }

  private drawNumbers(radius) {
    let numbers = [1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20];
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
    this.context.fillStyle = "#414747";
    this.context.fill();

    let radian = 18 * (Math.PI / 180);
    this.context.save();
    this.context.fillStyle = "white";
    this.context.font = this.fontSize + "px Impact";
    this.context.textAlign = "center";

    this.context.save();
    this.context.translate(this.canvas.width / 2, this.canvas.height / 2);
    for (let i = 0; i < 20; i++) {
      //radian = (i * 18) * Math.PI / 180;
      this.context.rotate(radian);
      this.context.fillText("" + numbers[i], 0, - radius + radius / 8.2);
    }
    this.context.restore();
  }

  private drawCircle(radius, color1, color2) {
    let startDegre = -9;
    let radian = startDegre * Math.PI / 180;

    for (let i = 0; i <= 20; i++) {
      this.context.fillStyle = i & 1 ? color1 : color2;
      let prevRadian = radian;
      radian = (startDegre + (i * 18)) * Math.PI / 180;
      this.context.beginPath();
      this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, prevRadian, radian);
      this.context.fill();

      this.context.strokeStyle = '#ababab';
      this.context.lineWidth = 2;
      this.context.beginPath();
      let pointX = (Math.sin(radian) * (this.getRadius() * this.outerWidth));
      let pointY = (Math.cos(radian) * (this.getRadius() * this.outerWidth));
      this.context.moveTo(this.canvas.width / 2, this.canvas.height / 2);
      this.context.lineTo(this.canvas.width / 2 + pointX, this.canvas.width / 2 - pointY);
      this.context.stroke();
    }
  }

}
