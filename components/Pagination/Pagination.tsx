import s from './Pagination.module.scss';
import clsx from 'clsx';
import { paginationArray } from '@/features/utils/paginationArray';
import { Select } from 'radix-ui';


export type DropdownItems = 10 | 20 | 30 | 50 | 100
type Props = {
  totalPages: number;
  currentPage: number;
  onPageChangeAction: (page: number) => void;
  itemsPerPage: DropdownItems
  onItemsPerPageChangeAction: (itemsPerPage: DropdownItems) => void
};

let dropdownList = [10, 20, 30, 50, 100];

export const Pagination = ({
                             totalPages,
                             currentPage,
                             onPageChangeAction,
                             itemsPerPage,
                             onItemsPerPageChangeAction,
                           }: Props) => {

  const paginationButtons = paginationArray({ totalPages, currentPage });

  return (
    <div className={s.pagination}>
      {/*nav left*/}
      <button
        onClick={() => onPageChangeAction(currentPage - 1)}
        disabled={currentPage === 1}
        className={clsx(s.paginationButton, s.nav, currentPage === 1 && s.disabled)}
      >
        <div className={s.icon} style={{ maskImage: `url(/icons/arrow-ios-back.svg)` }}></div>
      </button>
      {/*numbers*/}
      {paginationButtons.map((button, index) =>
        typeof button === 'number' ? (
          <button
            key={index}
            onClick={() => onPageChangeAction(button)}
            disabled={button === currentPage}
            className={clsx(s.paginationButton, button === currentPage && s.active)}
          >
            {button}
          </button>
        ) : (
          <span key={index} className={s.paginationDots}>...</span>
        ),
      )}
      {/* nav right*/}
      <button
        onClick={() => onPageChangeAction(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={clsx(s.paginationButton, s.nav, currentPage === totalPages && s.disabled)}
      >
        <div className={s.icon} style={{ maskImage: `url(/icons/arrow-ios-forward.svg)` }}></div>
      </button>
            {/*select*/}
      <div className={s.paginationSelect}>
        Show
        <Select.Root  value={String(itemsPerPage)} onValueChange={(value) => onItemsPerPageChangeAction(Number(value) as DropdownItems)}>
          <Select.Trigger className={s.selectTrigger} >
            <Select.Value />
            <div style={{maskImage: `url(/icons/arrow-ios-Down-outline.svg)`}} className={s.triggerIcon}></div>
          </Select.Trigger>
          <Select.Portal>
            <Select.Content className={s.selectContent} position='popper'>
              <Select.Viewport>
                {dropdownList.map((item) => (
                  <Select.Item key={item} value={String(item)} className={s.selectItem}>
                    <Select.ItemText>{item}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Viewport>
            </Select.Content>
          </Select.Portal>
        </Select.Root>
        on page
      </div>
    </div>
  );
};
