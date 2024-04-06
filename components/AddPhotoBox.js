import * as React from "react";
import Svg, { Path, Rect, Circle } from "react-native-svg";

const AddPhotoBox = (props) => (
  <Svg
    width="132"
    height="120"
    viewBox="0 0 132 120"
    fill="none" xmlns="http://www.w3.org/2000/svg"
    {...props}
    >
        <Rect width="120" height="120" rx="16" fill="#F6F6F6" />
    <Circle cx="119.5" cy="93.5" r="12" fill="white" stroke="#FF6C00" />
    <Path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M120 87H119V93H113V94H119V100H120V94H126V93H120V87Z"
        fill="#FF6C00"
    />
  </Svg>
);
export default AddPhotoBox;
