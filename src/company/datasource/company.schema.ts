import { SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Company } from "./company.entity";

export type CompanyDocument = HydratedDocument<Company>;

export const companySchema = SchemaFactory.createForClass(Company)


