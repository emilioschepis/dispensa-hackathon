import { PressableProps } from "react-native";

import DS from "../../style/DesignSystem";
import Icon, { Props as IconProps } from "./Icon";
import Pressable from "./Pressable";

type Props = IconProps & PressableProps;

const PressableIcon = ({ name, color, width, disabled, height, hitSlop = 10, ...rest }: Props) => {
  return (
    <Pressable disabled={disabled} hitSlop={hitSlop} {...rest}>
      <Icon name={name} color={disabled ? DS.Colors.DISABLED : color} width={width} height={height} />
    </Pressable>
  );
};

export default PressableIcon;
