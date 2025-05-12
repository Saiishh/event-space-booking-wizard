
import { Service } from "@/data/services";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { Check } from "lucide-react";

interface ServiceOptionProps {
  service: Service;
  onSelect: (service: Service, selected: boolean) => void;
  selected: boolean;
}

const ServiceOption = ({ service, onSelect, selected }: ServiceOptionProps) => {
  const handleToggleSelect = () => {
    onSelect(service, !selected);
  };

  return (
    <Card className={`overflow-hidden transition-all border-2 ${selected ? "border-hall-500" : "border-transparent"}`}>
      <CardContent className="p-4">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">{service.name}</h3>
              {selected && (
                <span className="text-hall-500">
                  <Check size={16} />
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-1">{service.description}</p>
            <div className="mt-2 mb-3">
              <span className="text-hall-700 font-semibold">${service.price}{service.category === "Catering" ? "/person" : ""}</span>
              <Badge className="ml-3 bg-gray-100 text-gray-600 hover:bg-gray-200 text-xs">{service.category}</Badge>
            </div>
          </div>
        </div>
        <Button
          onClick={handleToggleSelect}
          variant={selected ? "default" : "outline"}
          className="w-full mt-2"
        >
          {selected ? "Selected" : "Select"}
        </Button>
      </CardContent>
    </Card>
  );
};

import { Badge } from "@/components/ui/badge";

export default ServiceOption;
