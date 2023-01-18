import {
  Checkbox,
  Dropdown,
  FontIcon,
  IDropdownOption,
  IDropdownProps,
  IDropdownStyles,
  ISelectableOption,
  IStackStyles,
  IStackTokens,
  Stack,
  mergeStyleSets,
  mergeStyles,
} from "@fluentui/react";
import * as React from "react";
import { useEffect, useState } from "react";
import MyCheckbox from "./MyCheckbox";
import { FilteringOptions } from "../data/FilteringOptions";
import FilterDropdown from "./FilterDropdown";

export interface IMultiSelectProps {
  multiSelectOptions: ComponentFramework.PropertyHelper.OptionMetadata[];
  selectedValues: number[];
  disabled: boolean;
  onSelectionChange: (options: number[]) => void;
}

export interface MyCheckboxProps {
  option: ComponentFramework.PropertyHelper.OptionMetadata;
  selectedItems: number[];
  setSelectedItems: React.Dispatch<React.SetStateAction<number[]>>;
  disabled: boolean;
}

export interface FilterDropdownProps {
  options: IDropdownOption<any>[];
  setFilter: React.Dispatch<React.SetStateAction<string>>;
  disabled: boolean;
}

const stackStyles: IStackStyles = {
  root: {
    width: "500px",
  },
};

const tokenStyles: IStackTokens = { childrenGap: 5 };

const MultiSelectApp = ({
  multiSelectOptions,
  selectedValues,
  disabled,
  onSelectionChange,
}: IMultiSelectProps) => {
  const [items, setItems] = useState<
    ComponentFramework.PropertyHelper.OptionMetadata[]
  >([]);
  const [selectedItems, setSelectedItems] = useState<number[]>([]);
  const [filter, setFilter] = useState<string>("all");
  useEffect(() => {
    console.log("optionset data: ", multiSelectOptions);
    console.log("selectedValues: ", selectedValues);

    multiSelectOptions.sort((a, b) => {
      if (a.Label < b.Label) {
        return -1;
      } else if (a.Label > b.Label) {
        return 1;
      } else {
        return 0;
      }
    });

    setItems(multiSelectOptions);
    setSelectedItems(selectedValues);
  }, []);

  useEffect(() => {
    onSelectionChange(selectedItems);
  }, [selectedItems]);

  return (
    <Stack
      styles={stackStyles}
      tokens={tokenStyles}
    >
      <Stack.Item align="end">
        <FilterDropdown
          options={FilteringOptions}
          setFilter={setFilter}
          disabled={disabled}
        />
      </Stack.Item>

      {items
        .filter((item) => {
          if (filter === "all") {
            return item;
          } else if (filter === "checked") {
            return selectedItems.includes(item.Value);
          } else if (filter === "unchecked") {
            return !selectedItems.includes(item.Value);
          }
        })
        .map((option) => (
          <Stack.Item
            key={option.Value}
            style={{
              border: "2px solid",
              padding: "2px",
              borderRadius: "4px",
              borderColor: `${option.Color}`,
            }}
          >
            <MyCheckbox
              option={option}
              selectedItems={selectedItems}
              setSelectedItems={setSelectedItems}
              disabled={disabled}
            />
          </Stack.Item>
        ))}
    </Stack>
  );
};

export default MultiSelectApp;
