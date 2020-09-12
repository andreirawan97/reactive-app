import { ImageSourcePropType } from 'react-native';

import iphone6 from './iphone6';

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
};

const phoneSkins: Record<string, PhoneSkin> = {
  iphone6,
};

export default phoneSkins;
