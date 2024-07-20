"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useMemo, useState } from "react"
import { useRouter } from "next/navigation"
import { createAccountAction } from "@/app/actions/actions"
import { Icons } from "@/components/icons"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import countryList from 'react-select-country-list'


export const userAuthSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email(),
    dateOfBirth: z.string(),
    country: z.string(),
    password: z.string().min(4, 'Password cannot be less than 4 character(s)'),
    confirmPassword: z.string().min(4, 'Password cannot be less than 4 character(s)')
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
})

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

export type FormData = z.infer<typeof userAuthSchema>

export function UserSignUpForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        setError,
        setValue,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const options = useMemo(() => countryList().getData(), [])

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const error = await createAccountAction(data)
        setIsLoading(false)

        if (error) {
            if (typeof error === "object") {
                return setError("email", { message: error.message })
            } else {
                return toast({
                    title: "Error",
                    description: error,
                    variant: "destructive",
                })
            }
        }

        router.push("/auth/sign-in")
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2 mt-5">
                    <div className="grid gap-1">
                        <Label htmlFor="name">
                            Name
                        </Label>
                        <Input
                            id="name"
                            placeholder="Romaissa Walker"
                            disabled={isLoading}
                            {...register("name")}
                        />
                        {errors?.name && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.name.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="email">
                            E-mail Address
                        </Label>
                        <Input
                            id="email"
                            placeholder="example@xyz.com"
                            type="email"
                            autoCapitalize="none"
                            autoComplete="email"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("email")}
                        />
                        {errors?.email && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.email.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="email">
                            Date of birth
                        </Label>
                        <Input
                            id="dateOfBirth"
                            type="date"
                            disabled={isLoading}
                            {...register("dateOfBirth")}
                        />
                        {errors?.dateOfBirth && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.dateOfBirth.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="country">
                            Country
                        </Label>
                        <Select onValueChange={(val) => setValue("country", val)}>
                            <SelectTrigger>
                                <SelectValue placeholder="Country" />
                            </SelectTrigger>
                            <SelectContent>
                                {options.map((option) => (
                                    <SelectItem key={option.value} value={option.value}>
                                        {option.label}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>

                        {errors?.country && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.country.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="password">
                            Password
                        </Label>
                        <Input
                            id="password"
                            placeholder="Password"
                            type="password"
                            autoCapitalize="none"
                            autoComplete="password"
                            autoCorrect="off"
                            disabled={isLoading}
                            {...register("password")}
                        />
                        {errors?.password && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.password.message}
                            </p>
                        )}
                    </div>
                    <div className="grid gap-1">
                        <Label htmlFor="confirmPassword">
                            Confirm Password
                        </Label>
                        <Input
                            id="confirmPassword"
                            placeholder="Confirm Password"
                            type="password"
                            disabled={isLoading}
                            {...register("confirmPassword")}
                        />
                        {errors?.confirmPassword && (
                            <p className="px-1 text-xs text-red-600">
                                {errors.confirmPassword.message}
                            </p>
                        )}
                    </div>
                    <button className={cn(buttonVariants(), "w-fit mx-auto mt-4")} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Create account
                    </button>
                </div>
            </form>
        </div>
    )
}