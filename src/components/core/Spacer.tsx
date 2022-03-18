import { View } from "react-native";

type Props = {
  width?: number | string;
  height?: number | string;
};

const Spacer = ({ width, height }: Props) => {
  return <View style={{ width, height }} />;
};

export default Spacer;
