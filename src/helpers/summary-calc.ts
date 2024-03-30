interface summaryCalcProps {
  price: number;
  isFixed: boolean;
  discount_amount: number;
  max_discount_percentage: number | null;
}

export const summaryCalc = ({
  price,
  isFixed,
  discount_amount,
  max_discount_percentage,
}: summaryCalcProps): number => {
  // if discount 100 SR
  if (isFixed) {
    // return 100 SR
    return discount_amount;
  }

  // if discount 10%
  const discount = (price * discount_amount) / 100;

  // if max discount 50 SR
  if (max_discount_percentage) {
    // if discount is 50 SR and max discount is 30 SR
    if (discount > max_discount_percentage) {
      // return 30 SR
      return max_discount_percentage;
    }
    // return 50 SR
    return discount;
  }

  return discount;
};
