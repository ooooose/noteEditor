import { useThemes } from '../api/get-themes'

export const useFetchThemes = () => {
  const themesQuery = useThemes()

  return {
    themes: themesQuery?.data,
    // randomTheme: data?.randomTheme,
    isLoading: themesQuery.isLoading,
    isError: themesQuery.isError,
  }
}
