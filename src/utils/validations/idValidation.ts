import { object, number } from 'yup';

export const idValidationSchema = object({
  id: number().required(' Id path is required'),
});
