import { Component, OnInit } from '@angular/core';
import * as tf from '@tensorflow/tfjs'

@Component( {
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
} )
export class AppComponent implements OnInit
{
  title = 'ConvNetApp';
  linearModel: tf.Sequential;
  prediction: any;
  ngOnInit()
  {
    this.train();
  }
  async train(): Promise<any>
  {
    // define linear regression model
    this.linearModel = tf.sequential();
    this.linearModel.add( tf.layers.dense( { units: 1, inputShape: [ 1 ] } ) );

    // Prep model to train: Specify loss and optimizer
    this.linearModel.compile( { loss: 'meanSquaredError', optimizer: 'sgd' } );

    // train model on random inputs
    // tensor === array
    const xs = tf.tensor1d( [ 3.2, 4.4, 5.5 ] );
    const ys = tf.tensor1d( [ 1.6, 2.7, 3.5 ] );

    // train
    await this.linearModel.fit( xs, ys )

    console.log( 'linear model trained' )
  }
  predict( val: number )
  {
    // make prediction in linear model by feeding values
    // dataSync === tf.js data extracting session
    const output = this.linearModel.predict( tf.tensor2d( [ val ], [ 1, 1 ] ) ) as any;
    this.prediction = Array.from( output.dataSync() )[ 0 ]
  }
}
