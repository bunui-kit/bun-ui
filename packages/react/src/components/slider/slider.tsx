import React from "react"
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cva, type VariantProps } from "class-variance-authority"

import { cx } from "../../lib"

const sliderVariants = cva(
  "relative flex w-full touch-none items-center select-none",
  {
    variants: {
      color: {
        neutral:
          "[&_[data-track]]:bg-foreground/20 [&_[data-range]]:bg-foreground [&_[data-thumb]]:bg-foreground [&_[data-thumb]]:border-foreground/50 [&_[data-thumb]]:ring-foreground/50",
        primary:
          "[&_[data-track]]:bg-primary/20 [&_[data-range]]:bg-primary [&_[data-thumb]]:bg-primary [&_[data-thumb]]:border-primary/50 [&_[data-thumb]]:ring-primary/50",
        secondary:
          "[&_[data-track]]:bg-secondary/20 [&_[data-range]]:bg-secondary [&_[data-thumb]]:bg-secondary [&_[data-thumb]]:border-secondary/50 [&_[data-thumb]]:ring-secondary/50",
      },
      size: {
        sm: "min-h-3 [&_[data-track]]:h-[3px] [&_[data-thumb]]:h-3 [&_[data-thumb]]:w-3",
        md: "min-h-4 [&_[data-track]]:h-[5px] [&_[data-thumb]]:h-4 [&_[data-thumb]]:w-4",
        lg: "min-h-5.5 [&_[data-track]]:h-[7px] [&_[data-thumb]]:h-5.5 [&_[data-thumb]]:w-5.5",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
    },
  }
)

interface SliderProps
  extends Omit<
      React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>,
      "defaultValue" | "color" | "value"
    >,
    VariantProps<typeof sliderVariants> {
  /**
   * The default value of the slider when the component is uncontrolled.
   */
  defaultValue?: number[] | number

  /**
   * If true, the slider will be rendered as a range slider with two thumbs.
   * If false, it will be a single thumb slider.
   *
   * @default false
   */
  isRange?: boolean
  /**
   * Color of the slider
   * @default "primary"
   */
  color?: "primary" | "secondary" | "neutral"
  /**
   * Size of the slider
   * @default "md"
   */
  size?: "sm" | "md" | "lg"

  /**
   * The component to render as the minimum slider thumb when isRange = true,
   * when isRange is false, this prop will apply to the single slider thumb.
   */
  minSliderThumb?: React.ReactNode

  /**
   * The component to render as the maximum slider thumb when isRange = true,
   * when isRange is false, this prop will do nothing.
   */
  maxSliderThumb?: React.ReactNode

  /**
   * The value of the slider. This prop is used to control the slider.
   * When isRange is true, this prop should be an array of two numbers.
   * Otherwise, it should be a single number.
   */
  value?: number[] | number
}

const Slider = React.forwardRef<
  React.ComponentRef<typeof SliderPrimitive.Root>,
  SliderProps
>(
  (
    {
      className,
      color = "primary",
      size = "md",
      defaultValue: defaultValueProp,
      isRange = false,
      minSliderThumb,
      maxSliderThumb,
      value: valueProp,
      ...props
    },
    ref
  ) => {
    let defaultValue
    if (defaultValueProp) {
      if (typeof defaultValueProp === "number") {
        defaultValue = [defaultValueProp]
      } else if (Array.isArray(defaultValueProp)) {
        defaultValue = defaultValueProp
      }
    }

    let value
    if (valueProp) {
      if (typeof valueProp === "number") {
        value = [valueProp]
      } else if (Array.isArray(valueProp)) {
        value = valueProp
      }
    }
    return (
      <SliderPrimitive.Root
        className={cx(sliderVariants({ className, color, size }), className)}
        ref={ref}
        defaultValue={defaultValue}
        minStepsBetweenThumbs={1}
        value={value}
        {...props}
      >
        <SliderPrimitive.Track
          data-track
          className="relative w-full rounded-full"
        >
          <SliderPrimitive.Range
            data-range
            className="absolute h-full rounded-full"
          />
        </SliderPrimitive.Track>
        <SliderPrimitive.Thumb
          data-thumb
          className="flex items-center justify-center rounded-full border not-data-[disabled]:cursor-pointer not-data-[disabled]:hover:ring-1 focus-visible:ring-1 focus-visible:outline-none data-[disabled]:opacity-70 data-[disabled]:hover:cursor-not-allowed"
        >
          {minSliderThumb}
        </SliderPrimitive.Thumb>
        {isRange && (
          <SliderPrimitive.Thumb
            data-thumb
            className="block rounded-full border not-data-[disabled]:cursor-pointer not-data-[disabled]:hover:ring-1 focus-visible:ring-1 focus-visible:outline-none data-[disabled]:opacity-70 data-[disabled]:hover:cursor-not-allowed"
          >
            {maxSliderThumb}
          </SliderPrimitive.Thumb>
        )}
      </SliderPrimitive.Root>
    )
  }
)

export { Slider, type SliderProps }
