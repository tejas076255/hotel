import { Wifi, Tv, Wind, Coffee, Bath } from "lucide-react";
import { RoomStatus } from "@/types/room";

// Re-export types for convenience
export type { Room, RoomType, RoomStatus } from "@/types/room";

export const getStatusConfig = (status: RoomStatus) => {
    switch (status) {
        case "AVAILABLE":
            return {
                label: "Available",
                actionLabel: "Check-in",
                variant: "success",
                className: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
                borderColor: "border-l-green-500",
                textColor: "text-green-600",
                softBg: "bg-green-50 dark:bg-green-900/10",
                iconColor: "text-green-500"
            };
        case "OCCUPIED":
            return {
                label: "Occupied",
                actionLabel: "Checkout",
                variant: "destructive",
                className: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
                borderColor: "border-l-red-500",
                textColor: "text-red-600",
                softBg: "bg-red-50 dark:bg-red-900/10",
                iconColor: "text-red-500"
            };
        case "CLEANING":
            return {
                label: "Cleaning",
                actionLabel: "Done",
                variant: "warning",
                className: "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
                borderColor: "border-l-amber-500",
                textColor: "text-amber-600",
                softBg: "bg-amber-50 dark:bg-amber-900/10",
                iconColor: "text-amber-500"
            };
        case "MAINTENANCE":
            return {
                label: "Maintenance",
                actionLabel: "Done",
                variant: "warning",
                className: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400",
                borderColor: "border-l-orange-500",
                textColor: "text-orange-600",
                softBg: "bg-orange-50 dark:bg-orange-900/10",
                iconColor: "text-orange-500"
            };
        case "OUT_OF_ORDER":
            return {
                label: "Out of Order",
                actionLabel: "Repair",
                variant: "secondary",
                className: "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400",
                borderColor: "border-l-slate-500",
                textColor: "text-slate-600",
                softBg: "bg-slate-50 dark:bg-slate-900/10",
                iconColor: "text-slate-500"
            };
        default:
            return {
                label: status,
                actionLabel: "Details",
                variant: "default",
                className: "bg-slate-100 text-slate-700",
                borderColor: "border-l-slate-300",
                textColor: "text-slate-600",
                softBg: "bg-slate-50",
                iconColor: "text-slate-400"
            };
    }
};

export const getAmenityIcon = (amenity: string) => {
    const amenityLower = amenity.toLowerCase();
    if (amenityLower.includes("wifi")) return <Wifi className="h-4 w-4" />;
    if (amenityLower.includes("tv") || amenityLower.includes("television")) return <Tv className="h-4 w-4" />;
    if (amenityLower.includes("ac") || amenityLower.includes("air")) return <Wind className="h-4 w-4" />;
    if (amenityLower.includes("minibar") || amenityLower.includes("coffee")) return <Coffee className="h-4 w-4" />;
    if (amenityLower.includes("bath") || amenityLower.includes("tub")) return <Bath className="h-4 w-4" />;
    return null;
};

export const formatCurrency = (amount: number): string => {
    return "₹" + amount.toLocaleString("en-IN");
};

export const statusOptions: { value: RoomStatus; label: string }[] = [
    { value: "AVAILABLE", label: "Available" },
    { value: "OCCUPIED", label: "Occupied" },
    { value: "CLEANING", label: "Cleaning" },
    { value: "MAINTENANCE", label: "Maintenance" },
    { value: "OUT_OF_ORDER", label: "Out of Order" },
];
