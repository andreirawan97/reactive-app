import { ImageSourcePropType } from 'react-native';

import noAvatar from './noAvatar';

export type AvatarId = 'noAvatar';

export type Avatar = {
  id: AvatarId;
  name: string;
  source: ImageSourcePropType;
};

const avatars: Record<AvatarId, Avatar> = {
  noAvatar,
};

export default avatars;
