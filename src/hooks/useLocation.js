import React, { useState, useEffect } from "react";
import {
  Accuracy,
  watchPositionAsync,
  requestForegroundPermissionsAsync
} from "expo-location";

export default (shouldTrack, callback) => {
  const [err, setError] = useState(null);

  useEffect(() => {
    let subscriber;

    const startWatching = async () => {
      try {
        await requestForegroundPermissionsAsync();
        subscriber = await watchPositionAsync(
          {
            accuracy: Accuracy.BestForNavigation,
            timeInterval: 1000,
            distanceInterval: 10
          },
          callback
        );
      } catch (e) {
        setError(e);
      }
    };

    if (shouldTrack) {
      startWatching();
    } else {
      if (subscriber) {
        //stop watching
        subscriber.remove();
      }
      subscriber = null;
    }
    return () => {
      if (subscriber) {
        subscriber.remove();
      }
    };
  }, [shouldTrack, callback]);

  return [err];
};
