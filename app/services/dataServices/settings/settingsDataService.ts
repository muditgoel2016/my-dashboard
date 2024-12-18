// app/services/dataServices/settings/settingsDataService.ts

/**
 *
 * @param endpoint
 */
async function fetchData(endpoint: string) {
  const response = await fetch(`/api/settings/${endpoint}`);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
}

export const settingsDataService = {
  getSettingsData: () => fetchData(''),
};