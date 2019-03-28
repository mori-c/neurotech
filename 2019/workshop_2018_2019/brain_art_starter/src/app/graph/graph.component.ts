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

    // TODO

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Alpha, sets the current frequency selected as 'beta'
   */
  setBeta() {

    // TODO

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Beta, sets the current frequency selected as 'theta'
   */
  setTheta() {

    // TODO

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Theta, sets the current frequency selected as 'delta'
   */
  setDelta() {

    // TODO

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Delta, sets the current frequency selected as 'gamma'
   */
  setGamma() {

    // TODO

    console.log('current wave: ' + this.cur_frequency);
  }

  /**
   * when user clicks on the button Highest, sets the highest_ind to 1 to indicate that we want to display the
   * frequency with the highest value
   */
  setHighest() {

    // TODO
  }

  /**
   * reads input signals from a csv file and calculates the signal band powers for each channel
   */
  offLine() {

    // subscribe and parse through the csv data
    this.http.get('./assets/stare_blink.csv', {responseType: 'text'})
      .subscribe(data => this.papa.parse(data, {
        complete: (result) => {

          // an array of array of numbers containing of all the lines of data from the csv file
          const arr = Array<Array<number>>();

          for (let i = 1; i < result.data.length / 2; i++) {
            arr.push(result.data[i * 2]);
          }

          // iterate through each line read from the csv file
          for (let i = 0; i < arr.length - 1; i++) {

            setTimeout(() => {

              // TODO: for each of the channels, append the latest value read
              //       note that each item in the array 'arr' is of the form [AF7 value, AF8 value, TP9 value, TP10 value]

              if (i > 255) {

                // TODO: if the channels contain more than 256 records, need to remove the oldest item

                // TODO: update the sbp_channels to contain the frequency bands calculated across each channel
                  //       hint: use for-loop to iterate through the five frequencies
                  //       note that sbp_channels is of the form array of array of numbers, where each item in sbp_channels
                  //           represent the array of frequency bands for a particular channel

                // TODO: update the svg to display the changes depending on whether user selected a particular frequency
                //         or if the user wanted to see the frequency with the highest value

              }

            });
          }
        }
      }));
  }

  /**
   * helper function to update the svg to reflect the change when user selects a particular frequency
   */
  update_nodes_selected(idx: number) {

    d3.selectAll('.' + this.node_class[idx])
      .style('fill', this.sbp_color[this.cur_freq_color])
      .attr('fill-opacity', this.opacities[idx])
      .merge(this.nodes[idx]);
  }

  /**
   * helper function to update the svg to reflect the change when user wants to display the frequency with highest abp
   */
  update_nodes_highest(idx: number) {

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

    // iterate through the four channels
    for (let i = 0; i < 4; i++) {

      // TODO: find the frequency with the highest band power for each channel and update highest_colors
      //       note: highest_colors is an array of numbers where each item is the corresponding color of the
      //                 frequency with the highest band power in each channel

      // TODO: compare the current colors with the previous colors, and update the svg nodes if they are different

      // TODO: update the previous colors to equal to the current colors
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

      // iterate through the four channels
      for (let i = 0; i < 4; i++) {

        // TODO: compare the current band power of the selected frequency with the previous, and update the fill opacity accordingly
        //           if the current band power is lower than the previous, decrease opacity, and increase otherwise
        //       note: make sure the opacity stays in an range between 0 and 1
        //       note: opacities is an array of numbers where each item is the fill opacity of a particular channel


        // TODO: update the svg nodes to reflect the changes

      }
      // sets the previous band powers to equal to the current band powers for frequencies
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

      // checks if any field is NaN, if so then skip the data without processing it
      for (let i = 0; i < 4; i++) {

        if (isNaN(this.cur_data[i])) {

          this.bad_data = 1;
        }
      }

      if (this.bad_data === 0) {

        // TODO: for each of the channels, append the latest value read

        nxt_idx += 1;

        if (nxt_idx > 255) {

          // TODO: if the channels contain more than 256 records, need to remove the oldest item

            // TODO: update the sbp_channels to contain the frequency bands calculated across each channel
            //       hint: use for-loop to iterate through the five frequencies
            //       note that sbp_channels is of the form array of array of numbers, where each item in sbp_channels
            //           represent the array of frequency bands for a particular channel

            // TODO: update the svg to display the changes depending on whether user selected a particular frequency
            //         or if the user wanted to see the frequency with the highest value

        }
      }

    });
  }


}
