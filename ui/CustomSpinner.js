import { useEffect, useState } from "react";
import { ActivityIndicator } from "react-native";

export default function CustomSpinner({ size, color, show }) {
  const [showIndicator, setShowIndicator] = useState(false);

  useEffect(() => {
    setShowIndicator(show);
  }, [show]);

  return <ActivityIndicator size={size} color={color} />;
}
