interface AlertClasses {
  /**
   * Overrides the styles of root element of the Alert component.
   * This is the main container of the alert.
   */
  root?: string

  /**
   * Overrides the styles the content container of the Alert.
   * This wraps the main content of the alert message.
   */
  content?: string

  /**
   * Overrides the styles of the container of action elements (buttons, links, etc.).
   * This is positioned at the end of the alert.
   */
  actionContainer?: string

  /**
   * Overrides the styles of the close icon button.
   * This styles the button that appears when the alert is dismissible.
   */
  closeIconButton?: string

  /**
   * Overrides the styles of the close icon itself.
   * This styles the X icon within the close button.
   */
  closeIcon?: string

  /**
   * Overrides the styles of the alert icon container.
   * This styles the container of the icon that appears at the start of the alert.
   */
  icon?: string
}

export type { AlertClasses }
