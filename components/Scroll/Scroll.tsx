import {ScrollArea} from 'radix-ui';
import clsx from 'clsx';
import {ComponentPropsWithoutRef, ReactNode} from 'react';
import s from '../Scroll/Scroll.module.scss'

type PropsType = {
    children?: ReactNode
    className?: string
    maxHeight?: number | string
    maxWidth?: number | string
    type?: ScrollArea.ScrollAreaProps['type']
} & ComponentPropsWithoutRef<'div'>

export const Scroll = ({
                           children,
                           className,
                           maxHeight = '100%',
                           maxWidth = '100%',
                           type = 'auto',
                           ...rest
                       }: PropsType) => {

    const maxHeightConverted = typeof maxHeight === 'number' ? `${maxHeight}px` : maxHeight
    const maxWidthConverted = typeof maxWidth === 'number' ? `${maxWidth}px` : maxWidth

    const viewportStyles = {maxHeight: maxHeightConverted, maxWidth: maxWidthConverted}

    return (
        <ScrollArea.Root asChild type={type}>
            <div className={clsx(s.root, className)} {...rest}>
                <ScrollArea.Viewport className={s.Viewport} style={viewportStyles}>
                    {children}
                </ScrollArea.Viewport>
                <ScrollArea.Scrollbar className={s.Scrollbar} orientation="vertical">
                    <ScrollArea.Thumb className={s.Thumb}/>
                </ScrollArea.Scrollbar>
                <ScrollArea.Scrollbar className={s.Scrollbar} orientation="horizontal">
                    <ScrollArea.Thumb className={s.Thumb}/>
                </ScrollArea.Scrollbar>
                <ScrollArea.Corner className={s.Corner}/>
            </div>
        </ScrollArea.Root>
    )
}
