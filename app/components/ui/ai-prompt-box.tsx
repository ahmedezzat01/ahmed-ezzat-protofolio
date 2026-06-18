"use client"
import * as React from "react"
import * as TooltipPrimitive from "@radix-ui/react-tooltip"
import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ArrowUp, Square, X, Globe, BrainCog } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"

const TooltipProvider = TooltipPrimitive.Provider
const Tooltip = TooltipPrimitive.Root
const TooltipTrigger = TooltipPrimitive.Trigger
const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Content
    ref={ref}
    sideOffset={sideOffset}
    className={cn(
      "z-50 overflow-hidden rounded-md border border-[#333333] bg-[#1F2023] px-3 py-1.5 text-sm text-white shadow-md animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2",
      className
    )}
    {...props}
  />
))
TooltipContent.displayName = TooltipPrimitive.Content.displayName

const DialogPortal = DialogPrimitive.Portal
const DialogOverlay = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Overlay>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    ref={ref}
    className={cn(
      "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0",
      className
    )}
    {...props}
  />
))
DialogOverlay.displayName = DialogPrimitive.Overlay.displayName

const DialogContent = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        "fixed left-[50%] top-[50%] z-50 grid w-full max-w-[90vw] md:max-w-[800px] translate-x-[-50%] translate-y-[-50%] gap-4 border border-[#333333] bg-[#1F2023] p-0 shadow-xl duration-300 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 rounded-2xl",
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 z-10 rounded-full bg-[#2E3033]/80 p-2 hover:bg-[#2E3033] transition-all">
        <X className="h-5 w-5 text-gray-200 hover:text-white" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))
DialogContent.displayName = DialogPrimitive.Content.displayName

const DialogTitle = React.forwardRef<
  React.ElementRef<typeof DialogPrimitive.Title>,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    ref={ref}
    className={cn("text-lg font-semibold leading-none tracking-tight text-gray-100", className)}
    {...props}
  />
))
DialogTitle.displayName = DialogPrimitive.Title.displayName

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  className?: string
}
const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(({ className, ...props }, ref) => (
  <textarea
    className={cn(
      "flex w-full rounded-md border-none bg-transparent px-3 py-2.5 text-base text-gray-100 placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 min-h-[44px] resize-none",
      className
    )}
    ref={ref}
    rows={1}
    {...props}
  />
))
Textarea.displayName = "Textarea"

interface PromptInputContextType {
  isLoading: boolean; value: string; setValue: (value: string) => void;
  maxHeight: number | string; onSubmit?: () => void; disabled?: boolean;
}
const PromptInputContext = React.createContext<PromptInputContextType>({
  isLoading: false, value: "", setValue: () => {}, maxHeight: 240, onSubmit: undefined, disabled: false,
})
function usePromptInput() {
  const context = React.useContext(PromptInputContext)
  if (!context) throw new Error("usePromptInput must be used within a PromptInput")
  return context
}

interface PromptInputProps {
  isLoading?: boolean; value?: string; onValueChange?: (value: string) => void;
  maxHeight?: number | string; onSubmit?: () => void; children: React.ReactNode;
  className?: string; disabled?: boolean;
}
const PromptInput = React.forwardRef<HTMLDivElement, PromptInputProps>(
  ({ className, isLoading = false, maxHeight = 240, value, onValueChange, onSubmit, children, disabled = false }, ref) => {
    const [internalValue, setInternalValue] = React.useState(value || "")
    const handleChange = (newValue: string) => { setInternalValue(newValue); onValueChange?.(newValue) }
    return (
      <TooltipProvider>
        <PromptInputContext.Provider value={{ isLoading, value: value ?? internalValue, setValue: onValueChange ?? handleChange, maxHeight, onSubmit, disabled }}>
          <div ref={ref} className={cn("rounded-3xl border border-[#444444] bg-[#1F2023] p-2 shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300", isLoading && "border-red-500/70", className)}>
            {children}
          </div>
        </PromptInputContext.Provider>
      </TooltipProvider>
    )
  }
)
PromptInput.displayName = "PromptInput"

interface PromptInputTextareaProps { disableAutosize?: boolean; placeholder?: string }
const PromptInputTextarea: React.FC<PromptInputTextareaProps & React.ComponentProps<typeof Textarea>> = ({ className, onKeyDown, disableAutosize = false, placeholder, ...props }) => {
  const { value, setValue, maxHeight, onSubmit, disabled } = usePromptInput()
  const textareaRef = React.useRef<HTMLTextAreaElement>(null)

  React.useEffect(() => {
    if (disableAutosize || !textareaRef.current) return
    textareaRef.current.style.height = "auto"
    textareaRef.current.style.height = typeof maxHeight === "number" ? `${Math.min(textareaRef.current.scrollHeight, maxHeight)}px` : `min(${textareaRef.current.scrollHeight}px, ${maxHeight})`
  }, [value, maxHeight, disableAutosize])

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); onSubmit?.() }
    onKeyDown?.(e)
  }

  return <Textarea ref={textareaRef} value={value} onChange={(e) => setValue(e.target.value)} onKeyDown={handleKeyDown} className={cn("text-base", className)} disabled={disabled} placeholder={placeholder} {...props} />
}

