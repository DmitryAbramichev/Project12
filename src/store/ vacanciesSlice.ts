import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import type { VacanciesState, VacanciesResponse } from './types';
import type { RootState } from './store';

const initialState: VacanciesState = {
  items: [],
  loading: false,
  error: null,
  totalPages: 0,
};

export const fetchVacancies = createAsyncThunk<
  VacanciesResponse,
  void,
  { state: RootState }
>('vacancies/fetchVacancies', async (_, { getState }) => {
  const { filters } = getState();
  const params = new URLSearchParams({
    page: String(filters.page),
    per_page: '10',
    industry: '7',
    professional_role: '96',
    // ...(filters.search && { text: filters.search, search_field: 'name' }),
    // ...(filters.city !== 'all' && { area: filters.city }),
    // ...(filters.skills.length && { skill_set: filters.skills.join(',') }),
  });
  if (filters.search) {
      params.append('text', filters.search);
         }

    if (filters.city !== 'all') {
      params.append('area', filters.city);
    }

  const res = await fetch(`https://api.hh.ru/vacancies?${params}`);
  if (!res.ok) throw new Error('Ошибка загрузки');
  return res.json();
});

const vacanciesSlice = createSlice({
  name: 'vacancies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchVacancies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVacancies.fulfilled, (state, action: PayloadAction<VacanciesResponse>) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.pages;
      })
      .addCase(fetchVacancies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Неизвестная ошибка';
      });
  },
});

export default vacanciesSlice.reducer;