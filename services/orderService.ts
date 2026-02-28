import apiClient from '@/lib/apiClient';
import { CreateOrderRequest, CreateOrderResponse, OrderDetailRow } from '@/types';

/**
 * POST /create-test-order
 * Places a new order and returns the created order_id and user_id.
 */
export const createOrder = async (
    payload: CreateOrderRequest
): Promise<CreateOrderResponse> => {
    const response = await apiClient.post<CreateOrderResponse>(
        '/create-test-order',
        payload
    );
    return response.data;
};

/**
 * GET /orders-detailed
 * Returns all orders as a flat list of rows (one row per product per order).
 */
export const getOrdersDetailed = async (): Promise<OrderDetailRow[]> => {
    const response = await apiClient.get<OrderDetailRow[]>('/orders-detailed');
    return response.data;
};
