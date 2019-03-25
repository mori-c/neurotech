const c_radius = 250;
const i_radius = 210;
const c_x = 1000 / 2;
const c_y = 600 / 2;
const left_x = c_x - c_radius;
const right_x = c_x + c_radius;
const top_y = c_y - c_radius;
const bottom_y = c_y + c_radius;

const c_dist = i_radius * 2 / 4;
const corner_x = i_radius * Math.cos(40 * Math.PI / 180);
const corner_y = i_radius * Math.sin(40 * Math.PI / 180);
const t_x = corner_x * 2 / 4;
const t_y = corner_y * 0.8;
const edge_x = i_radius * Math.cos(75 * Math.PI / 180);
const edge_y = i_radius * Math.sin(75 * Math.PI / 180);

const af_x = i_radius * Math.cos(57 * Math.PI / 180);
const af_y = i_radius * Math.sin(57 * Math.PI / 180);

const tp_x = c_radius * Math.cos(20 * Math.PI / 180);
const tp_y = c_radius * Math.sin(20 * Math.PI / 180);

export let node_data = {
  'back_nodes': [
    {'id': 'A1', 'x': c_x - i_radius - 80, 'y': c_y - 20},
    {'id': 'A2', 'x': c_x + i_radius + 80, 'y': c_y - 20},
    {'id': 'T3', 'x': c_x - i_radius, 'y': c_y},
    {'id': 'C3', 'x': c_x - c_dist, 'y': c_y},
    {'id': 'Cz', 'x': c_x, 'y': c_y},
    {'id': 'C4', 'x': c_x + c_dist, 'y': c_y},
    {'id': 'T4', 'x': c_x + i_radius, 'y': c_y},
    {'id': 'F7', 'x': c_x - corner_x, 'y': c_y - corner_y},
    {'id': 'F8', 'x': c_x + corner_x, 'y': c_y - corner_y},
    {'id': 'T5', 'x': c_x - corner_x, 'y': c_y + corner_y},
    {'id': 'T6', 'x': c_x + corner_x, 'y': c_y + corner_y},
    {'id': 'F3', 'x': c_x - t_x, 'y': c_y - t_y},
    {'id': 'Fz', 'x': c_x, 'y': c_y - t_y},
    {'id': 'F4', 'x': c_x + t_x, 'y': c_y - t_y},
    {'id': 'P3', 'x': c_x - t_x, 'y': c_y + t_y},
    {'id': 'Pz', 'x': c_x, 'y': c_y + t_y},
    {'id': 'P4', 'x': c_x + t_x, 'y': c_y + t_y},
    {'id': 'Fp1', 'x': c_x - edge_x, 'y': c_y - edge_y},
    {'id': 'Fp2', 'x': c_x + edge_x, 'y': c_y - edge_y},
    {'id': 'O1', 'x': c_x - edge_x, 'y': c_y + edge_y},
    {'id': 'O2', 'x': c_x + edge_x, 'y': c_y + edge_y},
  ],
  'front_nodes': [
    {'id': 'AF7', 'x': c_x - af_x, 'y': c_y - af_y, 'delay': 1},
    {'id': 'AF8', 'x': c_x + af_x, 'y': c_y - af_y, 'delay': 2.5},
    {'id': 'TP9', 'x': c_x - tp_x, 'y': c_y + tp_y, 'delay': 4.5},
    {'id': 'TP10', 'x': c_x + tp_x, 'y': c_y + tp_y, 'delay': 6},
  ]
};
