import { useAppSelector } from '@Redux/store';
import { selectActiveFlow } from '@Redux/selectors';

export const useGetActiveFlow = () => {
  return useAppSelector((state) => {
    return selectActiveFlow(state);
  });
};
