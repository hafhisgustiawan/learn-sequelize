import { object, string, number } from 'yup';
export const productValidationSchema = object({
    title: string().max(255).required('Product title required'),
    description: string().required('Product description required'),
    price: number().required('Product price required'),
    imageUrl: string().notRequired(),
});
