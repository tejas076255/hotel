"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2 } from "lucide-react";
import { RoomType, RoomStatus } from "@/types/room";
import { statusOptions } from "./room-utils";

export interface NewRoomData {
    roomNumber: string;
    floor: string;
    typeId: string;
    status: RoomStatus;
    notes: string;
}

interface AddRoomDialogProps {
    isOpen: boolean;
    newRoom: NewRoomData;
    roomTypes: RoomType[];
    isSubmitting?: boolean;
    onOpenChange: (open: boolean) => void;
    onNewRoomChange: (data: NewRoomData) => void;
    onSubmit: () => void;
}

export function AddRoomDialog({
    isOpen,
    newRoom,
    roomTypes,
    isSubmitting,
    onOpenChange,
    onNewRoomChange,
    onSubmit,
}: AddRoomDialogProps) {
    return (
        <Dialog open={isOpen} onOpenChange={onOpenChange}>
            <DialogTrigger asChild>
                <Button className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30">
                    <Plus className="h-4 w-4 mr-2" />
                    Add New Room
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-md rounded-2xl">
                <DialogHeader>
                    <DialogTitle>Add New Room</DialogTitle>
                    <DialogDescription>Enter room details to create a new room</DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="roomNumber">Room Number *</Label>
                            <Input
                                id="roomNumber"
                                placeholder="e.g. 101"
                                className="rounded-xl"
                                value={newRoom.roomNumber}
                                onChange={(e) =>
                                    onNewRoomChange({ ...newRoom, roomNumber: e.target.value })
                                }
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="floor">Floor *</Label>
                            <Input
                                id="floor"
                                type="number"
                                placeholder="e.g. 1"
                                className="rounded-xl"
                                value={newRoom.floor}
                                onChange={(e) =>
                                    onNewRoomChange({ ...newRoom, floor: e.target.value })
                                }
                            />
                        </div>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="type">Room Type *</Label>
                        <Select
                            value={newRoom.typeId}
                            onValueChange={(value) =>
                                onNewRoomChange({ ...newRoom, typeId: value })
                            }
                        >
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select room type" />
                            </SelectTrigger>
                            <SelectContent>
                                {roomTypes.map((type) => (
                                    <SelectItem key={type.id} value={type.id}>
                                        {type.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="status">Status</Label>
                        <Select
                            value={newRoom.status}
                            onValueChange={(value) =>
                                onNewRoomChange({ ...newRoom, status: value as RoomStatus })
                            }
                        >
                            <SelectTrigger className="rounded-xl">
                                <SelectValue placeholder="Select status" />
                            </SelectTrigger>
                            <SelectContent>
                                {statusOptions.map((opt) => (
                                    <SelectItem key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="notes">Notes</Label>
                        <Textarea
                            id="notes"
                            placeholder="Notes about room..."
                            className="rounded-xl resize-none"
                            rows={2}
                            value={newRoom.notes}
                            onChange={(e) =>
                                onNewRoomChange({ ...newRoom, notes: e.target.value })
                            }
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="rounded-xl"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={onSubmit}
                        className="rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white"
                        disabled={!newRoom.roomNumber || !newRoom.floor || !newRoom.typeId || isSubmitting}
                    >
                        {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Add Room
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
