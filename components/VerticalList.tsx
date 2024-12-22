import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { Item } from "@/data/mockData";
import Animated, {
  SharedValue,
  interpolate,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { opacity } from "react-native-reanimated/lib/typescript/Colors";

type VerticalListProp = {
  data: Item[];
};
type AnimatedCardProps = {
  item: Item;
  index: number;
  scrollY: SharedValue<number>;
};

function AnimatedCard({ item, index, scrollY }: AnimatedCardProps) {
  const AnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [index - 1, index, index + 1],
        [0.3, 1, 0.3]
      ),
      transform: [
        {
          scale: interpolate(
            scrollY.value,
            [index - 1, index, index + 1],
            [0.92, 1, 0.92]
          ),
        },
      ],
    };
  });
  return (
    <Animated.View
      style={[
        {
          flex: 1,
          backgroundColor: "#fff",
          height: _itemSize,
          padding: _spacing * 2.5,
          borderRadius: 12,
          gap: _spacing * 2,
        },
        AnimatedStyle,
      ]}
    >
      <Image
        source={{ uri: item.image }}
        style={[StyleSheet.absoluteFillObject, { borderRadius: 12 }]}
        blurRadius={50}
      ></Image>
      <Image
        source={{ uri: item.image }}
        style={{ flex: 1, height: _itemSize * 0.4, borderRadius: 12 }}
      ></Image>
      <View>
        <Text style={{ fontSize: 24, fontWeight: "700", color: "#ddd" }}>
          {item.title}
        </Text>
        <Text numberOfLines={3} style={{ color: "#ddd" }}>
          {item.description}
        </Text>
      </View>
      <View
        style={{ flexDirection: "row", gap: _spacing, alignItems: "center" }}
      >
        <Image
          source={{ uri: item.author.avatar }}
          style={{ width: 24, aspectRatio: 1, borderRadius: 12 }}
        ></Image>
        <Text style={{ fontSize: 12, color: "#ddd" }}>{item.author.name}</Text>
      </View>
    </Animated.View>
  );
}
const { height } = Dimensions.get("screen");
const _spacing = 4;
const _itemSize = height * 0.72;
const _itemFullSize = _itemSize + _spacing * 2; //this is to put in snap to interval so that the list moves by a specific amount this the height of the card plus the gap between the cards
const VerticalList = ({ data }: VerticalListProp) => {
  const scrollY = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler((e) => {
    scrollY.value = e.contentOffset.y / _itemFullSize; //here we have devided it to get the index at which we currently are
  });

  return (
    // <View  if we apply style like this the whole flatlist will move down and my desired effect will to show card in the middle will not come that is why we put this style in the content container style
    //   style={{
    //     paddingHorizontal: _spacing * 3,
    //     paddingVertical: (height - _itemFullSize) / 2,
    //     gap: _spacing * 2,
    //   }}
    // >
    <Animated.FlatList
      data={data}
      contentContainerStyle={{
        paddingHorizontal: _spacing * 3,
        paddingVertical: (height - _itemFullSize) / 2,
        gap: _spacing * 2,
      }}
      renderItem={({ item, index }) => (
        <AnimatedCard
          item={item}
          scrollY={scrollY}
          index={index}
        ></AnimatedCard>
      )}
      snapToInterval={_itemFullSize}
      decelerationRate={"fast"} //this is to make the scrolling fast
      onScroll={onScroll}
      scrollEventThrottle={16} //here value is calculated like 1000/60 meaining this value is changed 60 times a min to make it 30 times we can write 32
    ></Animated.FlatList>
  );
};

export default VerticalList;

const styles = StyleSheet.create({});
