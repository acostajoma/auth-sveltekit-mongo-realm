export const currentYear = new Date().getFullYear();
export const startYear = 1950;
export const brands = ['Toyota', 'Brand2', 'Brand3'];
export const models = ['Malibu', 'Model2', 'Other']; // Add the models
export const fuels = ['Electricidad', 'Premium', 'Regular', 'Diesel', 'Gas'];
export const years = Array.from({ length: currentYear - startYear + 1 }, (_, i) => startYear + i);