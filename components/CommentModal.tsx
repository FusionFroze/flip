import { useState } from "react";
import { Modal, Pressable, Text, TextInput, View } from "react-native";

type Props = {
  isVisible: boolean;
  closeModal: () => void;
  onSubmitComment: (comment: string) => void;
};

export default function CommentModal({
  isVisible,
  closeModal,
  onSubmitComment,
}: Props) {
  const [comment, setComment] = useState<string>("");

  const addComment = () => {
    onSubmitComment(comment);
  };

  return (
    <View>
      <Modal animationType="slide" transparent={true} visible={isVisible}>
        <View className="absolute left-2 right-2 top-60 h-fit  bg-[#161B22] border border-[#30363D] rounded-2xl p-5 flex gap-10">
          <TextInput
            className="bg-[#0D1117] text-primarytext border border-[#30363D] rounded-lg p-2 h-14"
            placeholder="Add a comment for this flip..."
            placeholderTextColor="#8B929E"
            value={comment}
            onChangeText={(text) => setComment(text)}
            autoFocus={true}
            maxLength={150}
          />
          <View className="flex-row justify-between items-center gap-5">
            <Pressable
              className="bg-[#F5C842] w-44 h-10 flex justify-center items-center rounded-lg"
              onPress={addComment}
            >
              <Text>Add</Text>
            </Pressable>
            <Pressable
              className="bg-transparent w-44 h-10 border border-[#30363D] flex justify-center items-center rounded-lg"
              onPress={closeModal}
            >
              <Text className="text-[#8B929E]">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
