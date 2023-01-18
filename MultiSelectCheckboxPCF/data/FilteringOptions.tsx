import { IDropdownOption } from "@fluentui/react";
import * as React from "react";

export const FilteringOptions: IDropdownOption[] = [
  {
    key: "checked",
    text: "Show Checked",
    data: {
      iconName: "CheckboxCompositeReversed",
    },
  },
  {
    key: "unchecked",
    text: "Show Unchecked",
    data: {
      iconName: "Checkbox",
    },
  },
  {
    key: "all",
    text: "Show All",
    data: {
      iconName: "CheckListText",
    },
  },
];
