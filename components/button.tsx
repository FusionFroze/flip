import { Pressable, Text, View } from "react-native";

type Props = {
  label: string;
  onPress: () => void;
  type?: "primary";
  disabled?: boolean;
};

export default function Button({ label, onPress, type, disabled }: Props) {
  const buttonClass =
    type === "primary"
      ? "bg-[#D4A017]"
      : "bg-[#21262D] border border-[#30363D]";

  const textClass =
    type === "primary"
      ? disabled
        ? "text-[#4A3000] text-[18px] font-bold opacity-40"
        : "text-[#4A3000] text-[18px] font-bold"
      : disabled
        ? "text-[#30363D]"
        : "text-[#F5C842]";

  return (
    <View className="w-52 h-14">
      <Pressable
        onPress={onPress}
        className={`${buttonClass} w-full h-full flex justify-center items-center rounded-xl disabled:bg-`}
        disabled={disabled}
      >
        <Text className={textClass}>{label}</Text>
      </Pressable>
    </View>
  );
}
