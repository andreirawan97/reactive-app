import React, {
  ReactElement,
  useState,
  useEffect,
  Fragment,
  ReactNode,
} from 'react';
import {
  View,
  ViewProps,
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  Animated,
} from 'react-native';
import { EventEmitter } from 'fbemitter';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FONT_SIZE, COLORS } from '../constants/styles';

type Props = {
  children: ReactNode;
};

type ModalConfig = {
  content: () => ReactElement;
  showCloseButton?: boolean;
  dismissable?: boolean; // Close when backdrop is pressed
  title?: string;
  contentContainerStyle?: ViewStyle;
  containerStyle?: ViewStyle;
  onCloseModal?: () => void;
};

let modalEmitter = new EventEmitter();
export let showModal = (modalConfig: ModalConfig) => {
  modalEmitter.emit('showModal', modalConfig);
};

export default function ModalProvider(props: Props) {
  const initialConfig: ModalConfig = {
    content: () => <></>,
    showCloseButton: true,
    dismissable: false,
    title: '',
    contentContainerStyle: {},
    containerStyle: {},
    onCloseModal: () => {},
  };

  const [isShowing, setShowing] = useState(false);
  const [config, setConfig] = useState(initialConfig);

  let animatedSpringValue = new Animated.Value(0.3);
  let animatedFadeValue = new Animated.Value(0);

  const {
    containerStyle,
    content,
    contentContainerStyle,
    dismissable,
    onCloseModal,
    showCloseButton,
    title,
  } = config;

  useEffect(() => {
    modalEmitter.addListener('showModal', (modalConfig: ModalConfig) => {
      if (!isShowing) {
        setShowing(true);
        setConfig({
          ...config,
          ...modalConfig,
        });
      }
    });

    return () => {
      modalEmitter.removeAllListeners();
    };
  }, [isShowing, config]);

  let closeModal = () => {
    Animated.parallel([
      Animated.spring(animatedSpringValue, {
        useNativeDriver: true,
        toValue: 0,
        tension: 50,
      }),
      Animated.timing(animatedFadeValue, {
        useNativeDriver: true,
        toValue: 0,
        duration: 200,
      }),
    ]).start();

    setTimeout(() => {
      setShowing(false);
      onCloseModal && onCloseModal();
    }, 200);
  };

  let renderModal = () => {
    Animated.parallel([
      Animated.spring(animatedSpringValue, {
        useNativeDriver: true,
        toValue: 1,
        tension: 50,
      }),
      Animated.timing(animatedFadeValue, {
        useNativeDriver: true,
        toValue: 1,
        duration: 200,
      }),
    ]).start();

    const animatedStyle = {
      transform: [{ scale: animatedSpringValue }],
      opacity: animatedFadeValue,
    };

    return (
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.backdropContainer}
          disabled={!dismissable}
          onPress={closeModal}
        />
        <Animated.View
          style={[styles.modalContainer, containerStyle, animatedStyle]}
        >
          <View style={styles.headerContainer}>
            <Text style={styles.titleText}>{title}</Text>
            {showCloseButton && (
              <MaterialCommunityIcons
                name="close"
                size={28}
                color={COLORS.GRAY}
                onPress={closeModal}
              />
            )}
          </View>
          <View style={contentContainerStyle}>{content()}</View>
        </Animated.View>
      </View>
    );
  };

  return (
    <Fragment>
      {props.children}
      {isShowing && renderModal()}
    </Fragment>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  backdropContainer: {
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.55)',
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    position: 'absolute',
    minWidth: 500,
    minHeight: 500,
    backgroundColor: 'white',
    zIndex: 2,
    borderRadius: 24,
    paddingVertical: 24,
    paddingHorizontal: 36,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: FONT_SIZE.HEADER2,
  },
});
