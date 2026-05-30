import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import LottieView from "lottie-react-native";
import { useEffect, useRef, useState } from "react";
import { Text, View } from "react-native";

import Button from "@/components/button";
import CommentModal from "@/components/CommentModal";

export const STORAGE_KEY = "history";

export default function Index() {
  const animationRef = useRef<LottieView>(null);
  const [coinFlipped, setCoinFlipped] = useState<boolean>(false);
  const [flipResult, setFlipResult] = useState<"Heads" | "Tails" | "">("");
  const [showModal, setShowModal] = useState<boolean>(false);
  const [comment, setComment] = useState<string>("");

  useEffect(() => {
    animationRef.current?.play(10, 10);
  }, []);

  const animate = async () => {
    setCoinFlipped(true);

    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);

    const result = Math.random() < 0.5 ? "heads" : "tails";

    animationRef.current?.play();

    await storeComment(result);

    if (result === "heads") {
      setTimeout(() => {
        animationRef.current?.play(33, 33);

        setFlipResult("Heads");
      }, 2000);
    } else {
      setTimeout(() => {
        animationRef.current?.play(10, 10);

        setFlipResult("Tails");
      }, 2000);
    }
  };

  const reset = () => {
    setCoinFlipped(false);
    setFlipResult("");
    setComment("");
  };

  const closeModal = () => {
    setShowModal(false);
    setComment("");
  };

  const handleSubmitComment = (text: string) => {
    setComment(text);
    setShowModal(false);
  };

  const storeComment = async (result: string) => {
    const newEntry = {
      id: Date.now(),
      timestamp: Date.now(),
      result: result,
      comment: comment,
    };
    try {
      const existing = await AsyncStorage.getItem(STORAGE_KEY);

      const history = existing ? JSON.parse(existing) : [];
      history.unshift(newEntry);

      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(history));
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <View className="flex-1 justify-center items-center">
      <LottieView
        ref={animationRef}
        source={require("@/assets/animations/Coin.json")}
        style={{
          width: "120%",
          height: "120%",
          aspectRatio: 1,
          position: "absolute",
          bottom: 45,
        }}
        speed={3}
      />

      <View className={`flex justify-between ${comment ? "pt-7" : "p-0"}`}>
        {comment && <View />}
        <View
          className={`flex justify-center items-center ${comment && "gap-1"}`}
        >
          <Text className="text-primarytext font-bold text-xl">
            {flipResult}
          </Text>

          {comment && (
            <Text className="text-secondarytext italic">{comment}</Text>
          )}
        </View>
      </View>

      <CommentModal
        isVisible={showModal}
        closeModal={closeModal}
        onSubmitComment={handleSubmitComment}
      />

      <View className="absolute bottom-5">
        <View className="flex-row justify-between items-center w-full px-3">
          <Button
            label={coinFlipped ? "Reset" : "Flip"}
            onPress={coinFlipped ? reset : animate}
            type="primary"
          />
          <Button
            label="Add Comment"
            onPress={() => setShowModal(true)}
            disabled={coinFlipped}
          />
        </View>
      </View>
    </View>
  );
}
