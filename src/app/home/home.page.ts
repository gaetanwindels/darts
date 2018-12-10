import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  title = 'darts';

  canvas: HTMLCanvasElement;

  context: CanvasRenderingContext2D;

  colorGreen: string = "#22a063";
  colorRed: string = "#f63b1d";
  colorBlack: string = "#373d3d";
  colorWhite: string = "#f3f6e5";

  // Size conf
  outerWidth: number = 0.8;

  tripleWidth: number = 0.65;
  tripleDoubleSpaceWidth = 0.48;
  doubleWidth: number = 0.34;
  outerCenterWidth: number = 0.17;
  centerWidth: number = 0.08;

  // position
  positionX: number = 0.2;

  // font size
  fontSize: number;

  score: string;


  ngOnInit() {
    this.canvas = <HTMLCanvasElement>document.getElementById("canvas");
    this.canvas.width = window.innerWidth;
    this.canvas.height = this.canvas.width;
    this.context = this.canvas.getContext("2d");
    this.fontSize = (this.canvas.width / 20);
    this.draw();
  }

  printPoints(event: MouseEvent) {
    let numbers = [1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5, 20];
    console.log(event);
    let x = event.offsetX;
    let y = event.offsetY;
    let radius = this.getRadius();
    let distanceFromMiddle = Math.sqrt(Math.pow(this.canvas.width / 2 - x, 2) + Math.pow(this.canvas.height / 2 - y, 2));
    
    let double = "";
    let point = null;
    
    // compute triple, double...
    if (distanceFromMiddle < radius * this.centerWidth)  {
      console.log("BOOM RIGHT IN THE MIDDLE");
      point = 50;
    } else if (distanceFromMiddle < radius * this.outerCenterWidth) {
      console.log("BOOM RIGHT IN THE 25");
      point = 25;
    } else if (distanceFromMiddle < radius * this.doubleWidth) {
      console.log("BOOM RIGHT IN THE normal");
    } else if (distanceFromMiddle < radius * this.tripleDoubleSpaceWidth) {
      console.log("BOOM RIGHT IN THE TRIPLE");
      double = "TRIPLE ";
    } else if (distanceFromMiddle < radius * this.tripleWidth) {
      console.log("BOOM RIGHT IN THE normal");
    } else if (distanceFromMiddle < radius * this.outerWidth) {
      console.log("BOOM RIGHT IN THE DOUBLE");
      double = "DOUBLE ";
    } else {
      console.log("BOOM RIGHT IN THE NOTHING");
    }

    // get the points
    let angleDeg = Math.atan2(this.canvas.height / 2 - y, this.canvas.width / 2 - x) * 180 / Math.PI - 99;
    if (angleDeg < 0) {
      angleDeg += 360;
    }
    //console.log(angleDeg);
    //console.log(numbers[(angleDeg / 18) | 0]);
    point = point || numbers[(angleDeg / 18) | 0];
    console.log(double + point);
    this.score = double + point;

  }

  getRadius() {
    return this.canvas.width * (0.5 - (this.positionX / 2));
  }

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
    return;

    // thin lines
    this.context.strokeStyle = "#808684";
    this.context.lineWidth = 2;
    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius, 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, (1 - this.doubleWidth), 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * 0.6, 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * (0.6 - this.doubleWidth), 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * 0.2, 0, Math.PI * 2);
    this.context.stroke();

    this.context.beginPath();
    this.context.arc(this.canvas.width / 2, this.canvas.height / 2, radius * 0.1, 0, Math.PI * 2);
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
      this.context.fillText("" + numbers[i], 0, - radius + radius / 7.5);
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
    }
  }
}
