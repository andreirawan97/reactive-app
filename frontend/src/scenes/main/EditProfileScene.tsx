import React, { useCallback, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { Feather } from '@expo/vector-icons';

import { NavigationScreenProps } from '../../types/navigation';
import { COLORS } from '../../constants/styles';
import { Card, ItemSelection } from '../../components';
import { UserData } from '../../fixtures/user';
import { getAvatarSource } from '../../helpers/avatar';
import { CurrencyIcon } from '../../../assets';
import { Button, Fetcher, Loading } from '../../core-ui';
import { decodeToken, encodeToken } from '../../helpers/token';
import { getFromStorage } from '../../helpers/storage';
import { LOCALSTORAGE_KEYS } from '../../constants/keys';
import { showModal } from '../../core-ui/ModalProvider';
import homebrewFetch from '../../helpers/homebrewFetch';
import { ENDPOINT, FIREBASE_URL } from '../../constants/network';
import { Response } from '../../types/firestore';
import { AvatarId } from '../../data/avatars';
import phoneSkins, { PhoneSkin, PhoneSkinId } from '../../data/phoneSkins';

type Props = {} & NavigationScreenProps;

const email = decodeToken(getFromStorage(LOCALSTORAGE_KEYS.TOKEN) || '');
const requestBody = { token: getFromStorage(LOCALSTORAGE_KEYS.TOKEN) };
const updateUserURL = `${FIREBASE_URL}${ENDPOINT.UPDATE_USER_PROFILE}`;
const getCustomizationItemURL = `${FIREBASE_URL}${ENDPOINT.GET_CUSTOMIZATION_ITEM}`;

export default function EditProfileScene(props: Props) {
  const { userData } = props.route.params as {
    userData: UserData;
  };

  const [selectedAvatar, setSelectedAvatar] = useState(userData.avatar);
  const [selectedPhoneSkin, setSelectedPhoneSkin] = useState(
    userData.phoneSkin,
  );
  const [avatarIndex, setAvatarIndex] = useState(0);
  const [phoneSkinIndex, setPhoneSkinIndex] = useState(0);
  const [userAvatars, setUserAvatars] = useState<Array<AvatarId>>(['noAvatar']);
  const [userPhoneSkins, setUserPhoneSkins] = useState<Array<PhoneSkinId>>([
    'iphone6',
  ]);

  const { avatar, name, border, currency } = userData;

  const onBackButtonPressed = () => {
    props.navigation.goBack();
  };

  const onAvatarItemChange = (newAvatarId: string) => {
    setSelectedAvatar(newAvatarId as AvatarId);
  };

  const onPhoneSkinItemChange = (newPhoneSkinId: string) => {
    setSelectedPhoneSkin(newPhoneSkinId);
  };

  const saveChanges = useCallback(() => {
    showModal({
      showCloseButton: false,
      dismissable: false,
      content: () => <Loading />,
    });

    let rawRequestBody = {
      email,
      phoneSkin: selectedPhoneSkin,
      avatar: selectedAvatar,
    };

    let requestBody = {
      token: encodeToken(rawRequestBody),
    };

    homebrewFetch('POST', updateUserURL, requestBody)
      .then((response) => response.json())
      .then((data: Response) => {
        showModal({
          showCloseButton: true,
          dismissable: false,
          content: () => (
            <View
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 60,
              }}
            >
              <Text>{data.message}</Text>
            </View>
          ),
          onCloseModal: () => {
            props.navigation.goBack();
          },
        });
      });
  }, [props.navigation, selectedAvatar, selectedPhoneSkin]);

  const onSuccessGetCustomizationItem = useCallback(
    (response: Response) => {
      let { token } = response;
      let data = decodeToken(token as string) as {
        avatars: Array<AvatarId>;
        phoneSkins: Array<PhoneSkinId>;
      };
      setAvatarIndex(
        data.avatars.findIndex((avatarId_) => avatarId_ === selectedAvatar),
      );
      setPhoneSkinIndex(
        data.phoneSkins.findIndex(
          (phoneSkinId_) => phoneSkinId_ === selectedPhoneSkin,
        ),
      );
      setUserAvatars(data.avatars);
      setUserPhoneSkins(data.phoneSkins);
    },
    [selectedAvatar, selectedPhoneSkin],
  );

  const CardContent = () => (
    <View style={{ alignItems: 'center' }}>
      <Avatar
        rounded
        source={getAvatarSource(avatar)}
        size="large"
        containerStyle={styles.avatarContainer}
      />

      <Text style={styles.name} numberOfLines={1}>
        {name}
      </Text>

      <View style={styles.currencyContainer}>
        <Image
          source={CurrencyIcon}
          style={{
            width: 24,
            height: 20,
            padding: 5,
            marginRight: 8,
          }}
        />
        <Text style={styles.currencyText} numberOfLines={1}>
          {currency}
        </Text>
      </View>

      <View
        style={{
          padding: 12,
          width: '100%',
          justifyContent: 'flex-start',
        }}
      >
        <Text style={styles.headerText}>Customization</Text>

        <Text style={styles.itemSection}>Avatars</Text>
        <ItemSelection
          type="avatars"
          itemData={userAvatars}
          onItemChange={onAvatarItemChange}
          initialIndex={avatarIndex}
        />

        <Text style={[styles.itemSection, { marginTop: 20 }]}>Phone Skins</Text>
        <ItemSelection
          type="phoneSkins"
          itemData={userPhoneSkins}
          onItemChange={onPhoneSkinItemChange}
          initialIndex={phoneSkinIndex}
        />

        <Button
          onPress={saveChanges}
          title="Save Changes"
          containerStyle={{
            paddingVertical: 20,
            marginTop: 20,
          }}
        />
      </View>
    </View>
  );

  return (
    <Fetcher
      URL={getCustomizationItemURL}
      requestBody={requestBody}
      method="POST"
      onSuccess={onSuccessGetCustomizationItem}
    >
      <View style={styles.container}>
        <TouchableOpacity
          style={{
            borderRadius: 26,
            backgroundColor: 'white',
            left: 32,
            top: 32,
            position: 'absolute',
            zIndex: 2,
            shadowColor: 'rgba(0,0,0,0.16)',
            shadowRadius: 6,
            shadowOffset: {
              width: 1,
              height: 3,
            },
            width: 52,
            height: 52,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={onBackButtonPressed}
        >
          <Feather name="arrow-left" size={34} color={COLORS.PRIMARY} />
        </TouchableOpacity>

        <ScrollView contentContainerStyle={{ flexDirection: 'row' }}>
          <View style={{ flex: 1 }} />
          <View style={{ flex: 2, paddingVertical: 30 }}>
            <Card content={CardContent} />
          </View>
          <View style={{ flex: 1 }} />
        </ScrollView>
      </View>
    </Fetcher>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(114,210,227, 0.6)',
  },
  avatarContainer: {
    marginBottom: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  itemSection: {
    fontSize: 16,
    marginBottom: 10,
  },
  currencyContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  currencyText: {
    fontSize: 14,
  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 12,
    marginBottom: 12,
  },
});
