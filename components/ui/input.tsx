import * as React from "react"

import { cn } from "@/lib/utils"

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  /**
   * Renders a customizable input element with specific styling.
   * @param {Object} props - The properties passed to the component.
   * @param {string} props.className - Additional CSS classes to apply to the input.
   * @param {string} props.type - The type of the input element (e.g., 'text', 'password', etc.).
   * @param {React.Ref} ref - A ref object to access the underlying DOM element.
   * @returns {React.Element} A styled input element with applied properties and ref.
   */
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

export { Input }
