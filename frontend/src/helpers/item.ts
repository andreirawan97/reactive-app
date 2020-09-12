import { Reward } from '../data/rewards';
import generalItems from '../data/generalItems';

export function getItemDetail(item: Reward) {
  let { id } = item;
  return generalItems[id];
}
