import { ImageSourcePropType } from 'react-native';

import currency from './currency';
import exp from './exp';

export type GeneralItem = {
  id: string;
  name: string;
  source: ImageSourcePropType;
};

const generalItems: Record<string, GeneralItem> = {
  currency,
  exp,
};

export default generalItems;
