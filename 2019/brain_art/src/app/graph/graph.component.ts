import { Component, OnInit, ViewEncapsulation, ChangeDetectorRef, Injectable } from '@angular/core';
import * as d3 from 'd3';
import { Observable, Subject, of } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

import { node_data } from './data';

import * as bcijs from 'bcijs/browser.js';
import { channelNames, EEGSample, MuseClient, zipSamples } from 'muse-js';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GraphComponent implements OnInit {

  // declare muse connection variables
  private muse = new MuseClient();

  readonly channels = 4;
  readonly channelNames = channelNames.slice(0, this.channels);

  channel_ind = 0;
  ch1 = new Array<number>(256);
  ch2 = new Array<number>(256);
  ch3 = new Array<number>(256);
  ch4 = new Array<number>(256);

  data: Observable<EEGSample> | null;
  analyzed_data: any;

  front_circles: any;
  front_texts: any;
  back_circles: any;
  back_texts: any;

  svg: any;
  back: any;
  front: any;
  animation: any;

  width: any;
  height: any;
  color: any;

  back_circle: any;
  inner_circle: any;
  hor_line: any;
  ver_line: any;

  node_names: any;
  receive = true;


  constructor(private papa: Papa, private http: HttpClient) {
  }

  ngOnInit() {

    this.createModel();
  }

  createModel() {

    this.svg = d3.select('svg');
    this.width = +this.svg.attr('width');
    this.height = +this.svg.attr('height');
    this.color = d3.scaleOrdinal(d3.schemePaired);

    const c_radius = 250;
    const i_radius = 210;
    const c_x = this.width / 2;
    const c_y = this.height / 2;
    const left_x = c_x - c_radius;
    const right_x = c_x + c_radius;
    const top_y = c_y - c_radius;
    const bottom_y = c_y + c_radius;

    this.back_circle = this.svg.append('circle')
      .attr('r', c_radius)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('cx', c_x)
      .attr('cy', c_y);

    this.inner_circle = this.svg.append('circle')
      .attr('r', i_radius)
      .attr('fill', 'none')
      .attr('stroke', 'black')
      .attr('cx', c_x)
      .attr('cy', c_y)
      .style('stroke-dasharray', ('6, 6'));

    this.hor_line = this.svg.append('line')
      .attr('x1', left_x)
      .attr('y1', c_y)
      .attr('x2', right_x)
      .attr('y2', c_y)
      .style('stroke', 'black')
      .style('stroke-dasharray', ('6, 6'));

    this.ver_line = this.svg.append('line')
      .attr('x1', c_x)
      .attr('y1', top_y)
      .attr('x2', c_x)
      .attr('y2', bottom_y)
      .style('stroke', 'black')
      .style('stroke-dasharray', ('6, 6'));

    this.back = this.svg.append('g');

    this.back_circles = this.back.selectAll('circles')
      .data(node_data['back_nodes'])
      .enter()
      .append('circle')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'grey');

    this.back_texts = this.back.selectAll('text')
      .data(node_data['back_nodes'])
      .enter()
      .append('text')
      .attr('x', (d) => d['x'] - 13)
      .attr('y', (d) => d['y'] + 7)
      .text((d) => d['id'])
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('align', 'center')
      .attr('fill', 'grey');

    this.front = this.svg.append('g');

    this.front_circles = this.front.selectAll('circles')
      .data(node_data['front_nodes'])
      .enter()
      .append('circle')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'black')
      .style('stroke-width', 1.5);

    this.front_texts = this.front.selectAll('text')
      .data(node_data['front_nodes'])
      .enter()
      .append('text')
      .attr('x', (d) => d['x'] - 20)
      .attr('y', (d) => d['y'] + 7)
      .text((d) => d['id'])
      .attr('font-family', 'sans-serif')
      .attr('font-size', '18px')
      .attr('align', 'center')
      .attr('fill', 'black');

  }

  offLine() {

    this.http.get('./assets/stare_blink.csv', {responseType: 'text'})
      .subscribe(data => this.papa.parse(data, {
        complete: (result) => {

          const arr = Array<Array<Number>>();

          for (let i = 1; i < result.data.length / 2; i++) {
            arr.push(result.data[i * 2]);
          }

          const abp_data = Array<Array<Number>>();

          for (let i = 0; i < arr.length; i++) {
            abp_data.push(arr[i].slice(0, 4).map(Number));

            if (i > 255) {

              abp_data.shift();
              console.log(bcijs.averageBandPowers(abp_data, 256, ['alpha', 'beta']));
            }
          }
      }
    }));

  }

  endReceive() {
    this.receive = false;

    this.svg.selectAll('.anime').remove();

  }

  startReceive() {

    this.receive = true;

    this.animation = this.svg.append('g');

    const colors = [0, 2, 4, 8];

    const nodes = this.animation.selectAll('circles')
      .data(node_data['front_nodes'])
      .enter()
      .append('circle')
      .attr('class', 'anime')
      .attr('r', 22)
      .attr('fill', 'none')
      .attr('stroke', 'none')
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .transition()
      // .attr('fill', 'none')
      // .attr('stroke', 'none')
      .delay((d) => d['delay'] * 1000)
      .on('start', function repeat() {

        d3.active(this)
          .duration(1500)
          .attr('r', 35)
          .attr('fill', d3.schemePaired[colors[Math.floor(Math.random() * 4)]])
          .transition()
          .duration(1500)
          .attr('r', 22)
          .attr('fill', 'white')
          .transition()
          // .duration(2000)
          .attr('r', 22)
          .attr('fill', 'none')
          .transition()
          .on('start', repeat);
      });
  }

  async connectMuse() {
    await this.muse.connect();
    await this.muse.start();

    this.data = zipSamples(this.muse.eegReadings);

    this.stream();
  }

  stream() {

    // const test_array = new Array<Array<number>> (256);
    //
    // for (let i = 0; i < 256; i++) {
    //
    //   test_array[i] = Array.from({length: 5}, () => Math.floor(Math.random() * 100));
    // }
    //
    // console.log(bcijs.averageBandPowers(test_array, 256, ['alpha', 'beta']));

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
