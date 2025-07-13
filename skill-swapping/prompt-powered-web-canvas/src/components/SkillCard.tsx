import { Star, MapPin, Clock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SkillCardProps {
  user: {
    id: string;
    name: string;
    avatar?: string;
    location?: string;
    rating: number;
    skillsOffered: string[];
    skillsWanted: string[];
    availability: string;
  };
}

const SkillCard = ({ user }: SkillCardProps) => {
  return (
    <Card className="group hover:shadow-skill transition-all duration-300 hover:-translate-y-1 border-border">
      <CardContent className="p-6">
        {/* User Header */}
        <div className="flex items-start space-x-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback className="bg-gradient-primary text-primary-foreground">
              {user.name.split(' ').map(n => n[0]).join('').toUpperCase()}
            </AvatarFallback>
          </Avatar>
          
          <div className="flex-1">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {user.name}
            </h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              {user.location && (
                <div className="flex items-center">
                  <MapPin className="w-3 h-3 mr-1" />
                  {user.location}
                </div>
              )}
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 fill-warning text-warning" />
                {user.rating.toFixed(1)}
              </div>
            </div>
          </div>
        </div>

        {/* Skills Offered */}
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">Offers:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsOffered.slice(0, 3).map((skill, index) => (
              <Badge 
                key={index} 
                variant="secondary"
                className="bg-accent text-accent-foreground hover:bg-accent/80"
              >
                {skill}
              </Badge>
            ))}
            {user.skillsOffered.length > 3 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{user.skillsOffered.length - 3} more
              </Badge>
            )}
          </div>
        </div>

        {/* Skills Wanted */}
        <div className="mb-4">
          <p className="text-sm font-medium text-foreground mb-2">Seeks:</p>
          <div className="flex flex-wrap gap-2">
            {user.skillsWanted.slice(0, 2).map((skill, index) => (
              <Badge 
                key={index} 
                variant="outline"
                className="border-primary/30 text-primary"
              >
                {skill}
              </Badge>
            ))}
            {user.skillsWanted.length > 2 && (
              <Badge variant="outline" className="text-muted-foreground">
                +{user.skillsWanted.length - 2} more
              </Badge>
            )}
          </div>
        </div>

        {/* Availability */}
        <div className="flex items-center text-sm text-muted-foreground">
          <Clock className="w-4 h-4 mr-2" />
          Available {user.availability}
        </div>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button 
          className="w-full group-hover:bg-gradient-primary transition-all duration-300"
          variant="outline"
        >
          Request Swap
          <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SkillCard;