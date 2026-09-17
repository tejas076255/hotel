import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seed...');

  // Create Roles
  console.log('📝 Creating roles...');
  const roles = await Promise.all([
    prisma.role.upsert({
      where: { name: 'ADMIN' },
      update: { description: 'System Administrator' },
      create: {
        name: 'ADMIN',
        description: 'System Administrator',
      },
    }),
    prisma.role.upsert({
      where: { name: 'MANAGER' },
      update: { description: 'Hotel Manager' },
      create: {
        name: 'MANAGER',
        description: 'Hotel Manager',
      },
    }),
    prisma.role.upsert({
      where: { name: 'RECEPTIONIST' },
      update: { description: 'Front Desk Receptionist' },
      create: {
        name: 'RECEPTIONIST',
        description: 'Front Desk Receptionist',
      },
    }),
    prisma.role.upsert({
      where: { name: 'HOUSEKEEPING' },
      update: { description: 'Housekeeping Staff' },
      create: {
        name: 'HOUSEKEEPING',
        description: 'Housekeeping Staff',
      },
    }),
    prisma.role.upsert({
      where: { name: 'GUEST' },
      update: { description: 'Hotel Guest' },
      create: {
        name: 'GUEST',
        description: 'Hotel Guest',
      },
    }),
  ]);

  console.log(`✅ Created ${roles.length} roles`);

  // Create Permissions
  console.log('📝 Creating permissions...');
  const permissionData = [
    // Booking permissions
    { action: 'create', resource: 'booking', slug: 'booking:create', description: 'Create booking' },
    { action: 'read', resource: 'booking', slug: 'booking:read', description: 'View bookings' },
    { action: 'update', resource: 'booking', slug: 'booking:update', description: 'Update booking' },
    { action: 'delete', resource: 'booking', slug: 'booking:delete', description: 'Cancel booking' },
    { action: 'manage', resource: 'booking', slug: 'booking:manage', description: 'Manage all bookings' },

    // Room permissions
    { action: 'create', resource: 'room', slug: 'room:create', description: 'Create room' },
    { action: 'read', resource: 'room', slug: 'room:read', description: 'View rooms' },
    { action: 'update', resource: 'room', slug: 'room:update', description: 'Update room' },
    { action: 'delete', resource: 'room', slug: 'room:delete', description: 'Delete room' },

    // User permissions
    { action: 'create', resource: 'user', slug: 'user:create', description: 'Create user' },
    { action: 'read', resource: 'user', slug: 'user:read', description: 'View users' },
    { action: 'update', resource: 'user', slug: 'user:update', description: 'Update user' },
    { action: 'delete', resource: 'user', slug: 'user:delete', description: 'Delete user' },

    // Price permissions
    { action: 'manage', resource: 'price', slug: 'price:manage', description: 'Manage room pricing' },

    // Report permissions
    { action: 'read', resource: 'report', slug: 'report:read', description: 'View reports & analytics' },
  ];

  const permissions = await Promise.all(
    permissionData.map((p) =>
      prisma.permission.upsert({
        where: { slug: p.slug },
        update: { description: p.description },
        create: p,
      }),
    ),
  );

  console.log(`✅ Created ${permissions.length} permissions`);

  // Assign permissions to roles
  console.log('📝 Assigning permissions to roles...');

  const adminRole = roles.find((r) => r.name === 'ADMIN');
  const managerRole = roles.find((r) => r.name === 'MANAGER');
  const receptionistRole = roles.find((r) => r.name === 'RECEPTIONIST');
  const housekeepingRole = roles.find((r) => r.name === 'HOUSEKEEPING');
  const guestRole = roles.find((r) => r.name === 'GUEST');

  // ADMIN: All permissions
  if (adminRole) {
    await Promise.all(
      permissions.map((p) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: adminRole.id,
              permissionId: p.id,
            },
          },
          update: {},
          create: {
            roleId: adminRole.id,
            permissionId: p.id,
          },
        }),
      ),
    );
  }

  // MANAGER: Manage bookings, rooms, prices, read reports
  if (managerRole) {
    const managerPermissions = permissions.filter((p) =>
      ['booking:manage', 'room:create', 'room:read', 'room:update', 'price:manage', 'report:read'].includes(p.slug),
    );
    await Promise.all(
      managerPermissions.map((p) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: managerRole.id,
              permissionId: p.id,
            },
          },
          update: {},
          create: {
            roleId: managerRole.id,
            permissionId: p.id,
          },
        }),
      ),
    );
  }

  // RECEPTIONIST: Manage bookings, read rooms
  if (receptionistRole) {
    const receptionistPermissions = permissions.filter((p) =>
      ['booking:create', 'booking:read', 'booking:update', 'booking:manage', 'room:read'].includes(p.slug),
    );
    await Promise.all(
      receptionistPermissions.map((p) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: receptionistRole.id,
              permissionId: p.id,
            },
          },
          update: {},
          create: {
            roleId: receptionistRole.id,
            permissionId: p.id,
          },
        }),
      ),
    );
  }

  // HOUSEKEEPING: Read rooms
  if (housekeepingRole) {
    const housekeepingPermissions = permissions.filter((p) =>
      ['room:read', 'room:update'].includes(p.slug),
    );
    await Promise.all(
      housekeepingPermissions.map((p) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: housekeepingRole.id,
              permissionId: p.id,
            },
          },
          update: {},
          create: {
            roleId: housekeepingRole.id,
            permissionId: p.id,
          },
        }),
      ),
    );
  }

  // GUEST: Create and read own bookings, read rooms
  if (guestRole) {
    const guestPermissions = permissions.filter((p) =>
      ['booking:create', 'booking:read', 'room:read'].includes(p.slug),
    );
    await Promise.all(
      guestPermissions.map((p) =>
        prisma.rolePermission.upsert({
          where: {
            roleId_permissionId: {
              roleId: guestRole.id,
              permissionId: p.id,
            },
          },
          update: {},
          create: {
            roleId: guestRole.id,
            permissionId: p.id,
          },
        }),
      ),
    );
  }

  console.log('✅ Assigned permissions to roles');

  // Create sample room types
  console.log('📝 Creating sample room types...');
  const roomTypes = await Promise.all([
    prisma.roomType.upsert({
      where: { name: 'Standard' },
      update: {
        description: 'Standard room with comfortable bedding and essential amenities.',
        basePrice: 2500,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Fridge'],
      },
      create: {
        name: 'Standard',
        slug: 'standard',
        description: 'Standard room with comfortable bedding and essential amenities.',
        basePrice: 2500,
        capacity: 2,
        bedType: 'SINGLE',
        size: 25,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Fridge'],
      },
    }),
    prisma.roomType.upsert({
      where: { name: 'Deluxe' },
      update: {
        description: 'Deluxe room with scenic city view and premium comfort.',
        basePrice: 4500,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Fridge', 'Balcony', 'Minibar'],
      },
      create: {
        name: 'Deluxe',
        slug: 'deluxe',
        description: 'Deluxe room with scenic city view and premium comfort.',
        basePrice: 4500,
        capacity: 2,
        bedType: 'QUEEN',
        size: 35,
        amenities: ['WiFi', 'TV', 'Air Conditioning', 'Mini Fridge', 'Balcony', 'Minibar'],
      },
    }),
    prisma.roomType.upsert({
      where: { name: 'Suite' },
      update: {
        description: 'Luxurious suite featuring a separate living room and master bathtub.',
        basePrice: 8500,
        amenities: [
          'WiFi',
          'TV',
          'Air Conditioning',
          'Mini Fridge',
          'Balcony',
          'Minibar',
          'Living Room',
          'Bathtub',
        ],
      },
      create: {
        name: 'Suite',
        slug: 'suite',
        description: 'Luxurious suite featuring a separate living room and master bathtub.',
        basePrice: 8500,
        capacity: 4,
        bedType: 'KING',
        size: 60,
        amenities: [
          'WiFi',
          'TV',
          'Air Conditioning',
          'Mini Fridge',
          'Balcony',
          'Minibar',
          'Living Room',
          'Bathtub',
        ],
      },
    }),
  ]);

  console.log(`✅ Created ${roomTypes.length} room types`);

  // Create room images for room types
  console.log('🖼️ Creating room images...');
  const roomImagesData = [
    {
      roomTypeId: roomTypes[0].id, // Standard
      url: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?q=80&w=1000',
      altText: 'Standard Room View',
      isPrimary: true,
      displayOrder: 1,
    },
    {
      roomTypeId: roomTypes[0].id,
      url: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?q=80&w=1000',
      altText: 'Standard Bathroom',
      isPrimary: false,
      displayOrder: 2,
    },
    {
      roomTypeId: roomTypes[1].id, // Deluxe
      url: 'https://images.unsplash.com/photo-1590490360182-c33d57733427?q=80&w=1000',
      altText: 'Deluxe Queen Bed',
      isPrimary: true,
      displayOrder: 1,
    },
    {
      roomTypeId: roomTypes[1].id,
      url: 'https://images.unsplash.com/photo-1591088398332-8a7791972843?q=80&w=1000',
      altText: 'Deluxe Balcony & Seating',
      isPrimary: false,
      displayOrder: 2,
    },
    {
      roomTypeId: roomTypes[2].id, // Suite
      url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1000',
      altText: 'Presidential Suite Bedroom',
      isPrimary: true,
      displayOrder: 1,
    },
    {
      roomTypeId: roomTypes[2].id,
      url: 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?q=80&w=1000',
      altText: 'Suite Living Area & Bathtub',
      isPrimary: false,
      displayOrder: 2,
    },
  ];

  await Promise.all(
    roomImagesData.map((img) =>
      prisma.roomImage.create({
        data: img,
      }),
    ),
  );
  console.log(`✅ Created ${roomImagesData.length} room images`);

  // Create sample rooms
  console.log('📝 Creating sample rooms...');
  const standardType = roomTypes[0];
  const deluxeType = roomTypes[1];
  const suiteType = roomTypes[2];

  const rooms: Promise<any>[] = [];

  // Create 5 standard rooms (floor 1)
  for (let i = 1; i <= 5; i++) {
    rooms.push(
      prisma.room.upsert({
        where: { roomNumber: `10${i}` },
        update: {},
        create: {
          roomNumber: `10${i}`,
          floor: 1,
          status: 'AVAILABLE',
          typeId: standardType.id,
        },
      }),
    );
  }

  // Create 5 deluxe rooms (floor 2)
  for (let i = 1; i <= 5; i++) {
    rooms.push(
      prisma.room.upsert({
        where: { roomNumber: `20${i}` },
        update: {},
        create: {
          roomNumber: `20${i}`,
          floor: 2,
          status: 'AVAILABLE',
          typeId: deluxeType.id,
        },
      }),
    );
  }

  // Create 3 suite rooms (floor 3)
  for (let i = 1; i <= 3; i++) {
    rooms.push(
      prisma.room.upsert({
        where: { roomNumber: `30${i}` },
        update: {},
        create: {
          roomNumber: `30${i}`,
          floor: 3,
          status: 'AVAILABLE',
          typeId: suiteType.id,
        },
      }),
    );
  }

  await Promise.all(rooms);
  console.log(`Created ${rooms.length} rooms`);

  // Create Admin & Guest Users
  console.log('📝 Creating demo users...');

  if (adminRole) {
    const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);

    await prisma.user.upsert({
      where: { email: 'admin@stayzy.com' },
      update: {
        password: hashedAdminPassword,
        roleId: adminRole.id,
      },
      create: {
        email: 'admin@stayzy.com',
        password: hashedAdminPassword,
        fullName: 'Stayzy Admin',
        phone: '+1234567890',
        roleId: adminRole.id,
        status: 'ACTIVE',
      },
    });
  }

  if (guestRole) {
    const hashedUserPassword = await bcrypt.hash('User@123', 10);

    await prisma.user.upsert({
      where: { email: 'user@stayzy.com' },
      update: {
        password: hashedUserPassword,
        roleId: guestRole.id,
      },
      create: {
        email: 'user@stayzy.com',
        password: hashedUserPassword,
        fullName: 'Demo Guest User',
        phone: '+1987654321',
        roleId: guestRole.id,
        status: 'ACTIVE',
      },
    });
  }

  // Create Sample Services
  console.log('📝 Creating sample services...');

  const services = await Promise.all([
    // Food & Beverage
    prisma.service.upsert({
      where: { slug: 'breakfast-buffet' },
      update: {
        name: 'Breakfast Buffet',
        description: 'Rich international breakfast buffet with live cooking stations',
      },
      create: {
        name: 'Breakfast Buffet',
        slug: 'breakfast-buffet',
        description: 'Rich international breakfast buffet with live cooking stations',
        category: 'FOOD_BEVERAGE',
        pricingType: 'PER_PERSON',
        basePrice: 15,
        isActive: true,
        requiresBooking: false,
        operatingHours: {
          monday: { open: '06:00', close: '10:00' },
          tuesday: { open: '06:00', close: '10:00' },
          wednesday: { open: '06:00', close: '10:00' },
          thursday: { open: '06:00', close: '10:00' },
          friday: { open: '06:00', close: '10:00' },
          saturday: { open: '06:00', close: '11:00' },
          sunday: { open: '06:00', close: '11:00' },
        },
        displayOrder: 1,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'room-service-coffee' },
      update: {
        name: 'In-Room Coffee & Tea',
        description: 'Artisanal coffee and fine teas delivered to your room',
      },
      create: {
        name: 'In-Room Coffee & Tea',
        slug: 'room-service-coffee',
        description: 'Artisanal coffee and fine teas delivered to your room',
        category: 'ROOM_SERVICE',
        pricingType: 'PER_ITEM',
        basePrice: 5,
        isActive: true,
        requiresBooking: false,
        operatingHours: {
          monday: { open: '06:00', close: '23:00' },
          tuesday: { open: '06:00', close: '23:00' },
          wednesday: { open: '06:00', close: '23:00' },
          thursday: { open: '06:00', close: '23:00' },
          friday: { open: '06:00', close: '23:00' },
          saturday: { open: '06:00', close: '23:00' },
          sunday: { open: '06:00', close: '23:00' },
        },
        displayOrder: 2,
      },
    }),

    // Spa & Wellness
    prisma.service.upsert({
      where: { slug: 'massage-60min' },
      update: {
        name: 'Relaxing Aromatherapy Massage (60 mins)',
        description: 'Full body aromatherapy massage with organic essential oils',
      },
      create: {
        name: 'Relaxing Aromatherapy Massage (60 mins)',
        slug: 'massage-60min',
        description: 'Full body aromatherapy massage with organic essential oils',
        category: 'SPA_WELLNESS',
        pricingType: 'FIXED',
        basePrice: 50,
        isActive: true,
        requiresBooking: true,
        maxCapacity: 4,
        duration: 60,
        operatingHours: {
          monday: { open: '09:00', close: '21:00' },
          tuesday: { open: '09:00', close: '21:00' },
          wednesday: { open: '09:00', close: '21:00' },
          thursday: { open: '09:00', close: '21:00' },
          friday: { open: '09:00', close: '22:00' },
          saturday: { open: '09:00', close: '22:00' },
          sunday: { open: '09:00', close: '21:00' },
        },
        displayOrder: 3,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'spa-package' },
      update: {
        name: 'Premium Spa Package (90 mins)',
        description: 'Comprehensive package: Full body massage + Facial care + Herbal bath',
      },
      create: {
        name: 'Premium Spa Package (90 mins)',
        slug: 'spa-package',
        description: 'Comprehensive package: Full body massage + Facial care + Herbal bath',
        category: 'SPA_WELLNESS',
        pricingType: 'FIXED',
        basePrice: 80,
        isActive: true,
        requiresBooking: true,
        maxCapacity: 2,
        duration: 90,
        operatingHours: {
          monday: { open: '10:00', close: '20:00' },
          tuesday: { open: '10:00', close: '20:00' },
          wednesday: { open: '10:00', close: '20:00' },
          thursday: { open: '10:00', close: '20:00' },
          friday: { open: '10:00', close: '20:00' },
          saturday: { open: '10:00', close: '20:00' },
          sunday: { open: '10:00', close: '20:00' },
        },
        displayOrder: 4,
      },
    }),

    // Recreation
    prisma.service.upsert({
      where: { slug: 'gym-access' },
      update: {
        name: 'Fitness Center Access',
        description: '24/7 access to fully equipped fitness gym',
      },
      create: {
        name: 'Fitness Center Access',
        slug: 'gym-access',
        description: '24/7 access to fully equipped fitness gym',
        category: 'RECREATION',
        pricingType: 'PER_HOUR',
        basePrice: 10,
        isActive: true,
        requiresBooking: false,
        maxCapacity: 10,
        operatingHours: {
          monday: { open: '05:00', close: '22:00' },
          tuesday: { open: '05:00', close: '22:00' },
          wednesday: { open: '05:00', close: '22:00' },
          thursday: { open: '05:00', close: '22:00' },
          friday: { open: '05:00', close: '22:00' },
          saturday: { open: '06:00', close: '22:00' },
          sunday: { open: '06:00', close: '22:00' },
        },
        displayOrder: 5,
      },
    }),
    prisma.service.upsert({
      where: { slug: 'pool-access' },
      update: {
        name: 'Infinity Pool Access',
        description: 'Rooftop infinity pool with panoramic city views',
      },
      create: {
        name: 'Infinity Pool Access',
        slug: 'pool-access',
        description: 'Rooftop infinity pool with panoramic city views',
        category: 'RECREATION',
        pricingType: 'FIXED',
        basePrice: 20,
        isActive: true,
        requiresBooking: false,
        maxCapacity: 30,
        operatingHours: {
          monday: { open: '06:00', close: '20:00' },
          tuesday: { open: '06:00', close: '20:00' },
          wednesday: { open: '06:00', close: '20:00' },
          thursday: { open: '06:00', close: '20:00' },
          friday: { open: '06:00', close: '21:00' },
          saturday: { open: '06:00', close: '21:00' },
          sunday: { open: '06:00', close: '21:00' },
        },
        displayOrder: 6,
      },
    }),

    // Transportation
    prisma.service.upsert({
      where: { slug: 'airport-pickup' },
      update: {
        name: 'Airport Transfer Service',
        description: 'Private luxury sedan transfer to and from the airport',
      },
      create: {
        name: 'Airport Transfer Service',
        slug: 'airport-pickup',
        description: 'Private luxury sedan transfer to and from the airport',
        category: 'TRANSPORTATION',
        pricingType: 'FIXED',
        basePrice: 30,
        isActive: true,
        requiresBooking: true,
        operatingHours: {
          monday: { open: '00:00', close: '23:59' },
          tuesday: { open: '00:00', close: '23:59' },
          wednesday: { open: '00:00', close: '23:59' },
          thursday: { open: '00:00', close: '23:59' },
          friday: { open: '00:00', close: '23:59' },
          saturday: { open: '00:00', close: '23:59' },
          sunday: { open: '00:00', close: '23:59' },
        },
        displayOrder: 7,
      },
    }),

    // Laundry
    prisma.service.upsert({
      where: { slug: 'laundry-service' },
      update: {
        name: 'Express Laundry Service',
        description: 'Same-day washing, dry cleaning, and pressing service',
      },
      create: {
        name: 'Express Laundry Service',
        slug: 'laundry-service',
        description: 'Same-day washing, dry cleaning, and pressing service',
        category: 'LAUNDRY',
        pricingType: 'PER_ITEM',
        basePrice: 3,
        isActive: true,
        requiresBooking: false,
        operatingHours: {
          monday: { open: '08:00', close: '18:00' },
          tuesday: { open: '08:00', close: '18:00' },
          wednesday: { open: '08:00', close: '18:00' },
          thursday: { open: '08:00', close: '18:00' },
          friday: { open: '08:00', close: '18:00' },
          saturday: { open: '08:00', close: '17:00' },
          sunday: { isClosed: true },
        },
        displayOrder: 8,
      },
    }),

    // Business
    prisma.service.upsert({
      where: { slug: 'meeting-room' },
      update: {
        name: 'Executive Meeting Room',
        description: 'Executive conference room equipped with 4K projector and video conferencing',
      },
      create: {
        name: 'Executive Meeting Room',
        slug: 'meeting-room',
        description: 'Executive conference room equipped with 4K projector and video conferencing',
        category: 'BUSINESS',
        pricingType: 'PER_HOUR',
        basePrice: 25,
        isActive: true,
        requiresBooking: true,
        maxCapacity: 12,
        operatingHours: {
          monday: { open: '08:00', close: '18:00' },
          tuesday: { open: '08:00', close: '18:00' },
          wednesday: { open: '08:00', close: '18:00' },
          thursday: { open: '08:00', close: '18:00' },
          friday: { open: '08:00', close: '18:00' },
          saturday: { isClosed: true },
          sunday: { isClosed: true },
        },
        displayOrder: 9,
      },
    }),
  ]);

  console.log(`✅ Created ${services.length} sample services`);

  console.log(' Seed completed successfully!');
}

main()
  .catch((e) => {
    console.error(' Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
