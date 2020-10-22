import avatarsData from './avatars';
import phoneSkinsData from './phoneSkins';

type ItemTypes = 'avatars';

const shopItems = {
  avatars: [
    avatarsData.fallenCoder,
    avatarsData.stickman,
    avatarsData.millionaire,
    avatarsData.semicolon,
    avatarsData.theAtom,
  ],
  phoneSkins: [phoneSkinsData.nexus5],
};

export default shopItems;
