import { Button } from "@/components/ui/button";
import { LogIn, User, LogOut, Calendar, Settings } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface ClientNavbarProps {
    onBookingClick?: () => void;
    currentPage?: "home" | "rooms" | "bookings" | "profile";
}

export function ClientNavbar({ onBookingClick, currentPage = "home" }: ClientNavbarProps) {
    return null;
}