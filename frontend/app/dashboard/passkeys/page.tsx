'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Fingerprint, Trash2, Edit2, Plus, Loader2, Smartphone, Laptop } from 'lucide-react';
import {
  getPasskeyCredentials,
  removePasskeyCredential,
  updatePasskeyCredential,
  type PasskeyCredential,
} from '@/services/passkey.api';
import PasskeyRegistrationDialog from '@/components/features/passkey/PasskeyRegistrationDialog';
import { formatDistanceToNow } from 'date-fns';

export default function PasskeysPage() {
  const [credentials, setCredentials] = useState<PasskeyCredential[]>([]);
  const [loading, setLoading] = useState(true);
  const [showRegisterDialog, setShowRegisterDialog] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedCredential, setSelectedCredential] = useState<PasskeyCredential | null>(null);
  const [newDeviceName, setNewDeviceName] = useState('');
  const [actionLoading, setActionLoading] = useState(false);

  useEffect(() => {
    loadCredentials();
  }, []);

  const loadCredentials = async () => {
    try {
      setLoading(true);
      const data = await getPasskeyCredentials();
      setCredentials(data);
    } catch (error: any) {
      console.error('Error loading passkeys:', error);
      toast.error('Failed to load passkeys list');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedCredential) return;

    try {
      setActionLoading(true);
      await removePasskeyCredential(selectedCredential.id);
      toast.success('Passkey deleted');
      setDeleteDialogOpen(false);
      setSelectedCredential(null);
      loadCredentials();
    } catch (error: any) {
      console.error('Error deleting passkey:', error);
      toast.error(error.response?.data?.message || 'Failed to delete passkey');
    } finally {
      setActionLoading(false);
    }
  };

  const handleUpdate = async () => {
    if (!selectedCredential || !newDeviceName.trim()) return;

    try {
      setActionLoading(true);
      await updatePasskeyCredential(selectedCredential.id, newDeviceName);
      toast.success('Device name updated');
      setEditDialogOpen(false);
      setSelectedCredential(null);
      setNewDeviceName('');
      loadCredentials();
    } catch (error: any) {
      console.error('Error updating passkey:', error);
      toast.error('Failed to update device name');
    } finally {
      setActionLoading(false);
    }
  };

  const openDeleteDialog = (credential: PasskeyCredential) => {
    setSelectedCredential(credential);
    setDeleteDialogOpen(true);
  };

  const openEditDialog = (credential: PasskeyCredential) => {
    setSelectedCredential(credential);
    setNewDeviceName(credential.deviceName || '');
    setEditDialogOpen(true);
  };

  const getDeviceIcon = (transports: string[]) => {
    if (transports.includes('internal') || transports.includes('hybrid')) {
      return <Smartphone className="h-5 w-5" />;
    }
    return <Laptop className="h-5 w-5" />;
  };

  return (
    <div className="container mx-auto py-10">
      <div className="max-w-4xl mx-auto space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Passkey Management</h1>
          <p className="text-muted-foreground mt-2">
            Manage your passkeys for fast and secure login
          </p>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Fingerprint className="h-5 w-5" />
                  Your Passkeys
                </CardTitle>
                <CardDescription className="mt-2">
                  You have {credentials.length} registered passkeys
                </CardDescription>
              </div>
              <Button onClick={() => setShowRegisterDialog(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Add Passkey
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : credentials.length === 0 ? (
              <div className="text-center py-8">
                <Fingerprint className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                <h3 className="text-lg font-semibold">No passkeys yet</h3>
                <p className="text-sm text-muted-foreground mt-2 mb-4">
                  Add a passkey to sign in faster with biometrics
                </p>
                <Button onClick={() => setShowRegisterDialog(true)}>
                  <Plus className="mr-2 h-4 w-4" />
                  Register First Passkey
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {credentials.map((credential) => (
                  <div
                    key={credential.id}
                    className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-primary/10 rounded-full">
                        {getDeviceIcon(credential.transports)}
                      </div>
                      <div>
                        <p className="font-medium">
                          {credential.deviceName || 'Unknown device'}
                        </p>
                        <div className="flex items-center gap-2 mt-1">
                          <p className="text-sm text-muted-foreground">
                            Registered {formatDistanceToNow(new Date(credential.createdAt), { addSuffix: true })}
                          </p>
                          {credential.lastUsedAt && (
                            <>
                              <span className="text-muted-foreground">•</span>
                              <p className="text-sm text-muted-foreground">
                                Last used {formatDistanceToNow(new Date(credential.lastUsedAt), { addSuffix: true })}
                              </p>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openEditDialog(credential)}
                      >
                        <Edit2 className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => openDeleteDialog(credential)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Passkeys</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">What is a Passkey?</h4>
              <p className="text-sm text-muted-foreground">
                A passkey is a modern authentication method using biometrics (fingerprint, face recognition) 
                or device PIN instead of traditional passwords.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Why use Passkeys?</h4>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                <li>Safer than passwords - immune to phishing and leaks</li>
                <li>Faster sign in - just use your biometric scanner</li>
                <li>No need to remember complex passwords</li>
                <li>Works across multiple devices</li>
              </ul>
            </div>
            <div>
              <h4 className="font-medium mb-2">Supported Devices</h4>
              <p className="text-sm text-muted-foreground">
                Face ID, Touch ID (iOS/macOS), Windows Hello, Android biometrics, 
                and hardware security keys (YubiKey, Titan Security Key).
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <PasskeyRegistrationDialog
        open={showRegisterDialog}
        onOpenChange={setShowRegisterDialog}
        onSuccess={loadCredentials}
      />

      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Delete Passkey</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete passkey "{selectedCredential?.deviceName || 'this item'}"? 
              You will no longer be able to sign in with this passkey.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              disabled={actionLoading}
              className="bg-destructive hover:bg-destructive/90 text-white"
            >
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Rename Device</AlertDialogTitle>
            <AlertDialogDescription>
              Set a new name for this passkey to easily identify it
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="py-4">
            <Label htmlFor="newDeviceName">Device Name</Label>
            <Input
              id="newDeviceName"
              value={newDeviceName}
              onChange={(e) => setNewDeviceName(e.target.value)}
              placeholder="e.g. iPhone 13, MacBook Pro"
              className="mt-2"
            />
          </div>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={actionLoading}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleUpdate} disabled={actionLoading || !newDeviceName.trim()}>
              {actionLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                'Save'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
