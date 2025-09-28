import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { Layout, Pointer, Zap } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import VerticalEventTimelineCarousel from "./timeline";

interface Tab {
  value: string;
  title: string;
  content: React.ReactNode;
}

interface Feature108Props {
  badge?: string;
  heading?: string;
  description?: string;
  tabs?: Tab[];
}

const TimelineTabs = ({
  badge = "Our coharts",
  heading = "This is the heading",
  description = "This is the description",
  tabs = [
    {
      value: "tab-1",
      title: "Cohart 1",
      content: <VerticalEventTimelineCarousel />,
    },

    {
      value: "tab-3",
      title: "Cohart 2",
      content: <VerticalEventTimelineCarousel />,
    },
  ],
}: Feature108Props) => {
  return (
    <section className="pt-16 pb-32 bg-[#FCF9E8]">
      <div className="container mx-auto">
        <div className="flex flex-col items-center gap-4 text-center">
          <Badge variant="outline">{badge}</Badge>

          <h2 className="text-4xl lg:text-5xl text-charcoal leading-relaxed">
            <span className="font-serif italic">{heading}</span>
          </h2>
          <p className="text-muted-foreground">{description}</p>
        </div>
        <Tabs defaultValue={tabs[0].value} className="mt-8">
          <TabsList className="container flex flex-col items-center justify-center gap-4 sm:flex-row md:gap-10">
            {tabs.map((tab) => (
              <TabsTrigger
                key={tab.value}
                value={tab.value}
                className="flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold text-muted-foreground data-[state=active]:bg-muted data-[state=active]:text-primary"
              >
                {tab.title}
              </TabsTrigger>
            ))}
          </TabsList>
          <div className="mx-auto mt-8 max-w-screen-xl rounded-2xl bg-[#FCF9E8] p-6 lg:p-16">
            {tabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                <VerticalEventTimelineCarousel />
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </section>
  );
};

export { TimelineTabs };
