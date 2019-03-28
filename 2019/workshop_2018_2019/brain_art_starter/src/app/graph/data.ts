const c_radius = 250;
const i_radius = 210;
const c_x = 610 / 2;
const c_y = 600 / 2;


const af_x = i_radius * Math.cos(45 * Math.PI / 180);
const af_y = i_radius * Math.sin(60 * Math.PI / 180);

const tp_x = c_radius * Math.cos(20 * Math.PI / 180);
const tp_y = c_radius * Math.sin(20 * Math.PI / 180);

export let node_data = {
  'front_nodes': [
    {'id': 'AF7', 'x': c_x - af_x, 'y': c_y - af_y, 'delay': 1},
    {'id': 'AF8', 'x': c_x + af_x, 'y': c_y - af_y, 'delay': 2.5},
    {'id': 'TP9', 'x': c_x - (tp_x * 1.1), 'y': c_y + tp_y, 'delay': 4.5},
    {'id': 'TP10', 'x': c_x + (tp_x * 1.1), 'y': c_y + tp_y, 'delay': 6},
  ],
  'AF7': [{'id': 'AF7', 'x': c_x - af_x, 'y': c_y - af_y, 'delay': 1}],
  'AF8': [{'id': 'AF8', 'x': c_x + af_x, 'y': c_y - af_y, 'delay': 2.5}],
  'TP9': [{'id': 'TP9', 'x': c_x - (tp_x * 1.1), 'y': c_y + tp_y, 'delay': 4.5}],
  'TP10': [{'id': 'TP10', 'x': c_x + (tp_x * 1.1), 'y': c_y + tp_y, 'delay': 6}]
};
