import {  Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Company' })
export class CompanyDTO {
    @Field(() => ID)
    id: string;
    @Field()
    name: string;
    @Field({ nullable: true })
    description?: string;
    @Field({ nullable: true })
    address?: string;
    @Field({ nullable: true })
    numberOfEmployees?: number;
    @Field()
    createdAt: Date;
    @Field({ nullable: true })
    updatedAt?: Date;

}