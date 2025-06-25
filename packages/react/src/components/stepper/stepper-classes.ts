/**
 * Styles that can be applied to the Stepper component.
 */
interface StepperClasses {
  /**
   * Styles applied to the root element of the Stepper.
   * Use this to customize the container that wraps all steps.
   */
  root?: string
}

/**
 * Styles that can be applied to the Step component.
 */
interface StepClasses {
  /**
   * Styles applied to the root element of the Step.
   * Use this to customize the container of each individual step.
   */
  root?: string
}

/**
 * Styles that can be applied to the StepLabel component.
 */
interface StepLabelClasses {
  /**
   * Styles applied to the root element of the StepLabel.
   * Use this to customize the container that wraps the icon and label.
   */
  root?: string

  /**
   * Styles applied to the label text element.
   * Use this to customize the appearance of the step label text.
   */
  label?: string

  /**
   * Styles applied when the step is active.
   * Use this to customize the appearance of the active step.
   */
  active?: string

  /**
   * Styles applied when the step is completed.
   * Use this to customize the appearance of completed steps.
   */
  completed?: string

  /**
   * Styles applied to the icon container.
   * Use this to customize the container that holds the step number or check icon.
   */
  iconContainer?: string
}

/**
 * Styles that can be applied to the StepConnector component.
 */
interface StepConnectorClasses {
  /**
   * Styles applied to the root element of the StepConnector.
   * Use this to customize the base appearance of the connector line.
   */
  root?: string

  /**
   * Styles applied when the connector is part of an active step.
   * Use this to customize the appearance of the connector leading to the active step.
   */
  active?: string

  /**
   * Styles applied when the connector is part of a completed step.
   * Use this to customize the appearance of the connector leading to completed steps.
   */
  completed?: string
}

export {
  type StepperClasses,
  type StepClasses,
  type StepLabelClasses,
  type StepConnectorClasses,
}
