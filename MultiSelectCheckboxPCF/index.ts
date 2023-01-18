import MultiSelectApp, { IMultiSelectProps } from "./components/MultiSelectApp";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

const DEFAULT_OPTIONS: ComponentFramework.PropertyHelper.OptionMetadata[] = [
  {
    Color: "#008000",
    Label: "Oranges",
    Value: 1001,
  },
  {
    Color: "#800080",
    Label: "Apples",
    Value: 1002,
  },
  {
    Color: "#FF0000",
    Label: "Pears",
    Value: 1003,
  },
  {
    Color: "#000",
    Label: "Bananas",
    Value: 1004,
  },
  {
    Color: "#FF69B4",
    Label: "Blueberries",
    Value: 1005,
  },
];

const DEFAULT_SELECTED_VALUES: number[] = [1004, 1002];

export class MultiSelectCheckboxPCF
  implements ComponentFramework.ReactControl<IInputs, IOutputs>
{
  private theComponent: ComponentFramework.ReactControl<IInputs, IOutputs>;
  private _notifyOutputChanged: () => void;
  private _selectedValues: number[];

  private _props: IMultiSelectProps = {
    multiSelectOptions: [],
    selectedValues: [],
    disabled: false,
    onSelectionChange: this.notifyChange.bind(this),
  };

  constructor() {}

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
    state: ComponentFramework.Dictionary
  ): void {
    this._notifyOutputChanged = notifyOutputChanged;
  }

  public updateView(
    context: ComponentFramework.Context<IInputs>
  ): React.ReactElement {
    this._props.multiSelectOptions =
      context.parameters.multiSelectOptionSet.attributes?.Options ??
      DEFAULT_OPTIONS;

    this._props.selectedValues =
      context.parameters.multiSelectOptionSet.raw ?? DEFAULT_SELECTED_VALUES;

    // this._props.selectedValues = DEFAULT_SELECTED_VALUES;

    this._props.disabled = context.mode.isControlDisabled ?? false;

    return React.createElement(MultiSelectApp, this._props);
  }

  private notifyChange(newSelection: number[]) {
    console.log(`New selection: ${newSelection}`);
    this._selectedValues = newSelection;
    this._notifyOutputChanged();
  }

  public getOutputs(): IOutputs {
    return {
      multiSelectOptionSet: this._selectedValues,
    };
  }

  public destroy(): void {
    // Add code to cleanup control if necessary
  }
}
