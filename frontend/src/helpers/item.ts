import { Reward } from '../data/rewards';
import generalItems from '../data/generalItems';
import avatars, { AvatarId } from '../data/avatars';

export function getItemDetail(item: Reward) {
  let { id } = item;

  if (id === 'exp' || id === 'currency') {
    return generalItems[id];
  } else {
    let avatarId = item.value as AvatarId; // This is dangerous. But oh well.
    return avatars[avatarId];
  }
}
