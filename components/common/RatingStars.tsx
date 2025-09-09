import { PRIMARY_COLOR } from '@/constant/colors';
import { getWidth } from '@/utils/size';
import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, View } from 'react-native';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  color?: string;
  emptyColor?: string;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  color = PRIMARY_COLOR,
  emptyColor = '#E0E0E0',
}) => {
  const stars = [];
  
  for (let i = 1; i <= maxRating; i++) {
    const isFilled = i <= rating;
    const isHalfFilled = i - 0.5 <= rating && i > rating;
    
    stars.push(
      <Ionicons
        key={i}
        name={isFilled ? 'star' : isHalfFilled ? 'star-half' : 'star-outline'}
        size={getWidth(size)}
        color={isFilled || isHalfFilled ? color : emptyColor}
        style={styles.star}
      />
    );
  }

  return <View style={styles.container}>{stars}</View>;
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  star: {
    marginRight: getWidth(2),
  },
});
