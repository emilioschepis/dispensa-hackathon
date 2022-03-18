import React, { useMemo } from "react";

import Barcode from "../../../assets/icons/barcode.svg";
import Cancel from "../../../assets/icons/cancel.svg";
import ChevronRight from "../../../assets/icons/chevron-right.svg";
import DoubleRight from "../../../assets/icons/double-right.svg";
import Edit from "../../../assets/icons/edit.svg";
import Minus from "../../../assets/icons/minus.svg";
import Plus from "../../../assets/icons/plus.svg";
import Search from "../../../assets/icons/search.svg";
import Warning from "../../../assets/icons/warning.svg";
import DS from "../../style/DesignSystem";

const IconMap = {
  BARCODE: Barcode,
  CANCEL: Cancel,
  CHEVRON_RIGHT: ChevronRight,
  DOUBLE_RIGHT: DoubleRight,
  EDIT: Edit,
  MINUS: Minus,
  PLUS: Plus,
  SEARCH: Search,
  WARNING: Warning,
};

export type Props = {
  name: keyof typeof IconMap;
  color?: string;
  width?: number;
  height?: number;
};

const Icon = ({ name, color = DS.Colors.PRIMARY, width = 24, height = 24 }: Props) => {
  const Component = useMemo(() => IconMap[name], [name]);

  return <Component color={color} width={width} height={height} />;
};

export default Icon;
