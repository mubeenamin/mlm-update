"use client";

import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useState } from "react";

export default function Component() {
  const [Package, setPackage] = useState("");
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const response = await fetch("/api/create_packages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center p-24">
      <Card className="w-full max-w-lg">
        <CardContent className="p-6">
          <div className="grid gap-4">
            <CardHeader className="text-center">
              <div>Create a Package</div>
            </CardHeader>
            <form action={handleSubmit}>
              <div className="grid gap-2">
                <Label>Package Name</Label>
                <Input
                  value={Package}
                  placeholder="Enter package name"
                  onChange={(e) => setPackage(e.target.value)}
                />
              </div>
              <div className="flex justify-center items-center">
                <Button
                  className="w-[40%] justify-center text-center mt-4 bg-green-700 text-white hover:bg-black hover:text-white"
                  type="submit"
                >
                  Submit
                </Button>
              </div>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
