import { Select } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { setCity } from '../../store/ filtersSlice.ts';

export function CitySelect() {
  const dispatch = useAppDispatch();
  const city = useAppSelector(state => state.filters.city);

  return (
    <Select
      label="Город"
      placeholder="Все города"
      data={[
        { value: 'all', label: 'Все города' },
        { value: '1', label: 'Москва' },
        { value: '2', label: 'Санкт-Петербург' },
      ]}
      value={city}
      onChange={(value) => {
  const cityValue = value as 'all' | '1' | '2';
  dispatch(setCity(cityValue || 'all'));
}}
    />
  );
}