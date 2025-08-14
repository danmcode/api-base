export interface ApiResponse<T> {
    success: boolean;
    data: T;
    pagination?: PaginationInfo;
    timestamp: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
}

export interface PaginatedData<T> {
    items: T[];
    pagination: PaginationInfo;
}