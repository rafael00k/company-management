import { Module } from "@nestjs/common";
import { CompanyService } from "./service/company.service";
import { CompanyResolver } from "./resolver/company.resolver";
import { MongooseModule } from "@nestjs/mongoose";
import { Company } from "./datasource/company.entity";
import { companySchema } from "./datasource/company.schema";
import { CompanyRepository } from "./datasource/company.repository";

@Module({
    imports: [MongooseModule.forFeature([{ name: Company.name, schema: companySchema }])],
    providers: [CompanyService, CompanyResolver, CompanyRepository]
})
export class CompanyModule {}