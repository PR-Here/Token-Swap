import { PRIMARY_COLOR } from '@/constant/colors';
import { IMAGES } from '@/utils/images';
import { getWidth } from '@/utils/size';
import React, { useCallback } from 'react';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';

interface RatingStarsProps {
  rating: number; // 1-5 scale
  size?: number;
  color?: string;
  emptyColor?: string;
  editable?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  size = 16,
  color = PRIMARY_COLOR,
  emptyColor = '#E0E0E0',
  editable = false,
  onRatingChange,
}) => {
  const getRatingImage = useCallback((starIndex: number) => {
    if (rating >= starIndex) {
      // Star is fully filled
      return IMAGES.RATING_100;
    } else if (rating >= starIndex - 1) {
      // Star is partially filled
      const partialValue = (rating - (starIndex - 1)) * 100;
      if (partialValue >= 75) {
        return IMAGES.RATING_75;
      } else if (partialValue >= 50) {
        return IMAGES.RATING_50;
      } else if (partialValue >= 25) {
        return IMAGES.RATING_25;
      } else {
        return IMAGES.RATING_0;
      }
    } else {
      // Star is empty
      return IMAGES.RATING_0;
    }
  }, [rating]);

  const handleStarPress = useCallback((starIndex: number) => {
    if (editable && onRatingChange) {
      onRatingChange(starIndex);
    }
  }, [editable, onRatingChange]);

  const stars = [];
  
  for (let i = 1; i <= 5; i++) {
    const starElement = (
      <Image
        key={i}
        source={getRatingImage(i)}
        style={[styles.star, { width: getWidth(size), height: getWidth(size) }]}
        resizeMode="contain"
      />
    );

    if (editable) {
      stars.push(
        <TouchableOpacity
          key={i}
          onPress={() => handleStarPress(i)}
          style={styles.starTouchable}
          activeOpacity={0.7}
        >
          {starElement}
        </TouchableOpacity>
      );
    } else {
      stars.push(starElement);
    }
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
  starTouchable: {
    padding: getWidth(2),
    marginRight: getWidth(2),
  },
});
