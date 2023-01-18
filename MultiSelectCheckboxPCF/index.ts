import MultiSelectApp, { IMultiSelectProps } from "./components/MultiSelectApp";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import * as React from "react";

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
      context.parameters.multiSelectOptionSet.attributes?.Options ?? [];

    this._props.selectedValues =
      context.parameters.multiSelectOptionSet.raw ?? [];

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
