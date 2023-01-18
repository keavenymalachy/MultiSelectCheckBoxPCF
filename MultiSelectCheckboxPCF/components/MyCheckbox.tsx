import { Checkbox } from "@fluentui/react";
import * as React from "react";
import { MyCheckboxProps } from "./MultiSelectApp";

const MyCheckbox = ({
  option,
  selectedItems,
  setSelectedItems,
  disabled,
}: MyCheckboxProps) => {
  const onRenderLabel = (label: string, color: string): JSX.Element => {
    return <div className="label">{label}</div>;
  };

  const onChange = (
    ev?: React.FormEvent<HTMLElement | HTMLInputElement> | undefined,
    checked?: boolean | undefined,
    key?: number
  ) => {
    if (key) {
      setSelectedItems(
        selectedItems.includes(key)
          ? selectedItems.filter((item) => item !== key)
          : [...selectedItems, key]
      );
    }
  };

  return (
    <Checkbox
      checked={selectedItems.includes(option.Value)}
      label={option.Label}
      onRenderLabel={() => onRenderLabel(option.Label, option.Color)}
      onChange={(e) => onChange(e, true, option.Value)}
      styles={{ checkbox: {} }}
      disabled={disabled}
    />
  );
};

export default MyCheckbox;
