import { FC } from 'react';
import { usePagination } from './usePagination';
import s from './Pagination.module.scss';
import clsx from 'clsx';
import KeyboardArrowLeft from '@/components/Pagination/keyboardArrows/KeyboardArrowLeft';
import KeyboardArrowRight from '@/components/Pagination/keyboardArrows/KeyboardArrowRight';
import {RadixSelect} from '@/components/Select/RadixSelect';

type PaginationConditionals =
  | {
      onPerPageChange: (itemPerPage: number) => void;
      perPage: number;
      perPageOptions: number[];
    }
  | {
      onPerPageChange?: never;
      perPage?: null;
      perPageOptions?: never;
    };

export type PaginationProps = {
  count: number;
  onChange: (page: number) => void;
  onPerPageChange?: (itemPerPage: number) => void;
  page: number;
  perPage?: number;
  perPageOptions?: number[];
  siblings?: number;
} & PaginationConditionals;

const classNames = {
  container: s.container,
  dots: s.dots,
  icon: s.icon,
  item: s.item,
  pageButton(selected?: boolean) {
    return clsx(this.item, selected && s.selected);
  },
  root: s.root,
  paginationSelect: s.paginationSelect,
  selectBox: s.selectBox,
};

export const Pagination: FC<PaginationProps> = ({
  count,
  onChange,
  onPerPageChange,
  page,
  perPage = null,
  perPageOptions,
  siblings,
}) => {
  const {
    handleMainPageClicked,
    handleNextPageClicked,
    handlePreviousPageClicked,
    isFirstPage,
    isLastPage,
    paginationRange,
  } = usePagination({
    count,
    onChange,
    page,
    siblings,
  });

  const showPerPageSelect = !!perPage && !!perPageOptions && !!onPerPageChange;

  return (
    <div className={classNames.root}>
      <div className={classNames.container}>
        <PrevButton
          disabled={isFirstPage}
          onClick={handlePreviousPageClicked}
        />

        <MainPaginationButtons
          currentPage={page}
          onClick={handleMainPageClicked}
          paginationRange={paginationRange}
        />

        <NextButton disabled={isLastPage} onClick={handleNextPageClicked} />
      </div>

      {showPerPageSelect && (
        <PerPageSelect
          {...{
            onPerPageChange,
            perPage,
            perPageOptions,
          }}
        />
      )}
    </div>
  );
};

type NavigationButtonProps = {
  disabled?: boolean;
  onClick: () => void;
};

type PageButtonProps = NavigationButtonProps & {
  page: number;
  selected: boolean;
};

const Dots: FC = () => {
  return (
    <span className={classNames.dots} tabIndex={0}>
      &#8230;
    </span>
  );
};
const PageButton: FC<PageButtonProps> = ({
  disabled,
  onClick,
  page,
  selected,
}) => {
  return (
    <button
      className={classNames.pageButton(selected)}
      disabled={selected || disabled}
      onClick={onClick}
      type={'button'}
      tabIndex={0}
    >
      {page}
    </button>
  );
};
const PrevButton: FC<NavigationButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      className={classNames.item}
      disabled={disabled}
      onClick={onClick}
      type={'button'}
    >
      <KeyboardArrowLeft className={classNames.icon} size={16} />
    </button>
  );
};

const NextButton: FC<NavigationButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      className={classNames.item}
      disabled={disabled}
      onClick={onClick}
      type={'button'}
    >
      <KeyboardArrowRight className={classNames.icon} size={16} />
    </button>
  );
};

type MainPaginationButtonsProps = {
  currentPage: number;
  onClick: (pageNumber: number) => () => void;
  paginationRange: (number | string)[];
};

const MainPaginationButtons: FC<MainPaginationButtonsProps> = ({
  currentPage,
  onClick,
  paginationRange,
}) => {
  return (
    <>
      {paginationRange.map((page: number | string, index) => {
        const isSelected = page === currentPage;

        if (typeof page !== 'number') {
          return <Dots key={index} />;
        }

        return (
          <PageButton
            key={index}
            onClick={onClick(page)}
            page={page}
            selected={isSelected}
          />
        );
      })}
    </>
  );
};

export type PerPageSelectProps = {
  onPerPageChange: (itemPerPage: number) => void;
  perPage: number;
  perPageOptions: number[];
};

export const PerPageSelect: FC<PerPageSelectProps> = ({
  onPerPageChange,
  perPage,
  perPageOptions,
}) => {
  const selectOptions = perPageOptions.map((value) => ({
    label: String(value),
    value: String(value),
  }));

  return (
    <div className={classNames.selectBox}>
      Show
      <RadixSelect
        className={s.paginationSelect}
        contentClassName={s.customDropdown}
        onValueChange={(value) => onPerPageChange(Number(value))}
        options={selectOptions}
        value={String(perPage)}
      />
      on page
    </div>
  );
};
