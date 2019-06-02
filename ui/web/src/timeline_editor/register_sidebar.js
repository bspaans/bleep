export class RegisterSideBar {
  constructor(register, app, padding, panelWidth, height) {
    this.register = register;
    this.app = app;
    this.padding = padding;
    this.panelWidth = panelWidth;
    this.height = height;
  }

  draw(app, colorOffset) {
    app.ctx.fillStyle = 'rgb(0, ' + (200 - colorOffset) + ', 0)';
    app.ctx.strokeStyle = 'rgb(40, 40, 40, 1.0)';
    app.ctx.fillRect(this.padding, this.padding, this.panelWidth, this.height);
    app.ctx.strokeRect(this.padding, this.padding, this.panelWidth, this.height);

    app.ctx.fillStyle = 'rgb(255, 255, 255)';
    app.ctx.font = '10px sans-serif';
    app.ctx.fillText(this.register.type + " " + this.register.register, this.padding + 3, this.padding + 11);
  }
  handleMouseDown(app, x, y) {
    return false;
  }
}
