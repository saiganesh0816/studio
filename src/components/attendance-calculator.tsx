"use client";

import { useState, useMemo } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import {
  CalendarCheck,
  CalendarDays,
  Target,
  CheckCircle2,
  XCircle,
  TrendingUp,
  User,
  Clipboard,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function AttendanceCalculator() {
  const [name, setName] = useState("");
  const [rollNumber, setRollNumber] = useState("");
  const [attended, setAttended] = useState("");
  const [total, setTotal] = useState("");
  const [threshold, setThreshold] = useState([75]);

  const percentage = useMemo(() => {
    const attendedNum = Number(attended);
    const totalNum = Number(total);

    if (
      !isNaN(attendedNum) &&
      !isNaN(totalNum) &&
      totalNum > 0 &&
      attendedNum >= 0 &&
      attendedNum <= totalNum
    ) {
      return (attendedNum / totalNum) * 100;
    }
    return null;
  }, [attended, total]);

  const isPass = useMemo(() => {
    if (percentage === null) return null;
    return percentage >= threshold[0];
  }, [percentage, threshold]);

  const resultStatus = useMemo(() => {
    if (isPass === null) return "pending";
    return isPass ? "pass" : "fail";
  }, [isPass]);

  return (
    <Card className="w-full max-w-lg shadow-2xl">
      <CardHeader className="text-center">
        <div className="mx-auto bg-primary/10 p-3 rounded-full w-fit">
          <TrendingUp className="w-8 h-8 text-primary" />
        </div>
        <CardTitle className="font-headline text-3xl mt-2">
          AttendanceAce
        </CardTitle>
        <CardDescription>
          Track your attendance and stay on top of your goals.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="name" className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Name
            </Label>
            <Input
              id="name"
              type="text"
              placeholder="e.g., John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="roll-number" className="flex items-center gap-2">
              <Clipboard className="w-4 h-4" />
              Roll Number
            </Label>
            <Input
              id="roll-number"
              type="text"
              placeholder="e.g., 21BCS001"
              value={rollNumber}
              onChange={(e) => setRollNumber(e.target.value)}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attended" className="flex items-center gap-2">
              <CalendarCheck className="w-4 h-4" />
              Attended Days
            </Label>
            <Input
              id="attended"
              type="number"
              placeholder="e.g., 60"
              value={attended}
              onChange={(e) => setAttended(e.target.value)}
              min="0"
              max={total || undefined}
              className="font-sans"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="total" className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              Total Days
            </Label>
            <Input
              id="total"
              type="number"
              placeholder="e.g., 80"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
              min={attended || "0"}
              className="font-sans"
            />
          </div>
        </div>
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <Label htmlFor="threshold" className="flex items-center gap-2">
              <Target className="w-4 h-4" />
              Passing Threshold
            </Label>
            <span className="font-bold text-primary">{threshold[0]}%</span>
          </div>
          <Slider
            id="threshold"
            value={threshold}
            onValueChange={setThreshold}
            max={100}
            step={1}
          />
        </div>
      </CardContent>

      {percentage !== null && (
        <CardFooter>
          <div
            className={cn(
              "w-full p-6 rounded-lg border-2 text-center transition-all duration-500 transform",
              resultStatus === "pass" && "border-primary bg-primary/10",
              resultStatus === "fail" &&
                "border-destructive bg-destructive/10",
              resultStatus === "pending" && "border-dashed"
            )}
          >
            <div className="flex justify-center items-center gap-4">
              {resultStatus === "pass" && (
                <CheckCircle2 className="w-10 h-10 text-primary" />
              )}
              {resultStatus === "fail" && (
                <XCircle className="w-10 h-10 text-destructive" />
              )}
              <div>
                <p className="text-muted-foreground text-sm">
                  Your Attendance
                </p>
                <p className="text-4xl font-bold font-headline">
                  {percentage.toFixed(2)}%
                </p>
              </div>
            </div>

            <p
              className={cn(
                "text-xl font-semibold mt-4 transition-colors",
                resultStatus === "pass" && "text-primary",
                resultStatus === "fail" && "text-destructive"
              )}
            >
              Status: {isPass ? "Pass" : "Fail"}
            </p>
          </div>
        </CardFooter>
      )}
    </Card>
  );
}
