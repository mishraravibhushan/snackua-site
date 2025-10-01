import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, typography, spacing, borderRadius } from '../styles/theme';

interface PlaceholderImageProps {
  width: number;
  height: number;
  icon: string;
  text: string;
  backgroundColor?: string;
}

export default function PlaceholderImage({ 
  width, 
  height, 
  icon, 
  text, 
  backgroundColor = colors.background 
}: PlaceholderImageProps) {
  return (
    <View style={[styles.container, { width, height, backgroundColor }]}>
      <Ionicons name={icon as any} size={32} color={colors.text.light} />
      <Text style={styles.text}>{text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: borderRadius.md,
    borderWidth: 2,
    borderColor: colors.text.light,
    borderStyle: 'dashed',
  },
  text: {
    ...typography.bodySmall,
    color: colors.text.light,
    textAlign: 'center',
    marginTop: spacing.sm,
  },
});
