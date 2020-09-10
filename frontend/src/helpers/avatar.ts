import avatars, { AvatarId } from '../data/avatars';

export function getAvatarSource(avatarId: AvatarId) {
  return avatars[avatarId].source;
}
