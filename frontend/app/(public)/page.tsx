"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { SearchBar } from "@/components/features/search-bar";
import { DestinationCard } from "@/components/features/destination-card";
import { TestimonialCard } from "@/components/features/testimonial-card";
import { AmenityIcon } from "@/components/features/amenity-icon";
import { NewsletterForm } from "@/components/features/newsletter-form";
import {
    Shield,
    Star,
    Clock,
    Headphones,
    Wifi,
    Car,
    UtensilsCrossed,
    Dumbbell,
    Sparkles,
    Coffee,
    Waves,
    ConciergeBell,
    MapPin,
    Bed,
    Bath,
    Users,
    ArrowRight,
    ChevronRight,
} from "lucide-react";

// ============================================
// DATA CONSTANTS
// ============================================

const FEATURES = [
    {
        icon: Shield,
        title: "Best Rate Guarantee",
        description: "Best market rates guaranteed. Price match refund if you find a lower rate.",
    },
    {
        icon: Star,
        title: "High Quality Rooms",
        description: "Every room is thoroughly inspected to ensure top cleanliness and luxury.",
    },
    {
        icon: Clock,
        title: "Instant Booking",
        description: "Get instant booking confirmation with zero waiting time.",
    },
    {
        icon: Headphones,
        title: "24/7 Concierge Support",
        description: "Our dedicated support team is available 24/7 to assist you anytime.",
    },
];

const DESTINATIONS = [
    {
        name: "Miami Beach",
        image: "https://images.unsplash.com/photo-1559592413-7cec4d0cae2b?w=800&auto=format&fit=crop",
        properties: 120,
        featured: true,
    },
    {
        name: "New York City",
        image: "https://images.unsplash.com/photo-1536323760109-ca8c07450053?w=800&auto=format&fit=crop",
        properties: 85,
        featured: false,
    },
    {
        name: "Los Angeles",
        image: "https://images.unsplash.com/photo-1573790387438-4da905039392?w=800&auto=format&fit=crop",
        properties: 95,
        featured: true,
    },
    {
        name: "Honolulu",
        image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&auto=format&fit=crop",
        properties: 78,
        featured: false,
    },
    {
        name: "Chicago",
        image: "https://images.unsplash.com/photo-1509030450996-dd1a26dda07a?w=800&auto=format&fit=crop",
        properties: 150,
        featured: false,
    },
    {
        name: "Aspen Resort",
        image: "https://images.unsplash.com/photo-1584003564911-a5e0e9a89f63?w=800&auto=format&fit=crop",
        properties: 45,
        featured: false,
    },
];

const FEATURED_ROOMS = [
    {
        name: "Oceanfront Deluxe Room",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?w=800&auto=format&fit=crop",
        price: 250,
        rating: 4.9,
        reviews: 234,
        beds: 2,
        baths: 1,
        guests: 4,
    },
    {
        name: "Presidential Royal Suite",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&auto=format&fit=crop",
        price: 450,
        rating: 5.0,
        reviews: 156,
        beds: 3,
        baths: 2,
        guests: 6,
    },
    {
        name: "Modern Standard Room",
        image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=800&auto=format&fit=crop",
        price: 120,
        rating: 4.7,
        reviews: 412,
        beds: 1,
        baths: 1,
        guests: 2,
    },
    {
        name: "Private Pool Luxury Villa",
        image: "https://images.unsplash.com/photo-1602002418082-a4443e081dd1?w=800&auto=format&fit=crop",
        price: 800,
        rating: 4.9,
        reviews: 89,
        beds: 4,
        baths: 3,
        guests: 8,
    },
];

const TESTIMONIALS = [
    {
        name: "Sarah Jenkins",
        location: "California, USA",
        rating: 5,
        comment: "Outstanding service! The room was spotless with breathtaking views. The staff was incredibly welcoming and thoughtful. Will definitely return!",
        date: "12/2025",
    },
    {
        name: "David Smith",
        location: "New York, USA",
        rating: 5,
        comment: "Booking via Stayzy was extremely fast and smooth. Great pricing and the room was exactly as described. Very satisfied!",
        date: "11/2025",
    },
    {
        name: "Emily Watson",
        location: "London, UK",
        rating: 4,
        comment: "Wonderful vacation experience for our family. Excellent amenities, delicious food. Highly recommended to everyone!",
        date: "01/2026",
    },
];

const AMENITIES = [
    { icon: Wifi, label: "Free High-Speed WiFi", description: "Ultra-fast connection" },
    { icon: Car, label: "Free Valet Parking", description: "24/7 Secure garage" },
    { icon: UtensilsCrossed, label: "Gourmet Restaurant", description: "International cuisine" },
    { icon: Dumbbell, label: "Fitness Gym", description: "Modern equipment" },
    { icon: Waves, label: "Infinity Pool", description: "Heated & Panoramic" },
    { icon: Sparkles, label: "Luxury Spa & Massage", description: "Pure relaxation" },
    { icon: Coffee, label: "Lounge Bar", description: "Cocktails & beverages" },
    { icon: ConciergeBell, label: "24/7 Room Service", description: "In-room dining" },
];

