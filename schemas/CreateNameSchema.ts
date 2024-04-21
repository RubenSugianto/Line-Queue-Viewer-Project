import { z } from "zod";

export const CreateNameFormSchema = z.object({
    id: z.string().optional(),
    name: z.string().nonempty({ message: 'Person name should not be empty.' })
        .max(51, { message: 'Person name inputted should be 50 characters max.' }),
});

export type CreateNameFormType = z.infer<typeof CreateNameFormSchema>;