const PromptInputActions: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ children, className, ...props }) => (
  <div className={cn("flex items-center gap-2", className)} {...props}>{children}</div>
)

interface PromptInputActionProps extends React.ComponentProps<typeof Tooltip> {
  tooltip: React.ReactNode; children: React.ReactNode; side?: "top" | "bottom" | "left" | "right"; className?: string
}
const PromptInputAction: React.FC<PromptInputActionProps> = ({ tooltip, children, className, side = "top", ...props }) => {
  const { disabled } = usePromptInput()
  return (
    <Tooltip {...props}>
      <TooltipTrigger asChild disabled={disabled}>{children}</TooltipTrigger>
      <TooltipContent side={side} className={className}>{tooltip}</TooltipContent>
    </Tooltip>
  )
}

interface PromptInputBoxProps { onSend?: (message: string) => void; isLoading?: boolean; placeholder?: string; className?: string }
export const PromptInputBox = React.forwardRef((props: PromptInputBoxProps, ref: React.Ref<HTMLDivElement>) => {
  const { onSend = () => {}, isLoading = false, placeholder = "Type your message here...", className } = props
  const [input, setInput] = React.useState("")
  const [showSearch, setShowSearch] = React.useState(false)
  const [showThink, setShowThink] = React.useState(false)
  const hasContent = input.trim().length > 0

  const handleToggleChange = (value: string) => {
    if (value === "search") { setShowSearch((prev) => !prev); setShowThink(false) }
    else if (value === "think") { setShowThink((prev) => !prev); setShowSearch(false) }
  }

  const handleSubmit = () => {
    if (input.trim()) {
      let messagePrefix = ""
      if (showSearch) messagePrefix = "[Search: "
      else if (showThink) messagePrefix = "[Think: "
      const formattedInput = messagePrefix ? `${messagePrefix}${input}]` : input
      onSend(formattedInput)
      setInput("")
    }
  }

  return (
    <PromptInput value={input} onValueChange={setInput} isLoading={isLoading} onSubmit={handleSubmit}
      className={cn("w-full bg-[#1F2023] border-[#444444] shadow-[0_8px_30px_rgba(0,0,0,0.24)] transition-all duration-300 ease-in-out", className)}
      disabled={isLoading} ref={ref}
    >
      <PromptInputTextarea placeholder={showSearch ? "Search the web..." : showThink ? "Think deeply..." : placeholder} className="text-base" />

      <PromptInputActions className="flex items-center justify-between gap-2 p-0 pt-2">
        <div className="flex items-center gap-1">
          <button type="button" onClick={() => handleToggleChange("search")} className={cn("rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8", showSearch ? "bg-[#1EAEDB]/15 border-[#1EAEDB] text-[#1EAEDB]" : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]")}>
            <Globe className={cn("w-4 h-4", showSearch ? "text-[#1EAEDB]" : "text-inherit")} />
            <AnimatePresence>
              {showSearch && <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="text-xs overflow-hidden whitespace-nowrap text-[#1EAEDB] flex-shrink-0">Search</motion.span>}
            </AnimatePresence>
          </button>

          <div className="relative h-6 w-[1.5px] mx-1">
            <div className="absolute inset-0 bg-gradient-to-t from-transparent via-cyber-red/70 to-transparent rounded-full" />
          </div>

          <button type="button" onClick={() => handleToggleChange("think")} className={cn("rounded-full transition-all flex items-center gap-1 px-2 py-1 border h-8", showThink ? "bg-[#8B5CF6]/15 border-[#8B5CF6] text-[#8B5CF6]" : "bg-transparent border-transparent text-[#9CA3AF] hover:text-[#D1D5DB]")}>
            <BrainCog className={cn("w-4 h-4", showThink ? "text-[#8B5CF6]" : "text-inherit")} />
            <AnimatePresence>
              {showThink && <motion.span initial={{ width: 0, opacity: 0 }} animate={{ width: "auto", opacity: 1 }} exit={{ width: 0, opacity: 0 }} transition={{ duration: 0.2 }} className="text-xs overflow-hidden whitespace-nowrap text-[#8B5CF6] flex-shrink-0">Think</motion.span>}
            </AnimatePresence>
          </button>
        </div>

        <PromptInputAction tooltip={isLoading ? "Stop generation" : hasContent ? "Send message" : "Enter message"}>
          <button className={cn("h-8 w-8 rounded-full transition-all duration-200 flex items-center justify-center", hasContent ? "bg-white hover:bg-white/80 text-[#1F2023]" : "bg-transparent hover:bg-gray-600/30 text-[#9CA3AF] hover:text-[#D1D5DB]")} onClick={handleSubmit} disabled={isLoading || !input.trim()}>
            {isLoading ? <Square className="h-4 w-4 fill-[#1F2023] animate-pulse" /> : <ArrowUp className="h-4 w-4 text-[#1F2023]" />}
          </button>
        </PromptInputAction>
      </PromptInputActions>
    </PromptInput>
  )
})
PromptInputBox.displayName = "PromptInputBox"
