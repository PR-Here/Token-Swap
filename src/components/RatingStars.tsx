import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Rating } from 'react-native-ratings';
import { getWidth } from '../utils/size';
import { PRIMARY_COLOR } from '../constant/colors';

interface RatingStarsProps {
  rating: number;
  maxRating?: number;
  size?: number;
  readonly?: boolean;
  onRatingChange?: (rating: number) => void;
}

const RatingStars: React.FC<RatingStarsProps> = ({
  rating,
  maxRating = 5,
  size = 16,
  readonly = false,
  onRatingChange,
}) => {
  const [currentRating, setCurrentRating] = useState(rating);

  const handleRatingChange = (newRating: number) => {
    setCurrentRating(newRating);
    onRatingChange?.(newRating);
  };

  return (
    <View style={styles.container}>
      <Rating
        type="star"
        ratingCount={maxRating}
        imageSize={getWidth(size)}
        startingValue={currentRating}
        readonly={readonly}
        style={styles.rating}
        onFinishRating={handleRatingChange}
        fractions={6}
        jumpValue={1 / 6}
        showRating={false}
      />
    </View>
  );
};

export default RatingStars;

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
  },
  rating: {
    paddingVertical: 0,
  },
});
