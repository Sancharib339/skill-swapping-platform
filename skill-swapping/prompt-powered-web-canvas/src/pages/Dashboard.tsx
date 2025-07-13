import { useState } from "react";
import { Plus, TrendingUp, Users, Calendar, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import SkillCard from "@/components/SkillCard";
import SwapRequestCard from "@/components/SwapRequestCard";

const Dashboard = () => {
  // Mock data - will be replaced with real data from Supabase
  const stats = [
    { label: "Skills Offered", value: 5, icon: TrendingUp, color: "text-success" },
    { label: "Active Swaps", value: 3, icon: Users, color: "text-primary" },
    { label: "Completed Swaps", value: 12, icon: Calendar, color: "text-warning" },
    { label: "Rating", value: "4.8", icon: Star, color: "text-yellow-500" },
  ];

  const featuredUsers = [
    {
      id: "1",
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
      location: "San Francisco, CA",
      rating: 4.9,
      skillsOffered: ["Photoshop", "UI Design", "Figma"],
      skillsWanted: ["React", "TypeScript"],
      availability: "evenings"
    },
    {
      id: "2",
      name: "Marcus Johnson",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
      location: "New York, NY",
      rating: 4.7,
      skillsOffered: ["JavaScript", "Node.js", "Python", "AWS"],
      skillsWanted: ["Machine Learning", "Data Science"],
      availability: "weekends"
    },
    {
      id: "3",
      name: "Emma Rodriguez",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
      location: "Austin, TX",
      rating: 4.8,
      skillsOffered: ["Content Writing", "SEO", "Social Media"],
      skillsWanted: ["Video Editing", "Adobe After Effects"],
      availability: "flexible"
    }
  ];

  const swapRequests = [
    {
      id: "1",
      requester: { name: "Alex Kim", avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150" },
      skillOffered: "React Development",
      skillRequested: "UI Design",
      message: "Hi! I'd love to help you with React in exchange for learning UI design principles.",
      status: "pending" as const,
      createdAt: "2024-01-15"
    },
    {
      id: "2",
      requester: { name: "Lisa Park", avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150" },
      skillOffered: "Data Analysis",
      skillRequested: "Python",
      message: "I can teach you data analysis with Excel and Tableau!",
      status: "accepted" as const,
      createdAt: "2024-01-14"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome back, John! 👋
          </h1>
          <p className="text-muted-foreground">
            Ready to learn something new or share your expertise?
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <Card key={index} className="hover:shadow-card transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                    <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full bg-muted ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="discover" className="space-y-6">
          <div className="flex items-center justify-between">
            <TabsList className="grid w-full max-w-md grid-cols-3">
              <TabsTrigger value="discover">Discover</TabsTrigger>
              <TabsTrigger value="swaps">My Swaps</TabsTrigger>
              <TabsTrigger value="profile">Profile</TabsTrigger>
            </TabsList>
            
            <Button className="bg-gradient-primary hover:bg-primary-hover">
              <Plus className="w-4 h-4 mr-2" />
              Create Swap Request
            </Button>
          </div>

          <TabsContent value="discover" className="space-y-6">
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-foreground">Featured Members</h2>
                <Button variant="outline" size="sm">View All</Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredUsers.map((user) => (
                  <SkillCard key={user.id} user={user} />
                ))}
              </div>
            </div>

            <div className="bg-gradient-secondary rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                💡 Tip of the Day
              </h3>
              <p className="text-muted-foreground">
                Complete your profile with specific skills and availability to get better matches. 
                Members with complete profiles receive 3x more swap requests!
              </p>
            </div>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center">
                  Incoming Requests
                  <Badge className="ml-2 bg-primary text-primary-foreground">2</Badge>
                </h3>
                <div className="space-y-4">
                  {swapRequests.map((swap) => (
                    <SwapRequestCard key={swap.id} swap={swap} type="incoming" />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-foreground mb-4">
                  Your Requests
                </h3>
                <div className="space-y-4">
                  <SwapRequestCard 
                    swap={{
                      id: "3",
                      requester: { name: "David Wilson" },
                      skillOffered: "UI Design",
                      skillRequested: "React Development",
                      message: "Looking to learn React fundamentals",
                      status: "pending",
                      createdAt: "2024-01-13"
                    }} 
                    type="outgoing" 
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Complete Your Profile</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    Add Skills You Offer
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Plus className="w-6 h-6 mb-2" />
                    Add Skills You Want
                  </Button>
                </div>
                <div className="bg-muted/30 rounded-lg p-4">
                  <p className="text-sm text-muted-foreground">
                    📊 Profile completion: 60% - Add your availability and location to reach 100%!
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
};

export default Dashboard;