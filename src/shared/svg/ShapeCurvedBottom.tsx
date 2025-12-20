import * as React from "react";
import Svg, { Path } from "react-native-svg";

export type ShapeCurvedBottomProps = {
  fill?: string;
};
const ShapeCurvedBottom = ({ fill = '' }: ShapeCurvedBottomProps) => (
  <Svg
    width="100%"
    height="100%"
    viewBox="0 0 200 200"
    preserveAspectRatio="none"
  >
    <Path
      d="M0,0 L200,0 L200,150 Q150,170 100,170 Q50,170 0,150 Z"
      fill={fill}
    />
  </Svg>
);

export default ShapeCurvedBottom;