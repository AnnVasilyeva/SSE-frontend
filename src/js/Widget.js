export default class Widget {
  constructor(url) {
    this.url = url;
    this.container = document.querySelector('.container');
    this.date = null;
    this.time = null;
    this.widget = this.createWidget();
  }

  start() {
    const eventSource = new EventSource(this.url);

    eventSource.addEventListener('action', (evt) => {
      const logo = '';
      this.createWidgetMes(evt, logo);
    });

    eventSource.addEventListener('freekick', (evt) => {
      const logo = `<i class="fas fa-exclamation fa-lg"></i>
                <i class="fas fa-exclamation fa-lg"></i>`;
      this.createWidgetMes(evt, logo);
    });

    eventSource.addEventListener('goal', (evt) => {
      const logo = '<i class="fas fa-futbol fa-lg"></i>';
      this.createWidgetMes(evt, logo);
    });

    eventSource.addEventListener('open', () => {
      console.log('connected');
    });

    eventSource.addEventListener('error', () => {
      console.log('error');
    });
  }

  createWidget() {
    const widget = document.createElement('div');
    widget.classList.add('widget');
    widget.innerHTML = '<h2 class="widget-title">Игра началась!</h2>';

    this.container.appendChild(widget);

    return widget;
  }

  createWidgetMes(mes, logo) {
    this.date = new Date().toLocaleDateString();
    this.time = new Date().toLocaleTimeString().slice(0, -3);

    const mesDate = `${this.time} ${this.date}`;

    const message = document.createElement('div');
    message.classList.add('widget-mes');
    message.innerHTML = `<div class="mes-logo">${logo}</div>
            <div class="mes-main">
                <div class="mes-time">${mesDate}</div>
                <div class="mes-text">${JSON.parse(mes.data)}</div>
            </div>`;

    this.widget.appendChild(message);
  }
}
