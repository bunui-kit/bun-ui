/**
 * Classes for customizing the Select component's appearance.
 */
interface SelectClasses {
  /**
   * Extends or overrides the styles of the wrapper element
   * wrapping Select and label when label prop is defined.
   */
  container?: string

  /**
   * Extends or overrides the styles of the label element.
   */
  label?: string

  /**
   * Extends or overrides the styles of the select trigger button.
   */
  trigger?: string

  /**
   * Extends or overrides the styles of the selected value text.
   */
  value?: string

  /**
   * Extends or overrides the styles of the dropdown content container.
   */
  content?: string

  /**
   * Extends or overrides the styles of the scrollable viewport
   * that contains the select items.
   */
  viewport?: string
}

/**
 * Classes for customizing the SelectItem component's appearance.
 */
interface SelectItemClasses {
  /**
   * Styles applied to the item container.
   */
  root?: string

  /**
   * Styles applied to the item text.
   */
  text?: string

  /**
   * styles applied to the checkmark indicator container.
   */
  indicator?: string

  /**
   * styles applied to the checkmark icon when item is selected.
   */
  icon?: string
}

export type { SelectClasses, SelectItemClasses }
