import { Field, InputType } from "@nestjs/graphql";
import { Max, MaxLength } from "class-validator";

@InputType()
export class CreateCompanyInput {
    @Field()
    @MaxLength(50, { message: 'Name is too long' })
    name: string;

    @Field({ nullable: true })
    description?: string;

    @Field({ nullable: true })
    @MaxLength(300, { message: 'Address is too long' })
    address?: string;

    @Field({ nullable: true })
    @Max(100000, { message: 'Number of employees is too high' })
    numberOfEmployees?: number;

}