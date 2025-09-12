import { useMemo, useRef } from 'react';
import { GestureResponderEvent, PanResponder, PanResponderInstance } from 'react-native';

export type SwipeDirection = 'left' | 'right' | 'up' | 'down';

export interface UseCardGesturesOptions {
  onTap?: (event: GestureResponderEvent) => void;
  onDoubleTap?: (event: GestureResponderEvent) => void;
  onSwipe?: (direction: SwipeDirection, event: GestureResponderEvent) => void;
  onSwipeLeft?: (event: GestureResponderEvent) => void;
  onSwipeRight?: (event: GestureResponderEvent) => void;
  onSwipeUp?: (event: GestureResponderEvent) => void;
  onSwipeDown?: (event: GestureResponderEvent) => void;
  tapMovementTolerancePx?: number; // Max movement to still be considered a tap
  doubleTapDelayMs?: number; // Max delay between taps to count as double-tap
  swipeThresholdPx?: number; // Min distance to be considered a swipe
}

export interface UseCardGesturesResult {
  gestureHandlers: PanResponderInstance['panHandlers'];
}

/**
 * Detects tap, double-tap and swipe gestures. Spread `gestureHandlers` onto the touchable View.
 */
export const useCardGestures = (options: UseCardGesturesOptions = {}): UseCardGesturesResult => {
  const {
    onTap,
    onDoubleTap,
    onSwipe,
    onSwipeLeft,
    onSwipeRight,
    onSwipeUp,
    onSwipeDown,
    tapMovementTolerancePx = 10,
    doubleTapDelayMs = 300,
    swipeThresholdPx = 40,
  } = options;

  const lastTapTimeRef = useRef<number>(0);
  const startXRef = useRef<number>(0);
  const startYRef = useRef<number>(0);

  const panResponder = useMemo<PanResponderInstance>(() =>
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderGrant: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        startXRef.current = pageX;
        startYRef.current = pageY;
      },
      onPanResponderRelease: (evt) => {
        const { pageX, pageY } = evt.nativeEvent;
        const dx = pageX - startXRef.current;
        const dy = pageY - startYRef.current;
        const absDx = Math.abs(dx);
        const absDy = Math.abs(dy);

        // Swipe detection
        if (absDx > swipeThresholdPx || absDy > swipeThresholdPx) {
          let direction: SwipeDirection;
          if (absDx > absDy) {
            direction = dx > 0 ? 'right' : 'left';
          } else {
            direction = dy > 0 ? 'down' : 'up';
          }

          onSwipe?.(direction, evt);
          if (direction === 'left') onSwipeLeft?.(evt);
          if (direction === 'right') onSwipeRight?.(evt);
          if (direction === 'up') onSwipeUp?.(evt);
          if (direction === 'down') onSwipeDown?.(evt);
          return;
        }

        // Tap / Double-tap detection
        if (absDx <= tapMovementTolerancePx && absDy <= tapMovementTolerancePx) {
          const now = Date.now();
          if (now - lastTapTimeRef.current <= doubleTapDelayMs) {
            lastTapTimeRef.current = 0;
            onDoubleTap?.(evt);
          } else {
            lastTapTimeRef.current = now;
            onTap?.(evt);
          }
        }
      },
    }),
  [onTap, onDoubleTap, onSwipe, onSwipeLeft, onSwipeRight, onSwipeUp, onSwipeDown, tapMovementTolerancePx, doubleTapDelayMs, swipeThresholdPx]);

  return { gestureHandlers: panResponder.panHandlers };
};


