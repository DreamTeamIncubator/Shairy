import * as Dialog from "@radix-ui/react-dialog"
import { Cross2Icon } from "@radix-ui/react-icons"
import clsx from "clsx"
import { ComponentPropsWithoutRef} from "react"
import s from "./ModalRadix.module.scss"
import {Button}from './../Button/Button'


type ModalSize = "lg" | "md" | "sm"

export type ModalRadixProps = {
  open: boolean
  onClose: () => void
  modalTitle: string
  size?: ModalSize
} & ComponentPropsWithoutRef<'div'>

//в {children} добавляются компоненты, которые будут отображены внутри модального окна 

export const ModalRadix = ({ modalTitle, className, onClose, open, children, size = "md", ...rest }: ModalRadixProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onClose} {...rest}>
      <Dialog.Portal>
        <Dialog.Overlay className={s.Overlay} />
        <Dialog.Content className={clsx(s.Content, s[size], className)}>
          <Dialog.Title className={s.Title}>{modalTitle}</Dialog.Title>
            <hr className={s.Hr} />
          <div className={s.Children}>
            {children}
          </div>
          <Dialog.Close asChild>
            <button className={s.IconButton} aria-label="Close">
              <Cross2Icon />
            </button>
          </Dialog.Close>
          <div className={s.ButtonContainer}>
          {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
