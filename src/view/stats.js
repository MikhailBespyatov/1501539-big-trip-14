import SmartView from './smart-abstract.js';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { getDiffTime } from '../util/common.js';
import { TypeToEmoji } from '../constant.js';

const BAR_HEIGHT = 55;

const CHART_TYPE = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPEND',
};


const renderChart = (chartCtx, chartType, points) => {
  const chartData = {};
  let chartFormat = '';

  points.forEach((point) => {
    const pointType = point.type.toUpperCase();
    const diffTime = getDiffTime(point.dateStart, point.dateEnd);
    const millisecondsHours = 3600000;

    if (!chartData[pointType]) {
      chartData[pointType] = {
        pointType,
        number: 0,
      };
    }

    switch (chartType) {
      case CHART_TYPE.MONEY:
        chartData[pointType].number += point.basePrice;
        break;
      case CHART_TYPE.TIME:
        chartFormat = 'H';
        chartData[pointType].number += Math.round(diffTime / millisecondsHours);
        break;
      case CHART_TYPE.TYPE:
        chartFormat = 'x';
        chartData[pointType].number++;
        break;
    }
  });

  chartCtx.height = BAR_HEIGHT * Object.keys(chartData).length;

  const sortedData = Object.entries(chartData).sort((a, b) => b[1].number - a[1].number);

  return new Chart(chartCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedData.map((data) => `${TypeToEmoji[data[0]]} ${data[0]}`),
      datasets: [{
        data: sortedData.map((data) => data[1].number),
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: (val) => `${chartType === CHART_TYPE.MONEY ? '€' : ''} ${val}${chartFormat}`,
        },
      },
      title: {
        display: true,
        text: `${chartType}`,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          barThickness: 44,
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
          minBarLength: 100,
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
  <h2 class="visually-hidden">Trip statistics</h2>

  <div class="statistics__item statistics__item--money">
    <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--transport">
    <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
  </div>

  <div class="statistics__item statistics__item--time-spend">
    <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
  </div>
</section>`;
};

export default class Stats extends SmartView {
  constructor(data) {
    super();

    this._data = data.getPoints();

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  getTemplate() {
    return createStatsTemplate();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== 0 || this._typeChart !== 0 || this._timeChart !== 0) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null || this._timeChart !== 0) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    this._moneyChart = renderChart(moneyCtx, CHART_TYPE.MONEY, this._data);
    this._typeChart = renderChart(typeCtx, CHART_TYPE.TYPE, this._data);
    this._timeChart = renderChart(timeCtx, CHART_TYPE.TIME, this._data);
  }
}
