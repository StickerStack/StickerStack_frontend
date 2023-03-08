import { AppDispatch } from '../store/index';
import { useDispatch } from 'react-redux';

const useAppDispatch = () => useDispatch<typeof AppDispatch>();

export { useAppDispatch };
