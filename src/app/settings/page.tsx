import { lucia } from "@/core-platform/lib/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Globe, Moon, Sun, Monitor, User, Shield, Bell } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";

export default async function SettingsPage() {
    const sessionId = (await cookies()).get(lucia.sessionCookieName)?.value ?? null;
    if (!sessionId) redirect("/login");

    const { user } = await lucia.validateSession(sessionId);
    if (!user) redirect("/login");

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto py-12 px-4 max-w-4xl">
                <div className="space-y-2 mb-10">
                    <h1 className="text-4xl font-black tracking-tighter italic uppercase">Settings</h1>
                    <p className="text-muted-foreground">Manage your account preferences and global site settings.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Sidebar Nav */}
                    <aside className="space-y-2">
                        <Button variant="secondary" className="w-full justify-start gap-3 font-bold">
                            <User className="h-4 w-4" /> Account
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                            <Globe className="h-4 w-4" /> Appearance & Language
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                            <Shield className="h-4 w-4" /> Security
                        </Button>
                        <Button variant="ghost" className="w-full justify-start gap-3 text-muted-foreground">
                            <Bell className="h-4 w-4" /> Notifications
                        </Button>
                    </aside>

                    {/* Content */}
                    <div className="md:col-span-2 space-y-8">
                        <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2rem]">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold italic tracking-tight">Appearance</CardTitle>
                                <CardDescription>Customize how RigHub looks for you.</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-bold">Theme Mode</Label>
                                        <p className="text-sm text-muted-foreground">Switch between light and dark mode.</p>
                                    </div>
                                    <ThemeToggle />
                                </div>

                                <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <Label className="text-base font-bold">Language</Label>
                                        <p className="text-sm text-muted-foreground">Select your preferred display language.</p>
                                    </div>
                                    <div className="flex bg-muted p-1 rounded-xl">
                                        <Button size="sm" variant="secondary" className="rounded-lg font-bold">English (AU)</Button>
                                        <Button size="sm" variant="ghost" className="rounded-lg text-muted-foreground">Português (BR)</Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="bg-card/40 backdrop-blur-md border-border/50 rounded-[2rem]">
                            <CardHeader>
                                <CardTitle className="text-xl font-bold italic tracking-tight">Profile Info</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-1.5">
                                        <Label>Display Name</Label>
                                        <div className="p-3 bg-muted rounded-xl text-sm font-medium">{user.name}</div>
                                    </div>
                                    <div className="space-y-1.5">
                                        <Label>Email</Label>
                                        <div className="p-3 bg-muted rounded-xl text-sm font-medium opacity-50">{user.email}</div>
                                    </div>
                                </div>
                                <Button className="w-full mt-4 rounded-xl font-bold">Update Profile</Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
