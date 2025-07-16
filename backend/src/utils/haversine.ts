import { Coordinate } from '../types/schema';

const R = 6378.1; // radius of earth in km

export default function haversineDistance(a: Coordinate, b: Coordinate) {
  const phi1 = (a.latitude * Math.PI) / 180;
  const phi2 = (b.latitude * Math.PI) / 180;
  const lambda1 = (a.longitude * Math.PI) / 180;
  const lambda2 = (b.longitude * Math.PI) / 180;
  const delta_phi = phi1 - phi2;
  const delta_lambda = lambda1 - lambda2;
  const x =
    Math.pow(Math.sin(delta_phi / 2), 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.pow(Math.sin(delta_lambda / 2), 2);
  const y = 2 * Math.atan2(Math.sqrt(x), Math.sqrt(1 - x));
  return R * y;
}
