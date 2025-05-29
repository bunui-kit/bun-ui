interface StepperClasses {
  /**
   * Styles applied to the root element.
   */
  root: string
}

interface StepClasses {
  /**
   * Styles applied to the root element.
   */
  root: string
}

interface StepLabelClasses {
  /**
   * Styles applied to the root element.
   */
  root: string
  /**
   * Styles applied to the label element.
   */
  label: string

  active: string
  completed: string
  iconContainer: string
}

interface StepConnectorClasses {
  root: string
  active: string
  completed: string
}

export {
  type StepperClasses,
  type StepClasses,
  type StepLabelClasses,
  type StepConnectorClasses,
}
