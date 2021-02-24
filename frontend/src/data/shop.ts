import avatarsData from './avatars';
import phoneSkinsData from './phoneSkins';

type ItemTypes = 'avatars';

const shopItems = {
  avatars: [avatarsData.stickman, avatarsData.semicolon, avatarsData.theAtom],
  phoneSkins: [phoneSkinsData.nexus5],
};

export default shopItems;
