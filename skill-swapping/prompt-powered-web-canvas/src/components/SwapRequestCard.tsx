import { Clock, CheckCircle, XCircle, MessageSquare, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SwapRequest {
  id: string;
  requester: {
    name: string;
    avatar?: string;
  };
  skillOffered: string;
  skillRequested: string;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
}

interface SwapRequestCardProps {
  swap: SwapRequest;
  type: 'incoming' | 'outgoing';
}

const SwapRequestCard = ({ swap, type }: SwapRequestCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'accepted': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'completed': return 'bg-primary/10 text-primary border-primary/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'rejected': return <XCircle className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  return (
    <Card className="hover:shadow-card transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src={swap.requester.avatar} alt={swap.requester.name} />
              <AvatarFallback className="bg-muted">
                {swap.requester.name.split(' ').map(n => n[0]).join('').toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-base">
                {type === 'incoming' ? swap.requester.name : `To ${swap.requester.name}`}
              </CardTitle>
              <p className="text-sm text-muted-foreground">
                {new Date(swap.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
          <Badge className={`flex items-center gap-1 ${getStatusColor(swap.status)}`}>
            {getStatusIcon(swap.status)}
            {swap.status.charAt(0).toUpperCase() + swap.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Skill Exchange */}
        <div className="bg-muted/30 rounded-lg p-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              <Badge variant="secondary" className="bg-accent text-accent-foreground">
                {swap.skillOffered}
              </Badge>
              <span className="text-muted-foreground">offers</span>
            </div>
            <div className="text-muted-foreground">↔</div>
            <div className="flex items-center space-x-2">
              <span className="text-muted-foreground">for</span>
              <Badge variant="outline" className="border-primary/30 text-primary">
                {swap.skillRequested}
              </Badge>
            </div>
          </div>
        </div>

        {/* Message */}
        {swap.message && (
          <div className="bg-muted/20 rounded-lg p-3">
            <p className="text-sm text-foreground italic">"{swap.message}"</p>
          </div>
        )}

        {/* Actions */}
        {swap.status === 'pending' && (
          <div className="flex space-x-2">
            {type === 'incoming' ? (
              <>
                <Button size="sm" className="flex-1 bg-success hover:bg-success/90">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Accept
                </Button>
                <Button size="sm" variant="outline" className="flex-1 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground">
                  <XCircle className="w-4 h-4 mr-2" />
                  Decline
                </Button>
              </>
            ) : (
              <Button size="sm" variant="outline" className="w-full">
                Cancel Request
              </Button>
            )}
          </div>
        )}

        {swap.status === 'accepted' && (
          <div className="flex space-x-2">
            <Button size="sm" variant="outline" className="flex-1">
              <MessageSquare className="w-4 h-4 mr-2" />
              Message
            </Button>
            <Button size="sm" className="flex-1">
              Mark Complete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SwapRequestCard;