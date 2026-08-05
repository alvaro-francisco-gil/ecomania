import { VALUE_AXES, VALUE_AXIS_IDS } from '@ecomania/shared';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

/**
 * Placeholder home screen.
 *
 * It renders the value-axis contract out of `@ecomania/shared`, which makes the workspace
 * dependency a compile-time assertion rather than a claim.
 *
 * The Rive avatar is **not** rendered yet: `rive-react-native` is installed, but
 * `packages/shared/assets/avatar.riv` does not exist — a `.riv` is a binary authored in the Rive
 * editor, so landing even a placeholder is a human decision about which sample to adopt and
 * under what licence. Until then this screen shows the data that will drive the avatar rather
 * than faking the avatar itself.
 */
export function AvatarScreen() {
  return (
    <ScrollView contentContainerStyle={styles.content}>
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
