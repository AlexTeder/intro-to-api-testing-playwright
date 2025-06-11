export const urlBuilder = (endpoint: string, id?: string | number): string => {
  return id ? `${endpoint}/${id}` : endpoint
}
