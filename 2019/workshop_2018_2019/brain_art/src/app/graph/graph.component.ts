import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import * as d3 from 'd3';

import { Observable } from 'rxjs';
import { Papa } from 'ngx-papaparse';
import { HttpClient } from '@angular/common/http';

import { node_data } from './data';

import * as bcijs from 'bcijs/browser.js';
import { EEGSample, MuseClient, zipSamples } from 'muse-js';


@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None
})

export class GraphComponent implements OnInit {

  // declare muse connection variables
  private muse = new MuseClient();

  data: Observable<EEGSample> | null;

  /** variables for D3 svg display */
  front_texts: any;
  back_circles: any;

  // svg
  svg: any;
  margin: any;
  front: any;
  back: any;
  width: any;
  height: any;

  // nodes drawn on svg for the EEG
  AF7: any;
  AF8: any;
  TP9: any;
  TP10: any;
  node_class: any;
  nodes: any;

  // the fill opacity for the nodes based on abp values
  opacities = new Array<number>();
  // an array of colors used for each frequency band
  sbp_color: any;

  /** variables for the Muse data */
  cur_data = new Array<number>();

  // the four channels for the electrodes
  ch_AF7 = new Array<number>();
  ch_AF8 = new Array<number>();
  ch_TP9 = new Array<number>();
  ch_TP10 = new Array<number>();

  // an array of band powers computed for each channel
  sbp_channels = new Array<Array<number>>();
  // the band powers calculated from the previous data
  prev_sbps = new Array<Array<number>>();

  // index into the abp_channels to get the frequency selected
  cur_frequency: number;
  // index into the abp_color to get the color corresponding to the selected frequency
  cur_freq_color: number;

  // an array of frequency bands
  frequency_bands = new Array<string>();

  /** variables for when the user wants to see which frenquency band power is the current highest */
  highest_ind = 0;
  highest_colors = new Array<number>();
  prev_colors = new Array<number>();

  started_flag = 0;
  bad_data = 0;


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

    // initializing the variables to be used for EEG
    this.sbp_color = ['#4193c6', '#cc4fb1', '#46bc3e', '#833fc1', '#e28009'];
    this.node_class = ['muse_AF7', 'muse_AF8', 'muse_TP9', 'muse_TP10'];
    this.sbp_channels = [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];
    this.frequency_bands = ['alpha', 'beta', 'theta', 'delta', 'gamma'];
    this.opacities = [0.5, 0.5, 0.5, 0.5];
    this.highest_colors = [0, 0, 0, 0];
    this.prev_colors = [0, 0, 0, 0];

    this.cur_frequency = 0;
    this.cur_freq_color = 0;

    this.back = this.svg.append('g');

    this.back_circles = this.back.selectAll('circles')
      .data(node_data['front_nodes'])
      .enter()
      .append('circle')
      .attr('class', 'back_circle')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.front = this.svg.append('g');

    this.AF7 = this.front.selectAll('circles')
      .data(node_data['AF7'])
      .enter()
      .append('circle')
      .attr('class', 'muse_AF7')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.AF8 = this.front.selectAll('circles')
      .data(node_data['AF8'])
      .enter()
      .append('circle')
      .attr('class', 'muse_AF8')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.TP9 = this.front.selectAll('circles')
      .data(node_data['TP9'])
      .enter()
      .append('circle')
      .attr('class', 'muse_TP9')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
      .style('stroke-width', 1.5);

    this.TP10 = this.front.selectAll('circles')
      .data(node_data['TP10'])
      .enter()
      .append('circle')
      .attr('class', 'muse_TP10')
      .attr('r', 23)
      .attr('cx', (d) => d['x'])
      .attr('cy', (d) => d['y'])
      .style('fill', 'white')
      .style('stroke', 'white')
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

