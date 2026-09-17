"use client";

import { Button } from "@/components/ui/button";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Loader2 } from "lucide-react";
import { Room } from "@/types/room";

interface DeleteRoomDialogProps {
    room: Room | null;
    isDeleting?: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export function DeleteRoomDialog({
    room,
    isDeleting,
    onClose,
    onConfirm,
}: DeleteRoomDialogProps) {
    return (
        <AlertDialog open={!!room} onOpenChange={onClose}>
            <AlertDialogContent className="rounded-2xl">
                <AlertDialogHeader>
                    <AlertDialogTitle>Delete Room?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to delete room "{room?.roomNumber}"? This action cannot be undone.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel className="rounded-xl" disabled={isDeleting}>
                        Cancel
                    </AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className="rounded-xl bg-red-600 hover:bg-red-700 text-white"
                        disabled={isDeleting}
                    >
                        {isDeleting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}
