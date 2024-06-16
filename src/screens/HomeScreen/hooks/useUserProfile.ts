import {useState, useEffect, useCallback} from 'react';
import userService from 'services/api/userService';
import {openModal} from 'store/modals/actions';
import {MODALS} from 'components/AppModals/Modals';
import {useDispatch} from 'react-redux';
import {UserProfileResponseDataSuccess} from 'services/api/userService/getUserProfile';

const useUserProfile = () => {
  const [userProfile, setUserProfile] = useState<any | null>(null);
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
      setError('Failed to fetch user profile');
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
  }, []);

  useEffect(() => {
    fetchUserProfile();
  }, [fetchUserProfile]);

  return {
    userProfile,
    error,
    loading,
    refetch: fetchUserProfile,
  };
};

export default useUserProfile;