    this.nodes = [this.AF7, this.AF8, this.TP9, this.TP10];

  }

  /**
   * when user clicks on the button Alpha, sets the current frequency selected as 'alpha'
   * TODO: set the cur_frequency and cur_freq_color to the correct index value
   *       set the highest_ind to 0 since a specific frequency is selected
   */
  setAlpha() {
    this.cur_frequency = 0;
    this.cur_freq_color = 0;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Alpha, sets the current frequency selected as 'beta'
   */
  setBeta() {
    this.cur_frequency = 1;
    this.cur_freq_color = 1;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Beta, sets the current frequency selected as 'theta'
   */
  setTheta() {
    this.cur_frequency = 2;
    this.cur_freq_color = 2;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Theta, sets the current frequency selected as 'delta'
   */
  setDelta() {
    this.cur_frequency = 3;
    this.cur_freq_color = 3;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Delta, sets the current frequency selected as 'gamma'
   */
  setGamma() {
    this.cur_frequency = 4;
    this.cur_freq_color = 4;
    this.highest_ind = 0;

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Highest, sets the highest_ind to 1 to indicate that we want to display the
   * frequency with the highest value
   */
  setHighest() {
    this.highest_ind = 1;
  }

  /**
   * reads input signals from a csv file and calculates the signal band powers for each channel
   */
  offLine() {

    this.http.get('./assets/stare_blink.csv', {responseType: 'text'})
      .subscribe(data => this.papa.parse(data, {
        complete: (result) => {

          const arr = Array<Array<number>>();

          for (let i = 1; i < result.data.length / 2; i++) {
            arr.push(result.data[i * 2]);
          }

          for (let i = 0; i < arr.length - 1; i++) {

            setTimeout(() => {

              // split into 4 channels
              this.ch_AF7.push(Number(arr[i][0]));
              this.ch_AF8.push(Number(arr[i][1]));
              this.ch_TP9.push(Number(arr[i][2]));
              this.ch_TP10.push(Number(arr[i][3]));

              if (i > 255) {

                // abp_data.shift();
                this.ch_AF7.shift();
                this.ch_AF8.shift();
                this.ch_TP9.shift();
                this.ch_TP10.shift();

                for (let j = 0; j < 5; j++) {

                  this.sbp_channels[0][j] = bcijs.signalBandPower(this.ch_AF7, 256, this.frequency_bands[j]);
                  this.sbp_channels[1][j] = bcijs.signalBandPower(this.ch_AF8, 256, this.frequency_bands[j]);
                  this.sbp_channels[2][j] = bcijs.signalBandPower(this.ch_TP9, 256, this.frequency_bands[j]);
                  this.sbp_channels[3][j] = bcijs.signalBandPower(this.ch_TP10, 256, this.frequency_bands[j]);
                }

                console.log(this.sbp_channels[0]);

                if (this.highest_ind === 0) {

                  this.update_selected();

                } else {

                  this.update_highest();
                }

              }

            });
          }
        }
      }));
  }

  /**
   * helper function to update the svg to reflect the change when user selects a particular frequency
   */
  update_svg_selected(idx: number) {

    d3.selectAll('.' + this.node_class[idx])
      .style('fill', this.sbp_color[this.cur_freq_color])
      .attr('fill-opacity', this.opacities[idx])
      .merge(this.nodes[idx]);
  }

  /**
   * helper function to update the svg to reflect the change when user wants to display the frequency with highest abp
   */
  update_svg_highest(idx: number) {

    d3.selectAll('.' + this.node_class[idx])
      .style('fill', this.highest_colors[idx])
      .attr('fill-opacity', 1)
      .merge(this.nodes[idx]);
  }

  /**
   * updates the svg to display the frequency with the highest value currently
   * TODO: iterate through the channels to pick the frequency with the highest value for each channel and display
   *           the corresponding color
   *       if the current color chosen for the color is different than the previous color, update the svg to reflect
   *           the changes
   *       update prev_colors to be the current color
   */
  update_highest() {

    for (let i = 0; i < 4; i++) {

      this.highest_colors[i] = this.sbp_color[this.sbp_channels[i].indexOf(Math.max.apply(Math, this.sbp_channels[i]))];

      if (this.highest_colors[i] !== this.prev_colors[i]) {

        this.update_svg_highest(i);

        this.prev_colors[i] = this.highest_colors[i];
      }
    }
  }

  /**
   * update the svg to display the frequency selected by the user
   * TODO: iterate through the channels to check if the current abp value of the selected frequency is higher or lower
   *           than the previous recorded value for the abp of the frequency: if higher then increase opacity, if lower
   *           then decrease opacity to reflect changes in abp
   *       update the svg to reflect the changes
   */
  update_selected() {

    if (this.started_flag === 0) {

      console.log('first detected');

      this.prev_sbps = JSON.parse(JSON.stringify(this.sbp_channels));
      this.started_flag = 1;

    } else {

      console.log('cur_abp: ' + this.sbp_channels[0]);

      for (let i = 0; i < 4; i++) {
        if (this.sbp_channels[i][this.cur_frequency] > this.prev_sbps[i][this.cur_frequency]) {
          this.opacities[i] += 0.02;

          if (this.opacities[i] > 1) {
            this.opacities[i] = 1;
          }

        } else if (this.sbp_channels[i][this.cur_frequency] < this.prev_sbps[i][this.cur_frequency]) {
          this.opacities[i] -= 0.02;

          if (this.opacities[i] < 0) {
            this.opacities[i] = 0;
          }
        }

        this.update_svg_selected(i);

      }
      this.prev_sbps = JSON.parse(JSON.stringify(this.sbp_channels));
    }
  }

  /**
   * connectes to the Muse API through bluetooth
   * @returns {Promise<void>}
   */
  async connectMuse() {
    await this.muse.connect();
    await this.muse.start();

    this.data = zipSamples(this.muse.eegReadings);

    this.stream();
  }

  /**
   * subscribe to the Muse data
   */
  stream() {

    let nxt_idx = 0;

    this.data.subscribe((sample) => {

      this.bad_data = 0;

      this.cur_data = sample.data.slice(0, 4).map(Number);

      for (let i = 0; i < 4; i++) {

        if (isNaN(this.cur_data[i])) {

          this.bad_data = 1;
        }
      }

      if (this.bad_data === 0) {

        // split into 4 channels
        this.ch_AF7.push(Number(this.cur_data[0]));
        this.ch_AF8.push(Number(this.cur_data[1]));
        this.ch_TP9.push(Number(this.cur_data[2]));
        this.ch_TP10.push(Number(this.cur_data[3]));

        nxt_idx += 1;

        if (nxt_idx > 255) {

          // abp_data.shift();
          this.ch_AF7.shift();
          this.ch_AF8.shift();
          this.ch_TP9.shift();
          this.ch_TP10.shift();

          for (let j = 0; j < 5; j++) {

            this.sbp_channels[0][j] = bcijs.signalBandPower(this.ch_AF7, 256, this.frequency_bands[j]);
            this.sbp_channels[1][j] = bcijs.signalBandPower(this.ch_AF8, 256, this.frequency_bands[j]);
            this.sbp_channels[2][j] = bcijs.signalBandPower(this.ch_TP9, 256, this.frequency_bands[j]);
            this.sbp_channels[3][j] = bcijs.signalBandPower(this.ch_TP10, 256, this.frequency_bands[j]);
          }

          console.log(this.sbp_channels[0]);

          if (this.highest_ind === 0) {

            this.update_selected();

          } else {

            this.update_highest();
          }

        }
      }

    });
  }


}
