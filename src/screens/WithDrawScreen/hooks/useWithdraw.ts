import {useState, useCallback, useMemo} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {openModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';
import Toast from 'react-native-toast-message';
import userService from 'services/api/userService';
import {RootState} from 'store';

export default function useWithdraw() {
  const [amount, setAmount] = useState('0.00');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const baseSalary = useSelector(
    (state: RootState) => state.transactions.available,
  );

  const formatAmount = useCallback((value: string) => {
    const cleanedValue = value.replace(/[^\d.]/g, '');
    const [integerPart, decimalPart] = cleanedValue.split('.');

    const formattedIntegerPart = integerPart.replace(
      /\B(?=(\d{3})+(?!\d))/g,
      ',',
    );

    const formattedDecimalPart = decimalPart ? decimalPart.slice(0, 2) : '00';

    return `${formattedIntegerPart}.${formattedDecimalPart}`;
  }, []);

  const handleWithdraw = useCallback(async () => {
    if (parseFloat(amount.replace(/,/g, '')) > 0.5 * baseSalary) {
      dispatch(
        openModal({
          modalType: MODALS.MODAL_HANDLER_ERROR,
          modalProps: {
            message: `Withdrawal failed. The requested amount exceeds 50% of your base salary (${(
              0.5 * baseSalary
            ).toLocaleString()}). Please enter a smaller amount.`,
          },
        }),
      );
      return;
    }

    setLoading(true);
    try {
      const response = await userService().withdraw({amount});
      if (response?.data?.message === 'success') {
        Toast.show({
          type: 'success',
          text1: 'Withdrawal Successful',
        });
      } else {
        throw new Error('Withdrawal failed');
      }
    } catch (error) {
      dispatch(
        openModal({
          modalType: MODALS.MODAL_HANDLER_ERROR,
          modalProps: {message: 'Withdrawal failed'},
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [amount, dispatch]);

  return useMemo(
    () => ({
      amount,
      setAmount,
      loading,
      handleWithdraw,
      formatAmount,
    }),
    [amount, loading, handleWithdraw, formatAmount],
  );
}
