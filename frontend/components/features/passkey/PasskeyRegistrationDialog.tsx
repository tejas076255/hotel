'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Loader2, Fingerprint } from 'lucide-react';
import { registerPasskeyBegin, registerPasskeyComplete } from '@/services/passkey.api';
import { startPasskeyRegistration, isWebAuthnSupported } from '@/lib/webauthn';

interface PasskeyRegistrationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function PasskeyRegistrationDialog({
  open,
  onOpenChange,
  onSuccess,
}: PasskeyRegistrationDialogProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [deviceName, setDeviceName] = useState('');

  const handleRegister = async () => {
    if (!isWebAuthnSupported()) {
      toast.error('Your browser does not support Passkeys');
      return;
    }

    setLoading(true);
    try {
      // Step 1: Get registration options from server
      const options = await registerPasskeyBegin(deviceName || undefined);

      // Step 2: Start WebAuthn registration
      const credential = await startPasskeyRegistration(options);

      // Step 3: Complete registration on server
      const result = await registerPasskeyComplete(credential, deviceName || undefined);

      toast.success(result.message || 'Passkey registered successfully!');
      onOpenChange(false);
      setDeviceName('');
      onSuccess?.();
    } catch (error: any) {
      console.error('Passkey registration error:', error);
      toast.error(error.message || 'Failed to register passkey. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Fingerprint className="h-5 w-5" />
            Register Passkey
          </DialogTitle>
          <DialogDescription>
            Set up a passkey to sign in faster with Face ID, Touch ID, or Windows Hello.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="deviceName">Device Name (optional)</Label>
            <Input
              id="deviceName"
              placeholder="e.g. MacBook Pro, iPhone 13"
              value={deviceName}
              onChange={(e) => setDeviceName(e.target.value)}
              disabled={loading}
            />
            <p className="text-sm text-muted-foreground">
              Give a name to easily identify this device later
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button onClick={handleRegister} disabled={loading}>
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              <>
                <Fingerprint className="mr-2 h-4 w-4" />
                Register Passkey
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
