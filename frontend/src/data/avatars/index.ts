import { ImageSourcePropType } from 'react-native';

import noAvatar from './noAvatar';
import fallenCoder from './fallenCoder';
import stickman from './stickman';
import millionaire from './millionaire';
import semicolon from './semicolon';
import theAtom from './theAtom';

export type AvatarId =
  | 'noAvatar'
  | 'fallenCoder'
  | 'stickman'
  | 'millionaire'
  | 'semicolon'
  | 'theAtom';

export type Avatar = {
  id: AvatarId;
  name: string;
  source: ImageSourcePropType;
  price: number;
};

const avatars: Record<AvatarId, Avatar> = {
  noAvatar,
  fallenCoder,
  stickman,
  millionaire,
  semicolon,
  theAtom,
};

export default avatars;
