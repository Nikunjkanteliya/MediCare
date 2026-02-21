import { z } from 'zod';

export const addressSchema = z.object({
    fullName: z
        .string()
        .min(3, 'Full name must be at least 3 characters')
        .max(50, 'Full name cannot exceed 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
    phone: z
        .string()
        .regex(/^[6-9]\d{9}$/, 'Please enter a valid 10-digit Indian mobile number'),
    addressLine: z
        .string()
        .min(10, 'Address must be at least 10 characters')
        .max(200, 'Address cannot exceed 200 characters'),
    city: z
        .string()
        .min(2, 'City name must be at least 2 characters')
        .max(50, 'City name cannot exceed 50 characters')
        .regex(/^[a-zA-Z\s]+$/, 'City can only contain letters and spaces'),
    state: z
        .string()
        .min(1, 'Please select a state'),
    pincode: z
        .string()
        .regex(/^[1-9][0-9]{5}$/, 'Please enter a valid 6-digit PIN code'),
    type: z.enum(['Home', 'Work', 'Other']).default('Home'),
});

export type AddressFormValues = z.infer<typeof addressSchema>;

export const indianStates = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh',
    'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka',
    'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram',
    'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu',
    'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal',
    'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli',
    'Daman and Diu', 'Delhi', 'Jammu and Kashmir', 'Ladakh', 'Lakshadweep',
    'Puducherry',
];
