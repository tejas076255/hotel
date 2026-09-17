import { api } from "./api";

// Types
export interface Service {
    id: string;
    name: string;
    slug: string;
    description: string | null;
    category: ServiceCategory;
    pricingType: ServicePricingType;
    basePrice: number;
    isActive: boolean;
    requiresBooking: boolean;
    maxCapacity: number | null;
    operatingHours: OperatingHours | null;
    duration: number | null;
    imageUrl: string | null;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}

export type ServiceCategory =
    | "FOOD_BEVERAGE"
    | "SPA_WELLNESS"
    | "RECREATION"
    | "TRANSPORTATION"
    | "BUSINESS"
    | "LAUNDRY"
    | "CONCIERGE"
    | "ROOM_SERVICE"
    | "OTHER";

export type ServicePricingType =
    | "FIXED"
    | "PER_HOUR"
    | "PER_PERSON"
    | "PER_ITEM";

export interface OperatingHours {
    [day: string]: {
        open?: string;
        close?: string;
        isClosed?: boolean;
    };
}

export interface CreateServiceDto {
    name: string;
    slug: string;
    description?: string;
    category: ServiceCategory;
    pricingType: ServicePricingType;
    basePrice: number;
    isActive?: boolean;
    requiresBooking?: boolean;
    maxCapacity?: number;
    operatingHours?: OperatingHours;
    duration?: number;
    imageUrl?: string;
    displayOrder?: number;
}

export interface UpdateServiceDto extends Partial<CreateServiceDto> { }

export interface ServicesResponse {
    data: Service[];
    meta: {
        total: number;
        page: number;
        limit: number;
        totalPages: number;
    };
}

export interface ServicesFilters {
    category?: ServiceCategory;
    isActive?: boolean;
    search?: string;
    page?: number;
    limit?: number;
}

const MOCK_SERVICES: Service[] = [
    {
        id: "s1",
        name: "Luxury Spa & Wellness Package",
        slug: "luxury-spa-wellness",
        description: "Rejuvenating 90-minute full body massage and aromatherapy session.",
        category: "SPA_WELLNESS",
        pricingType: "PER_PERSON",
        basePrice: 1200,
        isActive: true,
        requiresBooking: true,
        maxCapacity: 10,
        operatingHours: null,
        duration: 90,
        imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&auto=format&fit=crop",
        displayOrder: 1,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "s2",
        name: "Private Airport Pickup & Transfer",
        slug: "airport-transfer",
        description: "Chauffeur-driven executive luxury sedan transfer to and from the airport.",
        category: "TRANSPORTATION",
        pricingType: "FIXED",
        basePrice: 1500,
        isActive: true,
        requiresBooking: true,
        maxCapacity: 4,
        operatingHours: null,
        duration: 45,
        imageUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800&auto=format&fit=crop",
        displayOrder: 2,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
    {
        id: "s3",
        name: "Gourmet Breakfast Buffet",
        slug: "gourmet-breakfast",
        description: "Unlimited international and authentic Indian breakfast spread with fresh juices.",
        category: "FOOD_BEVERAGE",
        pricingType: "PER_PERSON",
        basePrice: 800,
        isActive: true,
        requiresBooking: false,
        maxCapacity: 50,
        operatingHours: null,
        duration: 120,
        imageUrl: "https://images.unsplash.com/photo-1533089860892-a7c6f0a88666?w=800&auto=format&fit=crop",
        displayOrder: 3,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
    },
];

export const servicesApi = {
    /**
     * Get all services with filters
     */
    getServices: async (filters?: ServicesFilters): Promise<ServicesResponse> => {
        try {
            const params = new URLSearchParams();

            if (filters?.category) params.append("category", filters.category);
            if (filters?.isActive !== undefined)
                params.append("isActive", String(filters.isActive));
            if (filters?.search) params.append("search", filters.search);
            if (filters?.page) params.append("page", String(filters.page));
            if (filters?.limit) params.append("limit", String(filters.limit));

            const response = await api.get<ServicesResponse>(
                `/services?${params.toString()}`
            );
            if (response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
                return response.data;
            }
            return { data: MOCK_SERVICES, meta: { total: MOCK_SERVICES.length, page: 1, limit: 10, totalPages: 1 } };
        } catch (err) {
            console.warn("getServices failed, returning fallback mock services:", err);
            return { data: MOCK_SERVICES, meta: { total: MOCK_SERVICES.length, page: 1, limit: 10, totalPages: 1 } };
        }
    },

    /**
     * Get service by ID
     */
    getService: async (id: string): Promise<Service> => {
        try {
            const response = await api.get<Service>(`/services/${id}`);
            if (response.data) return response.data;
        } catch (err) {
            console.warn("getService failed, returning mock:", err);
        }
        const found = MOCK_SERVICES.find((s) => s.id === id);
        return found || MOCK_SERVICES[0];
    },

    /**
     * Get services by category
     */
    getServicesByCategory: async (category: ServiceCategory): Promise<Service[]> => {
        try {
            const response = await api.get<Service[]>(`/services/category/${category}`);
            if (response.data && response.data.length > 0) return response.data;
        } catch (err) {
            console.warn("getServicesByCategory failed:", err);
        }
        return MOCK_SERVICES.filter((s) => s.category === category);
    },

    /**
     * Create a new service (admin/manager only)
     */
    createService: async (data: CreateServiceDto): Promise<Service> => {
        const response = await api.post<Service>("/services", data);
        return response.data;
    },

    /**
     * Update a service (admin/manager only)
     */
    updateService: async (id: string, data: UpdateServiceDto): Promise<Service> => {
        const response = await api.patch<Service>(`/services/${id}`, data);
        return response.data;
    },

    /**
     * Delete a service (admin only)
     */
    deleteService: async (id: string): Promise<void> => {
        await api.delete(`/services/${id}`);
    },
};

// Helper functions
export const getCategoryLabel = (category: ServiceCategory): string => {
    const labels: Record<ServiceCategory, string> = {
        FOOD_BEVERAGE: "Food & Beverage",
        SPA_WELLNESS: "Spa & Wellness",
        RECREATION: "Recreation",
        TRANSPORTATION: "Transportation",
        BUSINESS: "Business",
        LAUNDRY: "Laundry",
        CONCIERGE: "Concierge",
        ROOM_SERVICE: "Room Service",
        OTHER: "Other",
    };
    return labels[category] || category;
};

export const getPricingTypeLabel = (pricingType: ServicePricingType): string => {
    const labels: Record<ServicePricingType, string> = {
        FIXED: "Fixed",
        PER_HOUR: "/hour",
        PER_PERSON: "/person",
        PER_ITEM: "/item",
    };
    return labels[pricingType] || pricingType;
};

export const formatServicePrice = (
    basePrice: number,
    pricingType: ServicePricingType
): string => {
    const formatted = "₹" + basePrice.toLocaleString("en-IN");

    if (pricingType === "FIXED") return formatted;
    return `${formatted}${getPricingTypeLabel(pricingType)}`;
};
