import { VALUE_AXES, VALUE_AXIS_IDS } from '@ecomania/shared';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import Rive from 'rive-react-native';

/**
 * Placeholder home screen.
 *
 * It renders the value-axis contract out of `@ecomania/shared`, which makes the workspace
 * dependency a compile-time assertion rather than a claim.
 *
 * The Rive canvas renders `avatar.sample.riv` — a development stand-in, not our avatar, and not
 * yet driven by any input (the input contract is blocked on the archetype taxonomy). It is here
 * so the integration layer exists before the real asset does. Same file as the funnel loads.
 */
export function AvatarScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
      <View style={styles.avatar}>
        <Rive
          source={require('@ecomania/shared/assets/avatar.sample.riv')}
          autoplay
          style={styles.rive}
        />
      </View>

      <Text style={styles.heading}>The value space</Text>
      <Text style={styles.body}>
        Four axes. Each drives one non-overlapping channel of the avatar.
      </Text>

      {VALUE_AXIS_IDS.map((id) => {
        const axis = VALUE_AXES[id];
        return (
          <View key={id} style={styles.axis}>
            <Text style={styles.axisName}>{axis.id}</Text>
            <Text style={styles.body}>
              {axis.negativePole} ↔ {axis.positivePole}
            </Text>
            <Text style={styles.channel}>channel: {axis.visualChannel}</Text>
          </View>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 24,
    gap: 16,
  },
  avatar: {
    aspectRatio: 1,
    width: '100%',
  },
  rive: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
  },
  body: {
    fontSize: 15,
  },
  axis: {
    gap: 2,
  },
  axisName: {
    fontSize: 16,
    fontWeight: '600',
  },
  channel: {
    fontSize: 13,
    opacity: 0.6,
  },
});
