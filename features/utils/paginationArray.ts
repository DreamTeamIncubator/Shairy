type args = {
  totalPages: number
  currentPage: number
}

export const paginationArray = ({ totalPages, currentPage }: args): (string | number)[] => {
  const buttons: (string | number)[] = [];

  if (totalPages <= 7) {
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(i);
    }
    return buttons;
  }

  if (currentPage < 4) {
    buttons.push(1,2,3,4,5,'...',totalPages);
  } else if (currentPage > totalPages - 3) {
    buttons.push(1,'...',totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages);
  } else {
    buttons.push(1,'...',currentPage - 1, currentPage, currentPage + 1,'...',totalPages);
  }
  return buttons;
};