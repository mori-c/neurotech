import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Injectable } from '@angular/core';
import * as d3 from 'd3';

import { Observable, Subject, of } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';
import { ngxCsv } from 'ngx-csv/ngx-csv';

import { node_data } from './data';

import * as bcijs from 'bcijs/browser.js';
import { channelNames, EEGSample, MuseClient, zipSamples } from 'muse-js';


@Component({
  selector: 'app-test',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GraphTestComponent implements OnInit {

  // declare muse connection variables
  private muse = new MuseClient();

  data: Observable<EEGSample> | null;
  analyzed_data: any;

  signal_chart: any;
  sc_x: any;
  sc_y: any;
  sc_line: any;
  sc_data = new Array<number>();

  abp_chart: any;

  svg: any;
  margin: any;
  width: any;
  height: any;

  constructor(private papa: Papa, private http: HttpClient) {
  }

  ngOnInit() {

    this.createModel();
  }

  createModel() {

    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.margin = {top: 20, right: 20, bottom: 20, left: 20};

    this.draw_sc();

  }

  draw_sc() {

    for (let i = 0; i < 256; i++) {
      this.sc_data.push(d3.randomNormal(0, 0.2)());
    }

    this.signal_chart = this.svg.append('g')
      .attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

    this.sc_x = d3.scaleLinear()
      .domain([0, 255])
      .range([0, 200]);

    this.sc_y = d3.scaleLinear()
      .domain([-1, 1])
      .range([200, 0]);

    this.sc_line = d3.line()
      .x(function(d, i) {return this.sc_x(i); })
      .y(function(d, i) {return this.sc_y(d); });

    this.signal_chart = this.signal_chart.append('defs').append('clipPath')
      .attr('id', 'clip')
      .append('rect')
      .attr('width', 200)
      .attr('height', 200);

    this.signal_chart = this.signal_chart.append('g')
      .attr('class', 'axis axis--x')
      .attr('transform', 'translate(0, ' + this.sc_y(0) + ')')
      .call(d3.axisBottom(this.sc_x));

    this.signal_chart = this.signal_chart.append('g')
      .attr('class', 'axis axis--y')
      .call(d3.axisLeft(this.sc_y));

    this.signal_chart = this.signal_chart.append('g')
      .attr('clip-path', 'url(#clip)')
      .append('path')
      .datum(this.sc_data)
      .attr('class', 'line')
      .transition()
      .duration(500)
      .ease(d3.easeLinear)
      .on('start', this.tick());
  }

  tick() {
    this.sc_data.push(d3.randomNormal(0, 0.2)());

    d3.select(this.svg.signal_chart)
      .attr('d', this.sc_line)
      .attr('transform', null);

    d3.active(this.svg.signal_chart)
      .attr('transform', 'translate(' + this.sc_x(-1) + ',0)')
      .transition()
      .on('start', this.tick);

    this.sc_data.shift();
    console.log(0);

  }

  sc_tick() {
    d3.select(this.svg)
      .attr('d', this.sc_line)
      .attr('transform', null);

    d3.active(this.svg)
      .attr('transform', 'translate(' + this.sc_x(-1) + ',0)');

    this.sc_data.shift();
  }

  offLine() {

    const output = Array<Array<Number>>();

    this.http.get('./assets/stare_blink.csv', {responseType: 'text'})
      .subscribe(data => this.papa.parse(data, {
        complete: (result) => {

          const arr = Array<Array<Number>>();

          for (let i = 1; i < result.data.length / 2; i++) {
            arr.push(result.data[i * 2]);
          }

          const abp_data = Array<Array<Number>>();

          for (let i = 0; i < arr.length - 1; i++) {
            abp_data.push(arr[i].slice(0, 4).map(Number));

            this.sc_data.push(+arr[i][0]);

            this.sc_tick();

            if (i > 255) {

              abp_data.shift();
              console.log(bcijs.averageBandPowers(abp_data, 256, ['alpha', 'beta']));
              output.push(bcijs.averageBandPowers(abp_data, 256, ['alpha', 'beta', 'theta', 'delta', 'gamma']));
            }
          }
          const out = new ngxCsv(output, 'blink');
        }
      }));

  }

  async connectMuse() {
    await this.muse.connect();
    await this.muse.start();

    this.data = zipSamples(this.muse.eegReadings);

    this.stream();
  }

  stream() {

    const data_array = new Array<Array<number>>();
    let nxt_idx = 0;

    this.data.subscribe({

      next(sample) {

        data_array.push(sample.data.slice(0, 4).map(Number));
        nxt_idx += 1;

        if (nxt_idx >= 255) {
          this.analyzed_data = bcijs.averageBandPowers(data_array, 256, ['alpha', 'beta']);
          console.log(this.analyzed_data);
          data_array.shift();
        }

      },
      complete () {
        console.log('Finished receiving');
      }
    });
  }


}