// ============================================
// HELPER FUNCTIONS
// ============================================

const formatPrice = (price: number) => {
    return "₹" + price.toLocaleString("en-IN");
};

// ============================================
// MAIN COMPONENT
// ============================================

export default function HomePage() {
    return (
        <div className="flex flex-col min-h-screen">
            {/* ==================== HERO SECTION ==================== */}
            <section className="relative min-h-[90vh] w-full flex items-center justify-center overflow-hidden">
                {/* Background Image */}
                <div
                    className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
                    style={{
                        backgroundImage: 'url("https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?q=80&w=2670&auto=format&fit=crop")',
                    }}
                >
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/70" />
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-72 h-72 bg-orange-500/20 rounded-full blur-3xl" />
                <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl" />

                {/* Hero Content */}
                <div className="relative z-10 w-full container mx-auto px-4 flex flex-col items-center gap-8 animate-in fade-in slide-in-from-bottom-10 duration-700">
                    {/* Badge */}
                    <div className="inline-flex items-center px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white text-sm">
                        <Sparkles className="w-4 h-4 mr-2 text-amber-400" />
                        Discover Extraordinary Stays
                    </div>

                    {/* Main Heading */}
                    <div className="text-center space-y-4 max-w-4xl">
                        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight">
                            Experience Your{" "}
                            <span className="bg-gradient-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent">
                                Perfect Getaway
                            </span>
                        </h1>
                        <p className="text-lg md:text-xl text-white/90 font-light max-w-2xl mx-auto leading-relaxed">
                            Discover luxurious rooms, world-class amenities, and personalized hospitalities at Stayzy.
                        </p>
                    </div>

                    {/* Floating Search Bar */}
                    <div className="w-full max-w-4xl mt-4">
                        <SearchBar />
                    </div>

                    {/* Quick Stats */}
                    <div className="flex flex-wrap justify-center gap-8 md:gap-12 mt-8">
                        {[
                            { value: "50+", label: "Luxury Rooms" },
                            { value: "4.9", label: "Average Rating" },
                            { value: "10k+", label: "Happy Guests" },
                            { value: "24/7", label: "Concierge Support" },
                        ].map((stat, idx) => (
                            <div key={idx} className="text-center group">
                                <p className="text-3xl md:text-4xl font-bold text-white group-hover:text-orange-400 transition-colors">
                                    {stat.value}
                                </p>
                                <p className="text-white/70 text-sm mt-1">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
                    <div className="w-8 h-12 border-2 border-white/40 rounded-full flex items-start justify-center p-2">
                        <div className="w-1.5 h-3 bg-white/70 rounded-full animate-pulse" />
                    </div>
                </div>
            </section>

            {/* ==================== POPULAR DESTINATIONS SECTION ==================== */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <div className="space-y-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                <MapPin className="w-3 h-3 mr-1" />
                                Popular Destinations
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                Explore <span className="text-orange-600">Top Locations</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                                Most sought-after destinations with thousands of luxury accommodations.
                            </p>
                        </div>
                        <Link href="/destinations" className="group">
                            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer">
                                View All
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Destinations Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {DESTINATIONS.map((destination, index) => (
                            <DestinationCard
                                key={index}
                                {...destination}
                                className={index < 2 ? "md:col-span-1 lg:col-span-2" : ""}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== FEATURED ROOMS SECTION ==================== */}
            <section className="py-20 bg-slate-50 dark:bg-slate-950">
                <div className="container mx-auto px-4">
                    {/* Section Header */}
                    <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-12">
                        <div className="space-y-3">
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                                <Star className="w-3 h-3 mr-1" />
                                Featured Rooms
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                                Guest <span className="text-orange-600">Favorites</span>
                            </h2>
                            <p className="text-slate-500 dark:text-slate-400 max-w-lg">
                                Luxurious rooms with top ratings from our guests.
                            </p>
                        </div>
                        <Link href="/rooms" className="group">
                            <Button variant="ghost" className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer">
                                View All Rooms
                                <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                    </div>

                    {/* Rooms Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURED_ROOMS.map((room, index) => (
                            <Card
                                key={index}
                                className="group overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white dark:bg-slate-800 rounded-2xl cursor-pointer"
                            >
                                {/* Room Image */}
                                <div className="relative aspect-[4/3] overflow-hidden">
                                    <img
                                        src={room.image}
                                        alt={room.name}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    {/* Price Badge */}
                                    <div className="absolute top-4 right-4 px-3 py-1 rounded-full bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm text-sm font-semibold text-orange-600">
                                        {formatPrice(room.price)}/night
                                    </div>
                                    {/* Rating */}
                                    <div className="absolute bottom-4 left-4 flex items-center gap-1 px-2 py-1 rounded-full bg-black/50 backdrop-blur-sm text-white text-sm">
                                        <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                                        <span className="font-medium">{room.rating}</span>
                                        <span className="text-white/70">({room.reviews})</span>
                                    </div>
                                </div>

                                <CardContent className="p-5">
                                    <h3 className="font-semibold text-lg text-slate-900 dark:text-white mb-3 group-hover:text-orange-600 transition-colors">
                                        {room.name}
                                    </h3>
                                    <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
                                        <div className="flex items-center gap-1">
                                            <Bed className="w-4 h-4" />
                                            <span>{room.beds} beds</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Bath className="w-4 h-4" />
                                            <span>{room.baths} baths</span>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            <Users className="w-4 h-4" />
                                            <span>{room.guests} guests</span>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex gap-2">
                                        <Link href={`/rooms/${index + 1}`} className="flex-1">
                                            <Button variant="outline" size="sm" className="w-full border-orange-500 text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/20 cursor-pointer">
                                                Details
                                            </Button>
                                        </Link>
                                        <Link href={`/booking?room=${index + 1}`} className="flex-1">
                                            <Button size="sm" className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 cursor-pointer">
                                                Book Now
                                            </Button>
                                        </Link>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== WHY CHOOSE US SECTION ==================== */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                            <Shield className="w-3 h-3 mr-1" />
                            Our Guarantee
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Why Choose <span className="text-orange-600">Stayzy</span>?
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            We deliver unmatched hotel reservation experience with world-class commitments.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {FEATURES.map((feature, index) => (
                            <Card
                                key={index}
                                className="group border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-slate-50 dark:bg-slate-800 rounded-2xl hover:-translate-y-1 cursor-default"
                            >
                                <CardContent className="p-6 text-center">
                                    <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/30 group-hover:scale-110 transition-transform duration-300">
                                        <feature.icon className="h-8 w-8 text-white" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                                        {feature.description}
                                    </p>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== AMENITIES SECTION ==================== */}
            <section className="py-20 bg-gradient-to-br from-slate-50 to-orange-50/30 dark:from-slate-950 dark:to-orange-950/10">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                            <Sparkles className="w-3 h-3 mr-1" />
                            Premium Facilities
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            Services & <span className="text-orange-600">Amenities</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Enjoy top-tier amenities designed for your ultimate comfort and leisure.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-4">
                        {AMENITIES.map((amenity, index) => (
                            <AmenityIcon key={index} {...amenity} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== TESTIMONIALS SECTION ==================== */}
            <section className="py-20 bg-white dark:bg-slate-900">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-12 space-y-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400">
                            <Star className="w-3 h-3 mr-1" />
                            Guest Reviews
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white">
                            What Guests <span className="text-orange-600">Say</span>
                        </h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto">
                            Thousands of guests have trusted and enjoyed Stayzy services.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                        {TESTIMONIALS.map((testimonial, index) => (
                            <TestimonialCard key={index} {...testimonial} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ==================== NEWSLETTER SECTION ==================== */}
            <section className="py-20 bg-gradient-to-r from-orange-500 via-orange-500 to-amber-500 relative overflow-hidden">
                {/* Decorative Elements */}
                <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full translate-x-1/3 translate-y-1/3" />

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-2xl mx-auto space-y-6">
                        <h2 className="text-3xl md:text-4xl font-bold text-white">
                            Get Exclusive Deals
                        </h2>
                        <p className="text-white/90 text-lg">
                            Subscribe to our newsletter to receive secret deals and latest travel updates.
                        </p>
                        <NewsletterForm />
                        <p className="text-white/60 text-sm">
                            Over 50,000 subscribers • No spam, unsubscribe anytime
                        </p>
                    </div>
                </div>
            </section>

            {/* ==================== FINAL CTA SECTION ==================== */}
            <section className="py-20 bg-slate-900 dark:bg-slate-950 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }} />
                </div>

                <div className="container mx-auto px-4 relative z-10">
                    <div className="text-center max-w-3xl mx-auto space-y-8">
                        <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
                            Ready for Your <span className="text-orange-400">Next Vacation</span>?
                        </h2>
                        <p className="text-slate-400 text-lg md:text-xl">
                            Explore diverse room options and find your perfect stay today.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/rooms">
                                <Button
                                    size="lg"
                                    className="bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-lg px-8 py-6 shadow-xl shadow-orange-500/30 hover:shadow-2xl hover:shadow-orange-500/40 transition-all cursor-pointer"
                                >
                                    Explore Rooms
                                    <ArrowRight className="w-5 h-5 ml-2" />
                                </Button>
                            </Link>
                            <Link href="/contact">
                                <Button
                                    size="lg"
                                    variant="outline"
                                    className="border-slate-600 text-white hover:bg-slate-800 text-lg px-8 py-6 cursor-pointer"
                                >
                                    Contact Us
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
