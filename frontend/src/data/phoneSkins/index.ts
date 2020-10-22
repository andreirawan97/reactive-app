import { ImageSourcePropType } from 'react-native';

import iphone6 from './iphone6';
import nexus5 from './nexus5';

export type PhoneSkinId = 'iphone6' | 'nexus5';

export type PhoneSkin = {
  id: string;
  name: string;
  source: ImageSourcePropType;
  dimension: {
    width: number;
    height: number;
  };
  renderArea: {
    offset: {
      top: number;
      left: number;
    };
    width: number;
    height: number;
  };
  price: number;
};

const phoneSkins: Record<PhoneSkinId, PhoneSkin> = {
  iphone6,
  nexus5,
};

export default phoneSkins;
