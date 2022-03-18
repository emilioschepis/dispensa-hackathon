import { Pressable as _Pressable, PressableProps } from "react-native";

type Props = PressableProps;

const Pressable = ({ children, style, ...rest }: Props) => {
  return (
    <_Pressable
      {...rest}
      style={({ pressed }) => [
        typeof style === "function" ? style({ pressed }) : style,
        { opacity: pressed ? 0.6 : 1.0 },
      ]}
    >
      {children}
    </_Pressable>
  );
};

export default Pressable;
