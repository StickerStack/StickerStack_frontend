import { AppDispatch } from '../store/store';
import { useDispatch } from 'react-redux';

const useAppDispatch = () => useDispatch<typeof AppDispatch>();

export { useAppDispatch };
