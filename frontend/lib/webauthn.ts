/**
 * WebAuthn Helper Functions
 * Handles browser-side WebAuthn operations for passkey authentication
 */

// Check if browser supports WebAuthn
export const isWebAuthnSupported = (): boolean => {
  return (
    window?.PublicKeyCredential !== undefined &&
    navigator?.credentials !== undefined
  );
};

// Check if platform authenticator is available (Face ID, Touch ID, Windows Hello)
export const isPlatformAuthenticatorAvailable = async (): Promise<boolean> => {
  if (!isWebAuthnSupported()) return false;
  
  try {
    return await PublicKeyCredential.isUserVerifyingPlatformAuthenticatorAvailable();
  } catch (error) {
    console.error('Error checking platform authenticator:', error);
    return false;
  }
};

/**
 * Convert base64url string to Uint8Array
 */
export const base64urlToUint8Array = (base64url: string): Uint8Array => {
  // Add padding if needed
  const padding = '='.repeat((4 - (base64url.length % 4)) % 4);
  const base64 = (base64url + padding).replace(/-/g, '+').replace(/_/g, '/');
  
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);
  
  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }
  return outputArray;
};

/**
 * Convert Uint8Array to base64url string
 */
export const uint8ArrayToBase64url = (buffer: Uint8Array): string => {
  const base64 = window.btoa(String.fromCharCode(...buffer));
  return base64.replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

/**
 * Start passkey registration
 */
export const startPasskeyRegistration = async (options: any): Promise<any> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn is not supported on this browser');
  }

  // Convert base64url strings to Uint8Array
  const publicKeyCredentialCreationOptions: PublicKeyCredentialCreationOptions = {
    challenge: base64urlToUint8Array(options.challenge) as unknown as BufferSource,
    rp: options.rp,
    user: {
      id: base64urlToUint8Array(options.user.id) as unknown as BufferSource,
      name: options.user.name,
      displayName: options.user.displayName,
    },
    pubKeyCredParams: options.pubKeyCredParams,
    timeout: options.timeout,
    attestation: options.attestation,
    authenticatorSelection: options.authenticatorSelection,
    excludeCredentials: options.excludeCredentials?.map((cred: any) => ({
      ...cred,
      id: base64urlToUint8Array(cred.id) as unknown as BufferSource,
    })),
  };

  try {
    const credential = await navigator.credentials.create({
      publicKey: publicKeyCredentialCreationOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Failed to create passkey');
    }

    // Get the response
    const response = credential.response as AuthenticatorAttestationResponse;

    // Convert ArrayBuffers to base64url strings
    return {
      id: credential.id,
      rawId: uint8ArrayToBase64url(new Uint8Array(credential.rawId)),
      response: {
        clientDataJSON: uint8ArrayToBase64url(new Uint8Array(response.clientDataJSON)),
        attestationObject: uint8ArrayToBase64url(new Uint8Array(response.attestationObject)),
        transports: response.getTransports ? response.getTransports() : [],
      },
      type: credential.type,
      clientExtensionResults: credential.getClientExtensionResults(),
      authenticatorAttachment: (credential as any).authenticatorAttachment,
    };
  } catch (error: any) {
    if (error.name === 'NotAllowedError') {
      throw new Error('Passkey registration cancelled by user');
    } else if (error.name === 'InvalidStateError') {
      throw new Error('This passkey has already been registered');
    } else {
      throw new Error(`Passkey registration error: ${error.message}`);
    }
  }
};

/**
 * Start passkey authentication
 */
export const startPasskeyAuthentication = async (options: any): Promise<any> => {
  if (!isWebAuthnSupported()) {
    throw new Error('WebAuthn is not supported on this browser');
  }

  // Convert base64url strings to Uint8Array
  const publicKeyCredentialRequestOptions: PublicKeyCredentialRequestOptions = {
    challenge: base64urlToUint8Array(options.challenge) as unknown as BufferSource,
    timeout: options.timeout,
    rpId: options.rpId,
    allowCredentials: options.allowCredentials?.map((cred: any) => ({
      type: 'public-key' as PublicKeyCredentialType,
      id: base64urlToUint8Array(cred.id) as unknown as BufferSource,
      transports: cred.transports as AuthenticatorTransport[],
    })),
    userVerification: options.userVerification,
  };

  try {
    const credential = await navigator.credentials.get({
      publicKey: publicKeyCredentialRequestOptions,
    }) as PublicKeyCredential;

    if (!credential) {
      throw new Error('Failed to authenticate with passkey');
    }

    // Get the response
    const response = credential.response as AuthenticatorAssertionResponse;

    // Convert ArrayBuffers to base64url strings
    return {
      id: credential.id,
      rawId: uint8ArrayToBase64url(new Uint8Array(credential.rawId)),
      response: {
        clientDataJSON: uint8ArrayToBase64url(new Uint8Array(response.clientDataJSON)),
        authenticatorData: uint8ArrayToBase64url(new Uint8Array(response.authenticatorData)),
        signature: uint8ArrayToBase64url(new Uint8Array(response.signature)),
        userHandle: response.userHandle
          ? uint8ArrayToBase64url(new Uint8Array(response.userHandle))
          : undefined,
      },
      type: credential.type,
      clientExtensionResults: credential.getClientExtensionResults(),
      authenticatorAttachment: (credential as any).authenticatorAttachment,
    };
  } catch (error: any) {
    if (error.name === 'NotAllowedError') {
      throw new Error('User cancelled authentication');
    } else {
      throw new Error(`Passkey authentication error: ${error.message}`);
    }
  }
};
