import { StyleSheet, Text, View } from "react-native";
import React from "react";
import VerticalList from "@/components/VerticalList";

import data from "@/data/mockData";

const index = () => {
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <VerticalList data={data}></VerticalList>
    </View>
  );
};

export default index;

const styles = StyleSheet.create({});
