"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2, MessageSquare } from "lucide-react";
import { toast } from "sonner";

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) {
            toast.error("Please fill in all required fields");
            return;
        }

        setIsSubmitting(true);
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSubmitted(true);
            toast.success("Message sent successfully! We will get back to you shortly.");
            setFormData({ name: "", email: "", phone: "", subject: "", message: "" });
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-12">
            <div className="container mx-auto px-4 max-w-6xl space-y-12">
                {/* Header Section */}
                <div className="text-center space-y-4 max-w-2xl mx-auto">
                    <span className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-orange-100 dark:bg-orange-950/50 text-orange-600 rounded-full">
                        Get In Touch
                    </span>
                    <h1 className="text-4xl md:text-5xl font-extrabold bg-gradient-to-r from-slate-900 to-slate-600 dark:from-white dark:to-slate-400 bg-clip-text text-transparent">
                        Contact Stayzy
                    </h1>
                    <p className="text-slate-600 dark:text-slate-400 text-lg">
                        Have questions about room reservations, special events, or hotel services? We are here to help 24/7.
                    </p>
                </div>

                {/* Contact Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl text-center p-6 space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-orange-100 dark:bg-orange-950/50 text-orange-600 flex items-center justify-center mx-auto">
                            <MapPin className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Location</h3>
                        <p className="text-sm text-slate-500">123 Grand Hospitality Way, Luxury Bay, CA 90210</p>
                    </Card>

                    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl text-center p-6 space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/50 text-emerald-600 flex items-center justify-center mx-auto">
                            <Phone className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Phone</h3>
                        <p className="text-sm text-slate-500">+1 (800) 555-STAY<br />+1 (800) 555-7829</p>
                    </Card>

                    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl text-center p-6 space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-blue-100 dark:bg-blue-950/50 text-blue-600 flex items-center justify-center mx-auto">
                            <Mail className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Email</h3>
                        <p className="text-sm text-slate-500">support@stayzy.com<br />reservations@stayzy.com</p>
                    </Card>

                    <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl text-center p-6 space-y-3">
                        <div className="h-12 w-12 rounded-2xl bg-purple-100 dark:bg-purple-950/50 text-purple-600 flex items-center justify-center mx-auto">
                            <Clock className="h-6 w-6" />
                        </div>
                        <h3 className="font-semibold text-lg">Front Desk</h3>
                        <p className="text-sm text-slate-500">24 Hours / 7 Days<br />Check-in: 3:00 PM</p>
                    </Card>
                </div>

                {/* Form & Map Section */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Message Form */}
                    <Card className="lg:col-span-2 border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl">
                        <CardHeader>
                            <CardTitle className="text-2xl flex items-center gap-2">
                                <MessageSquare className="h-6 w-6 text-orange-500" />
                                Send Us a Message
                            </CardTitle>
                            <CardDescription>
                                Fill out the form below and our guest relations team will respond within 2 hours.
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            {isSubmitted ? (
                                <div className="py-12 text-center space-y-4">
                                    <div className="h-16 w-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                                        <CheckCircle2 className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-2xl font-bold">Thank You!</h3>
                                    <p className="text-slate-500 max-w-md mx-auto">
                                        Your message has been received. A hotel representative will reach out to you shortly.
                                    </p>
                                    <Button
                                        variant="outline"
                                        onClick={() => setIsSubmitted(false)}
                                        className="rounded-xl mt-4"
                                    >
                                        Send Another Message
                                    </Button>
                                </div>
                            ) : (
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="name">Full Name *</Label>
                                            <Input
                                                id="name"
                                                placeholder="John Doe"
                                                value={formData.name}
                                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                                className="rounded-xl"
                                                required
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="email">Email Address *</Label>
                                            <Input
                                                id="email"
                                                type="email"
                                                placeholder="john@example.com"
                                                value={formData.email}
                                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                                className="rounded-xl"
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label htmlFor="phone">Phone Number</Label>
                                            <Input
                                                id="phone"
                                                placeholder="+1 (555) 000-0000"
                                                value={formData.phone}
                                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                                className="rounded-xl"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <Label htmlFor="subject">Subject</Label>
                                            <Input
                                                id="subject"
                                                placeholder="Room Inquiry / Special Event"
                                                value={formData.subject}
                                                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                                                className="rounded-xl"
                                            />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label htmlFor="message">Message *</Label>
                                        <Textarea
                                            id="message"
                                            placeholder="Tell us how we can assist you..."
                                            rows={5}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="rounded-xl resize-none"
                                            required
                                        />
                                    </div>

                                    <Button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full sm:w-auto rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30 h-11 px-8"
                                    >
                                        <Send className="h-4 w-4 mr-2" />
                                        {isSubmitting ? "Sending..." : "Send Message"}
                                    </Button>
                                </form>
                            )}
                        </CardContent>
                    </Card>

                    {/* FAQ & Quick Info */}
                    <div className="space-y-6">
                        <Card className="border-0 shadow-lg shadow-slate-200/50 dark:shadow-slate-900/50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-sm rounded-2xl p-6 space-y-4">
                            <h3 className="font-bold text-xl">Frequently Asked Questions</h3>

                            <div className="space-y-3">
                                <div>
                                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">What are the Check-in and Check-out times?</h4>
                                    <p className="text-xs text-slate-500 mt-1">Check-in begins at 3:00 PM and Check-out is until 11:00 AM.</p>
                                </div>
                                <div className="border-t pt-3">
                                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">Is airport transportation available?</h4>
                                    <p className="text-xs text-slate-500 mt-1">Yes, private airport transfer services can be booked via our services page or front desk.</p>
                                </div>
                                <div className="border-t pt-3">
                                    <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200">What is the cancellation policy?</h4>
                                    <p className="text-xs text-slate-500 mt-1">Free cancellation up to 48 hours prior to check-in for standard rates.</p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
