import {TrendingUpIcon } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export function SectionCards() {
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Residents</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            48
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              20 male
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              28 female
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Toatal Staff <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">
              2 new joining the last 6 months
            </div>
          </div>
          <div>
            <Button>See all</Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Total Staff</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            101
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              50 male
              <Separator
                orientation="vertical"
                className="mx-2 data-[orientation=vertical]:h-4"
              />
              51 female
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Toatal Staff <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">6 on probation period</div>
          </div>
          <div>
            <Button>See all</Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Acitive Houses</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            03
          </CardTitle>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div>
            <div className="line-clamp-1 flex gap-2 font-medium">
              Toatal Staff <TrendingUpIcon className="size-4" />
            </div>
            <div className="text-muted-foreground">you can create 7 more</div>
          </div>
          <div>
            <Button>Create One</Button>
          </div>
        </CardFooter>
      </Card>
      <Card className="@container/card">
        <CardHeader className="relative">
          <CardDescription>Upcoming Appoinments</CardDescription>
          <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums">
            7
          </CardTitle>
          <div className="absolute right-4 top-4">
            <Badge variant="outline" className="flex gap-1 rounded-lg text-xs">
              <TrendingUpIcon className="size-3" />
              +4.5%
            </Badge>
          </div>
        </CardHeader>
        <CardFooter className="flex justify-between items-start gap-1 text-sm">
          <div className=" flex -space-x-3">
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://]github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>
          <div>
            <Button>See All</Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
