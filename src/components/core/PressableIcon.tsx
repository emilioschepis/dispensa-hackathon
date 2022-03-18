import { PressableProps } from "react-native";

import Icon, { Props as IconProps } from "./Icon";
import Pressable from "./Pressable";

type Props = IconProps & PressableProps;

const PressableIcon = ({ name, color, width, height, hitSlop = 10, ...rest }: Props) => {
  return (
    <Pressable hitSlop={hitSlop} {...rest}>
      <Icon name={name} color={color} width={width} height={height} />
    </Pressable>
  );
};

export default PressableIcon;
