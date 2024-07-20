"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "@/components/ui/use-toast"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { authenticate } from "@/app/actions/actions"
import { Icons } from "@/components/icons"


export const userAuthSchema = z.object({
    email: z.string().email(),
    password: z.string().min(4, 'Password cannot be less than 4 character(s)')
});

interface UserAuthFormProps extends React.HTMLAttributes<HTMLDivElement> { }

type FormData = z.infer<typeof userAuthSchema>

export function UserAuthForm({ className, ...props }: UserAuthFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({
        resolver: zodResolver(userAuthSchema),
    })
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const router = useRouter()
    const searchParams = useSearchParams()

    async function onSubmit(data: FormData) {
        setIsLoading(true)

        const error = await authenticate(data)
        setIsLoading(false)

        if (error) {
            return toast({
                title: "Something went wrong.",
                description: error,
                variant: "destructive",
            })
        }

        router.push("/home" || searchParams.get("from") || "/")
    }

    return (
        <div className={cn("grid gap-6", className)} {...props}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid gap-2 mt-5">
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
                    <button className={cn(buttonVariants(), "w-fit mx-auto mt-4")} disabled={isLoading}>
                        {isLoading && (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin" />
                        )}
                        Sign In
                    </button>
                </div>
            </form>
        </div>
    )
}