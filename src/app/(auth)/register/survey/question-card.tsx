"use client";

import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { UseFormReturn, ControllerRenderProps } from "react-hook-form";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { questions } from "./config";
import { SurveyData } from "@/schemas/authForm";

interface QuestionCardProps {
  question: (typeof questions)[number];
  isActive: boolean;
  form: UseFormReturn<SurveyData>;
  position: "before" | "current" | "after";
}

export function QuestionCard({ question, form, position }: QuestionCardProps) {
  return (
    <Card
      className={`absolute w-11/12 max-w-md p-6 bg-transparent shadow-lg rounded-lg 
          transform transition-transform duration-500 ${
            position === "before"
              ? "-translate-x-full opacity-0"
              : position === "after"
              ? "translate-x-full opacity-0"
              : "translate-x-0 opacity-100"
          }`}>
      <CardHeader>
        <h2 className="text-xl font-bold text-center">{question.question}</h2>
      </CardHeader>
      <CardContent>
        <FormField
          control={form.control}
          name={question.id}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <InputComponent
                  field={field}
                  question={question}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </CardContent>
    </Card>
  );
}

type InputProps = {
  field: ControllerRenderProps<SurveyData, keyof SurveyData>;
  question: (typeof questions)[number];
};

const InputComponent = ({ field, question }: InputProps) => {
  switch (question.inputType) {
    case "number":
      return (
        <Input
          {...field}
          type="number"
          placeholder={question.placeholder}
          onChange={(e) =>
            field.onChange(e.target.value ? Number(e.target.value) : "")
          }
        />
      );

    case "select":
      return (
        <Select
          onValueChange={field.onChange}
          value={field.value?.toString()}>
          <SelectTrigger>
            <SelectValue placeholder={question.placeholder} />
          </SelectTrigger>
          <SelectContent>
            {question.options?.map(({ value, label }) => (
              <SelectItem
                key={value}
                value={value.toString()}>
                {label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    case "multiselect":
      const checkboxValues = (field.value || []) as string[];
      const isNoneSelected = checkboxValues.includes("none");

      return (
        <div className="space-y-2">
          {question.options?.map(({ value, label }) => {
            const isDisabled =
              (isNoneSelected && value !== "NONE") ||
              (!isNoneSelected &&
                value === "NONE" &&
                checkboxValues.length > 0);

            return (
              <div
                key={value}
                className="flex items-center space-x-2">
                <Checkbox
                  id={`${question.id}-${value}`}
                  checked={checkboxValues.includes(value)}
                  disabled={isDisabled}
                  onCheckedChange={(checked) => {
                    if (value === "NONE") {
                      field.onChange(checked ? ["NONE"] : []);
                    } else {
                      const newValues = checked
                        ? [...checkboxValues.filter((v) => v !== "NONE"), value]
                        : checkboxValues.filter((v) => v !== value);
                      field.onChange(newValues);
                    }
                  }}
                />
                <label
                  htmlFor={`${question.id}-${value}`}
                  className={isDisabled ? "text-gray-400" : ""}>
                  {label}
                </label>
              </div>
            );
          })}
        </div>
      );
  }
};
