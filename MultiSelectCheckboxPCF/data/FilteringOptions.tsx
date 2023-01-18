import { IDropdownOption } from "@fluentui/react";
import * as React from "react";

export const FilteringOptions: IDropdownOption[] = [
  {
    key: "checked",
    text: "Checked",
    data: {
      iconName: "CheckboxCompositeReversed",
    },
  },
  {
    key: "unchecked",
    text: "Unchecked",
    data: {
      iconName: "Checkbox",
    },
  },
  {
    key: "all",
    text: "All",
    data: {
      iconName: "CheckListText",
    },
  },
];
