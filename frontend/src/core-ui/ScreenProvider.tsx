import React, { useState, useEffect, ReactNode } from "react";
import { View, StyleSheet, Text, Dimensions, ScaledSize, Image } from "react-native";
import SVG from "../../assets/svg";

const window = Dimensions.get("window");
const screen = Dimensions.get("screen");

type Props = { 
  children: ReactNode
}
export default function ScreenProvider (props: Props) {
  const [dimensions, setDimensions] = useState({ window, screen });

  const onChange = ({ window, screen }: {window: ScaledSize, screen: ScaledSize}) => {
    setDimensions({ window, screen });
  };

  useEffect(() => {
    Dimensions.addEventListener("change", onChange);
    return () => {
      Dimensions.removeEventListener("change", onChange);
    };
  });

  let NotSupportedImage = () =>
  React.createElement(SVG.notSupportedSVG, { width: 350, height: 350 });

  const NotSupportedContent = () => (
    <View style={{flex: 1, justifyContent: "center", alignItems: "center"}}>
      <View style={{marginBottom: 20}}>
        <NotSupportedImage />
      </View>
      <Text style={{fontSize: 16, marginBottom: 4}}>Sorry, this screen size is unsupported :(</Text>
      <Text style={{fontSize: 16}}>Please use desktop screen</Text>
    </View>
  )

  return (
    <>
      { dimensions.window.width >= 975 ? props.children : <NotSupportedContent />}
    </>
  );
}
