import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, Text, View } from "react-native";
import { STORAGE_KEY } from ".";

type FlipEntry = {
  id: number;
  result: "heads" | "tails";
  timestamp: number;
  comment: string;
};

const formatTimestamp = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  const yesterday = new Date();
  yesterday.setDate(now.getDate() - 1);
  const isYesterday = date.toDateString() === yesterday.toDateString();

  const time = date.toLocaleTimeString("en-IN", {
    hour: "2-digit",
    minute: "2-digit",
  });

  if (isToday) return `Today, ${time}`;
  if (isYesterday) return `Yesterday, ${time}`;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const StatsCard = ({ label, value }: { label: string; value: number }) => (
  <View
    style={{
      flex: 1,
      backgroundColor: "#161B22",
      borderColor: "#30363D",
      borderWidth: 0.5,
    }}
    className="rounded-xl p-3"
  >
    <Text style={{ color: "#8B929E" }} className="text-xs mb-1">
      {label}
    </Text>

    <Text style={{ color: "#F5C842" }} className="text-lg font-medium">
      {value}
    </Text>
  </View>
);

const FlipCard = ({ item }: { item: FlipEntry }) => {
  const isHeads = item.result === "heads";

  return (
    <View
      style={{
        backgroundColor: "#161B22",
        borderColor: "#30363D",
        borderWidth: 0.5,
      }}
      className="rounded-xl p-4 mb-2.5"
    >
      <View className="flex-row justify-between items-center mb-2">
        <View className="flex-row items-center gap-2">
          <View
            style={{ backgroundColor: isHeads ? "#F5C842" : "#78501A" }}
            className="w-1.5 h-1.5 rounded-full"
          />
          <Text
            style={{ color: isHeads ? "#F5C842" : "#D4A017" }}
            className="text-base font-medium tracking-wider"
          >
            {item.result.toUpperCase()}
          </Text>
        </View>
        <Text style={{ color: "#8B929E" }} className="text-xs">
          {formatTimestamp(item.timestamp)}
        </Text>
      </View>

      <View
        style={{ borderTopColor: "#21262D", borderTopWidth: 0.5 }}
        className="pt-2"
      >
        <Text
          style={{ color: item.comment ? "#8B929E" : "#30363D" }}
          className="text-sm italic"
        >
          {item.comment ? `"${item.comment}"` : "No comment added"}
        </Text>
      </View>
    </View>
  );
};

export default function FlipHistory() {
  const [history, setHistory] = useState<FlipEntry[]>([]);

  useEffect(() => {
    const loadHistory = async () => {
      try {
        const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
        if (jsonValue != null) {
          setHistory(JSON.parse(jsonValue));
        }
      } catch (e) {
        console.error(e);
      }
    };

    loadHistory();
  }, []);

  const clearHistory = () => {
    Alert.alert(
      "Clear History",
      "This will permanently delete all your flips and comments. Are you sure?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Clear",
          style: "destructive",
          onPress: async () => {
            await AsyncStorage.removeItem(STORAGE_KEY);
            setHistory([]);
          },
        },
      ],
    );
  };

  const heads = history.filter((h) => h.result === "heads").length;
  const tails = history.filter((h) => h.result === "tails").length;

  return (
    <View style={{ backgroundColor: "#0D1117" }} className="flex-1 px-4 pt-4">
      <View className="flex-row-reverse items-center mb-5">
        <Pressable
          onPress={clearHistory}
          style={{ borderColor: "#30363D", borderWidth: 1 }}
          className="rounded-lg px-4 py-2"
        >
          <Text className="text-sm text-secondarytext">Clear all</Text>
        </Pressable>
      </View>

      <View className="flex-row gap-2.5 mb-5">
        <StatsCard label="Total flips" value={history.length} />
        <StatsCard label="Heads" value={heads} />
        <StatsCard label="Tails" value={tails} />
      </View>

      <FlatList
        data={history}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <FlipCard item={item} />}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View className="flex-1 justify-center items-center mt-20">
            <Text style={{ color: "#30363D" }} className="text-base">
              No flips yet
            </Text>
          </View>
        }
      />
    </View>
  );
}
