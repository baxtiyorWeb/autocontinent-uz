"use client"

import { Button } from "@/components/ui/button"
import { TextIcon as Telegram } from "lucide-react"
import { JSX } from "react"

interface TelegramBotButtonProps {
  href?: string
  /**
   * Accessible label for screen-reader users.
   * Defaults to "Open Telegram bot".
   */
  ariaLabel?: string
}

/**
 * Small helper button that takes users to the official
 * AvtoKontinent Telegram bot for SMS / code verification.
 */
export function TelegramBotButton({
  href = "https://t.me/avtokontinent_bot",
  ariaLabel = "Open Telegram bot",
}: TelegramBotButtonProps): JSX.Element {
  return (
    <Button asChild size="sm" className="border-primary text-primary bg-white my-3 hover:bg-primary/10 gap-1" aria-label={ariaLabel}>
      <a href={href} target="_blank" rel="noopener noreferrer">
        <Telegram className="h-4 w-4" />
        <span className="sr-only">{ariaLabel}</span>
        {"Botga o‘tish"}
      </a>
    </Button>
  )
}
