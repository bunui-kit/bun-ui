export interface CommandMenuDialogClasses {
  /**
   * Styles applied to the dialog title.
   * Controls the styling of the title displayed at the top of the command menu dialog.
   */
  title?: string

  /**
   * Styles applied to the dialog description.
   * Controls the styling of the description text displayed below the title.
   */
  description?: string

  /**
   * Styles applied to the dialog content container.
   * Controls the styling of the main content area that wraps the command menu.
   */
  content?: string

  /**
   * Styles applied to the command menu component.
   * Controls the styling of the underlying CommandMenu component within the dialog.
   */
  commandMenu?: string
}
