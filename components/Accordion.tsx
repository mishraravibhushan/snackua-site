import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, spacing, borderRadius } from '../styles/theme';

interface AccordionItem {
  question: string;
  answer: string;
}

interface AccordionProps {
  items: AccordionItem[];
  style?: any;
}

export default function Accordion({ items, style }: AccordionProps) {
  const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newExpandedItems = new Set(expandedItems);
    if (newExpandedItems.has(index)) {
      newExpandedItems.delete(index);
    } else {
      newExpandedItems.add(index);
    }
    setExpandedItems(newExpandedItems);
  };

  return (
    <View style={[styles.container, style]}>
      {items.map((item, index) => {
        const isExpanded = expandedItems.has(index);
        
        return (
          <View key={index} style={styles.item}>
            <TouchableOpacity
              style={styles.header}
              onPress={() => toggleItem(index)}
              accessibilityLabel={`${item.question}. Tap to ${isExpanded ? 'collapse' : 'expand'}`}
              accessibilityRole="button"
            >
              <Text style={styles.question}>{item.question}</Text>
              <Ionicons
                name={isExpanded ? 'chevron-up' : 'chevron-down'}
                size={20}
                color={colors.primary}
              />
            </TouchableOpacity>
            
            {isExpanded && (
              <View style={styles.content}>
                <Text style={styles.answer}>{item.answer}</Text>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: colors.text.light,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    fontFamily: fonts.body,
    color: colors.text.primary,
    flex: 1,
    marginRight: spacing.sm,
  },
  content: {
    paddingHorizontal: spacing.sm,
    paddingBottom: spacing.md,
  },
  answer: {
    fontSize: 14,
    fontFamily: fonts.body,
    color: colors.text.secondary,
    lineHeight: 20,
  },
});
