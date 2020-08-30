import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';

import { journey, Section, Stage } from '../../../data/journey';
import { FONT_SIZE, COLORS } from '../../../constants/styles';
import { NavigationScreenProps } from '../../../types/navigation';

type Props = {} & NavigationScreenProps;
export default function JourneyScene(props: Props) {
  let currentStage = journey[0].stages[0];

  let StageComponent = (props: Stage) => {
    let { name, icon } = props;

    const StageIcon = icon;
    return (
      <TouchableOpacity
        style={styles.stageContainer}
        onPress={() => (currentStage = props)}
      >
        <View style={styles.stageIcon}>
          <StageIcon />
        </View>
        <Text style={styles.stageNameText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  let SectionComponent = (props: Section & { index: number }) => {
    let { name, stages, index } = props;
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionHeaderText}>
          {index + 1}. {name}
        </Text>
        {stages.map((stage, i) => (
          <StageComponent
            key={i}
            name={stage.name}
            description={stage.description}
            levels={stage.levels}
            icon={stage.icon}
          />
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.stagesContainer}>
        {journey.map((section, i) => (
          <SectionComponent
            key={i}
            index={i}
            name={section.name}
            stages={section.stages}
          />
        ))}
      </ScrollView>
      <View style={styles.levelsContainer}>
        <Text style={styles.levelsStageNameText}>{currentStage.name}</Text>
        <Text style={styles.stageDescriptionText}>
          {currentStage.description}
        </Text>

        <View style={styles.levelsSelectorContainer}>
          {currentStage.levels.map((level, i) => (
            <TouchableOpacity
              key={i}
              style={styles.levelSelector}
              onPress={() => props.navigation.navigate('LevelScene', level)}
            >
              <Text style={styles.levelText}>{i + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    flexDirection: 'row',
  },
  stagesContainer: {
    flex: 1,
    marginVertical: 32,
    marginHorizontal: 24,
  },
  levelsContainer: {
    flex: 4,
    padding: 40,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: -1,
      height: 2,
    },
  },
  sectionHeaderText: {
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  sectionContainer: {
    width: '100%',
  },
  stageContainer: {
    backgroundColor: COLORS.PRIMARY,
    borderRadius: 8,
    shadowColor: 'rgba(0,0,0,0.16)',
    shadowRadius: 6,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  stageNameText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: COLORS.PRIMARY_TEXT,
  },
  levelsStageNameText: {
    fontSize: FONT_SIZE.HEADER2,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  stageDescriptionText: {
    fontSize: FONT_SIZE.CAPTION,
    color: 'rgba(0,0,0,0.6)',
    marginBottom: 24,
  },
  levelsSelectorContainer: {
    width: '100%',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  levelSelector: {
    borderRadius: 20,
    height: 90,
    width: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.PRIMARY,
    marginBottom: 20,
    marginRight: 20,
  },
  levelText: {
    color: COLORS.PRIMARY_TEXT,
    fontWeight: 'bold',
    fontSize: 36,
  },
  stageIcon: {
    marginRight: 20,
  },
});
