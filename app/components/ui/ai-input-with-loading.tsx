'use client';

import { CornerRightUp } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useAutoResizeTextarea } from "@/hooks/use-auto-resize-textarea";

interface AIInputWithLoadingProps {
  id?: string;
  placeholder?: string;
  minHeight?: number;
  maxHeight?: number;
  loadingDuration?: number;
  onSubmit?: (value: string) => void | Promise<void>;
  className?: string;
  disabled?: boolean;
}

export function AIInputWithLoading({
  id = "ai-input-with-loading",
  placeholder = "Ask me anything!",
  minHeight = 56,
  maxHeight = 200,
  loadingDuration = 3000,
  onSubmit,
  className,
  disabled = false,
}: AIInputWithLoadingProps) {
  const [inputValue, setInputValue] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const { textareaRef, adjustHeight } = useAutoResizeTextarea({
    minHeight,
    maxHeight,
  });

  const handleSubmit = async () => {
    if (!inputValue.trim() || submitted || disabled) return;

    setSubmitted(true);
    await onSubmit?.(inputValue);
    setInputValue("");
    adjustHeight(true);

    setTimeout(() => {
      setSubmitted(false);
    }, loadingDuration);
  };

  return (
    <div className={cn("w-full py-4", className)}>
      <div className="relative max-w-xl w-full mx-auto flex items-start flex-col gap-2">
        <div className="relative max-w-xl w-full mx-auto">
          <textarea
            id={id}
            placeholder={placeholder}
            className={cn(
              "max-w-xl w-full rounded-3xl pl-6 pr-10 py-4 resize-none text-wrap leading-[1.2]",
              "bg-white/5 border border-white/10 text-white placeholder:text-white/50",
              "focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500/50",
              "transition-all duration-200",
              `min-h-[${minHeight}px]`
            )}
            ref={textareaRef}
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              adjustHeight();
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
            disabled={submitted || disabled}
          />
          <button
            onClick={handleSubmit}
            className={cn(
              "absolute right-3 top-1/2 -translate-y-1/2 rounded-xl py-1 px-1 transition-all",
              submitted || disabled ? "bg-none" : "bg-white/10 hover:bg-white/20"
            )}
            type="button"
            disabled={submitted || disabled}
          >
            {submitted ? (
              <div
                className="w-4 h-4 bg-cyan-400 rounded-sm animate-spin"
                style={{ animationDuration: "3s" }}
              />
            ) : (
              <CornerRightUp
                className={cn(
                  "w-4 h-4 transition-opacity text-white",
                  inputValue ? "opacity-100" : "opacity-30"
                )}
              />
            )}
          </button>
        </div>
        <p className="pl-4 h-4 text-xs mx-auto text-white/50">
          {disabled ? "You already asked your question!" : submitted ? "AI is thinking..." : "One question per visit — make it count!"}
        </p>
      </div>
    </div>
  );
}
