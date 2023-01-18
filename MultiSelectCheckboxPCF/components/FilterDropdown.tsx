import {
  Dropdown,
  FontIcon,
  IDropdownProps,
  IDropdownStyles,
  ISelectableOption,
  Stack,
  mergeStyleSets,
  mergeStyles,
} from "@fluentui/react";
import * as React from "react";
import { FilterDropdownProps } from "./MultiSelectApp";

const dropdownStyles: Partial<IDropdownStyles> = {
  dropdown: { width: 150 },
  dropdownItemSelected: {},
};

const iconClass = mergeStyles({
  fontSize: 18,
  height: 18,
  width: 18,
});

const classNames = mergeStyleSets({
  deepSkyBlue: [{ color: "#1160b7" }, iconClass],
});

const FilterDropdown = ({
  options,
  setFilter,
  disabled,
}: FilterDropdownProps) => {
  const onRenderPlaceholder = (props?: IDropdownProps): JSX.Element => {
    return (
      <Stack
        horizontal
        verticalAlign="center"
        horizontalAlign="space-around"
      >
        <Stack.Item>
          <FontIcon
            iconName="CheckListText"
            className={classNames.deepSkyBlue}
          />
        </Stack.Item>
        <Stack.Item>
          <span>Show All</span>
        </Stack.Item>
      </Stack>
    );
  };

  const onRenderOption = (option?: ISelectableOption): JSX.Element => {
    // console.log("curr option: ", option?.data);
    return (
      <Stack
        horizontal
        verticalAlign="center"
        horizontalAlign="space-between"
        style={{ width: "300px" }}
      >
        <Stack.Item align="center">
          <FontIcon
            iconName={option?.data.iconName}
            className={classNames.deepSkyBlue}
          />
        </Stack.Item>
        <Stack.Item align="center">
          <span>{option?.text}</span>
        </Stack.Item>
      </Stack>
    );
  };

  const onChange = (
    e: React.FormEvent<HTMLDivElement>,
    item?: ISelectableOption
  ): void => {
    // console.log("item: ", item?.key);
    // const itemsCopy = [...items];
    // itemsCopy.reverse();
    // setItems(itemsCopy);
    if (item) {
      setFilter(item?.key as string);
    }
  };

  return (
    <Dropdown
      placeholder="Select All"
      onRenderPlaceholder={onRenderPlaceholder}
      options={options}
      onRenderOption={onRenderOption}
      styles={dropdownStyles}
      onChange={onChange}
      disabled={disabled}
    />
  );
};

export default FilterDropdown;
