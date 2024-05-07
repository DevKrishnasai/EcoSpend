"use client";
import React, { useCallback } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CustomSkeloton from "@/components/CustomSkeloton";
import { User } from "@prisma/client";
import { useForm } from "react-hook-form";
import { useQuery, useMutation } from "@tanstack/react-query";
import { TUser, userSettingsSchema } from "@/lib/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { updateUserDetailsAction } from "../actions";
import { toast } from "sonner";
import SearchBoxForCountries from "./SearchBoxForCountries";

const BasicDeatilsSection = () => {
  //hookform
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    setValue,
    getValues,
  } = useForm<TUser>({
    resolver: zodResolver(userSettingsSchema),
  });
  //query
  const { isFetching } = useQuery<User>({
    queryKey: ["userDetails"],
    queryFn: async () => {
      try {
        const response = await fetch("/api/user-details");
        if (!response.ok) {
          throw new Error("Failed to fetch user details");
        }

        const fetchedData = await response.json();
        const userDetails = userSettingsSchema.safeParse(fetchedData);
        if (!userDetails.success) {
          throw new Error(userDetails.error.message);
        }
        reset(userDetails.data);
        return fetchedData;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const userDetailsMutation = useMutation({
    mutationFn: updateUserDetailsAction,
    onSuccess: () => {
      toast.success("profile updated successfully ", {
        id: "user-settings",
      });
    },
    onError: (e) => {
      console.log(e);
      toast.error("Failed to update profile details", {
        id: "user-settings",
      });
    },
  });

  const updateUserDetails = useCallback(
    (data: TUser) => {
      toast.loading("Updating profile details... ", {
        id: "user-settings",
      });
      userDetailsMutation.mutate(data);
    },
    [userDetailsMutation]
  );

  return (
    <div className="w-full">
      <section className="flex flex-col justify-center items-center mt-5">
        <div className="w-1/2">
          <CustomSkeloton isLoading={isFetching}>
            <Card className="w-full">
              <CardHeader>
                <CardTitle>Basic Details</CardTitle>
                <CardDescription>
                  Update your details to reflect in the whole application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="space-y-6"
                  onSubmit={handleSubmit(updateUserDetails)}
                >
                  <Input
                    {...register("name", {
                      required: true,
                    })}
                    placeholder="Name"
                    className={errors.name ? "error border" : ""}
                  />
                  {errors.name && (
                    <span className="text-red-500 text-xs">
                      {errors.name.message}
                    </span>
                  )}
                  <Input
                    {...register("email")}
                    placeholder="Email"
                    disabled={true}
                  />

                  <SearchBoxForCountries
                    register={register}
                    setValue={setValue}
                    value={getValues("country")}
                  />
                  {errors.country && (
                    <span className="text-red-500 text-xs">
                      {errors.country.message}
                    </span>
                  )}
                </form>
              </CardContent>
              <CardFooter className="border-t px-6 py-4">
                <Button
                  type="submit"
                  onClick={handleSubmit(updateUserDetails)}
                  disabled={userDetailsMutation.isPending}
                >
                  {userDetailsMutation.isPending ? "Updating..." : "Update"}
                </Button>
              </CardFooter>
            </Card>
          </CustomSkeloton>
        </div>
      </section>
    </div>
  );
};

export default BasicDeatilsSection;
