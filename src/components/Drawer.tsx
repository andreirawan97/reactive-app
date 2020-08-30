import React, { ReactElement, useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  Animated,
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { COLORS } from '../constants/styles';
import { CurrencyLogo, TestProfilePicture } from '../../assets';
import { UserData } from '../fixtures/user';
import { clearStorage } from '../helpers/storage';

export type Content = {
  title: string;
  icon?: () => ReactElement;
  component: () => ReactElement;
};
type Props = {
  userData: UserData;
  contents: Array<Content>;
};

export default function Drawer(props: Props) {
  /**
   * TO-DO:
   * 1. Gambar profile
   *
   */
  let { contents, userData } = props;
  let { border, currency, currentExp } = userData;

  const [selectedIndex, setSelectedIndex] = useState(0);

  let onLogout = () => {
    clearStorage();
    window.location.reload();
  };

  let ProgressBar = () => {
    let currentPercentage = 80; // TODO: Calculate it.
    return (
      <View
        style={{
          height: 4,
          width: '70%',
          backgroundColor: 'white',
          borderRadius: 2,
        }}
      >
        <View
          style={{
            height: 4,
            width: `${currentPercentage}%`,
            backgroundColor: COLORS.PRIMARY,
            borderRadius: 2,
          }}
        />
      </View>
    );
  };

  let SelectedComponent = () => {
    let animatedTranslateValue = new Animated.Value(150);
    let animatedFadeValue = new Animated.Value(0);

    Animated.parallel([
      Animated.timing(animatedTranslateValue, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true,
      }),
      Animated.timing(animatedFadeValue, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true,
      }),
    ]).start();

    const animatedStyle = {
      transform: [{ translateX: animatedTranslateValue }],
      opacity: animatedFadeValue,
    };

    return (
      <Animated.View style={[{ flex: 1 }, animatedStyle]}>
        {contents[selectedIndex].component()}
      </Animated.View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.sideBarContainer}>
        <View style={styles.userInfoContainer}>
          <Avatar
            rounded
            source={TestProfilePicture}
            size="large"
            containerStyle={[
              styles.avatarContainer,
              border !== ''
                ? {
                    padding: 5,
                    borderWidth: 1,
                    borderColor: COLORS.PASTEL_SALMON,
                  }
                : null,
            ]}
          />
          <Text style={styles.name} numberOfLines={1}>
            Andre Irawan
          </Text>

          <View style={styles.currencyContainer}>
            <Image
              source={CurrencyLogo}
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

          <Text style={styles.level}>
            Level {Math.floor(currentExp / 1000)} ({currentExp} EXP)
          </Text>
          <ProgressBar />
        </View>

        <View style={styles.selectorContainer}>
          {contents.map((content, i) => {
            const selectedStyle =
              i === selectedIndex
                ? styles.selectedTitleContainer
                : styles.titleContainer;
            return (
              <TouchableOpacity
                key={i}
                style={selectedStyle}
                onPress={() => setSelectedIndex(i)}
              >
                {content.icon ? (
                  <View style={styles.iconContainer}>{content.icon()}</View>
                ) : null}

                <Text style={styles.titleText}>{content.title}</Text>
              </TouchableOpacity>
            );
          })}
        </View>

        <View style={styles.logoutContainer}>
          <TouchableOpacity style={styles.titleContainer} onPress={onLogout}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons
                name="power"
                size={22}
                color={COLORS.PASTEL_SALMON}
              />
            </View>
            <Text style={[styles.titleText, { color: COLORS.PASTEL_SALMON }]}>
              Log Out
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <SelectedComponent />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sideBarContainer: {
    flex: 1,
    backgroundColor: '#1a1a1a',
    alignItems: 'center',
  },
  contentContainer: {
    flex: 4,
  },
  userInfoContainer: {
    marginTop: 40,
    width: '100%',
    alignItems: 'center',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
    marginBottom: 12,
  },
  level: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.6)',
    marginBottom: 12,
  },
  currencyContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  currencyText: {
    fontSize: 14,
    color: 'white',
  },
  selectorContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 36,
  },
  titleText: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
    fontSize: 16,
  },
  selectedTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    backgroundColor: COLORS.PRIMARY,
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: '80%',
    borderRadius: 8,
    marginBottom: 12,
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: '80%',
    borderRadius: 8,
    marginBottom: 12,
  },
  iconContainer: {
    marginRight: 12,
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
  },
  avatarContainer: {
    marginBottom: 12,
  },
});
