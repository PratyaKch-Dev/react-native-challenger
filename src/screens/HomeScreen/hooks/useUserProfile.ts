import {useState, useEffect, useCallback} from 'react';
import userService from 'services/api/userService';
import {openModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';
import {useDispatch} from 'react-redux';
import {UserProfileResponseDataSuccess} from 'services/api/userService/getUserProfile';
import {TransactionsResponseDataSuccess} from 'services/api/userService/getUserTransactions';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
  const [transactions, setTransactions] = useState<any | null>(null);
  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch();

  const fetchUserProfile = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService().getUserProfile();
      const data = response.data as UserProfileResponseDataSuccess;
      setUserProfile(data.data);
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as {message: string}).message
          : 'An unexpected error occurred';
      dispatch(
        openModal({
          modalType: MODALS.MODAL_HANDLER_ERROR,
          modalProps: {message: errorMessage},
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  const fetchUserTransactions = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const response = await userService().getUserTransactions();
      const data = response.data as TransactionsResponseDataSuccess;
      setTransactions(data.data);
    } catch (error) {
      const errorMessage =
        error && typeof error === 'object' && 'message' in error
          ? (error as {message: string}).message
          : 'An unexpected error occurred';
      dispatch(
        openModal({
          modalType: MODALS.MODAL_HANDLER_ERROR,
          modalProps: {message: errorMessage},
        }),
      );
    } finally {
      setLoading(false);
    }
  }, [dispatch]);

  return {
    userProfile,
    transactions,
    error,
    loading,
    refetchUserProfile: fetchUserProfile,
    refetchUserTransactions: fetchUserTransactions,
  };
};

export default useUserProfile;
