import { useEffect } from 'react';
import { AppShell, Flex, Text, Pagination, Loader, Alert } from '@mantine/core';
import { useAppDispatch, useAppSelector } from '../../hooks/reduxHooks';
import { fetchVacancies } from '../../store/ vacanciesSlice.ts';
import { setPage } from '../../store/ filtersSlice.ts';
import { CitySelect } from '../CitySelect/CitySelect';
import { SkillsInput } from '../SkillsInput/SkillsInput';
import { VacancyCard } from '../VacancyCard/VacancyCard';
import { SearchBar } from '../SearchBar/SearchBar.tsx';

export function Main() {
  const dispatch = useAppDispatch();
  const { items, loading, error, totalPages } = useAppSelector(state => state.vacancies);
  const page = useAppSelector(state => state.filters.page);
  const filters = useAppSelector(state => state.filters);

  // Загружаем вакансии при изменении фильтров
  useEffect(() => {
    dispatch(fetchVacancies());
  }, [filters, dispatch]);

  const handlePageChange = (newPage: number) => {
    dispatch(setPage(newPage - 1)); // API hh.ru использует page с 0
  };

  return (
    <AppShell.Main>
      <Flex justify="center" direction="column">
      <Flex justify="center" direction="row" gap="xl" wrap="nowrap" p="xl" >
        <div>
            <Text fw={600} size="lg">Список вакансий</Text>
            <Text size="sm" c="dimmed">по профессии Frontend-разработчик</Text>
        </div>
        <SearchBar />
      </Flex>
    
      <Flex justify="center" direction="row" gap="xl" wrap="wrap" p="xl">
        
        {/* Левая колонка с фильтрами */}
        <Flex direction="column" gap="md" style={{ width: 300 }}>
          <SkillsInput />
          <CitySelect />
        </Flex>

        {/* Правая колонка со списком вакансий */}
        <Flex direction="column" gap="md" style={{ flex: 1, maxWidth: 800 }}>
          {loading && <Loader size="lg" />}
          {error && <Alert color="red">{error}</Alert>}
          {!loading && !error && items.length === 0 && (
            <Text>Вакансии не найдены</Text>
          )}
          {items.map(vacancy => (
            <VacancyCard key={vacancy.id} vacancy={vacancy} />
          ))}
          {totalPages > 1 && (
            <Pagination
              total={totalPages}
              value={page + 1}
              onChange={handlePageChange}
              mt="md"
              style={{ alignSelf: 'center' }}
            />
          )}
        </Flex>
      </Flex>
      </Flex>

    </AppShell.Main>
  );
}