import { InputType, Field, PartialType } from "@nestjs/graphql";
import { CreateCompanyInput } from "./createCompany.input";

@InputType()
export class UpdateCompanyInput extends PartialType(CreateCompanyInput) { }