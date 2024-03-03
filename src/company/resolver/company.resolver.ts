import { Mutation, Args, Query, Resolver } from "@nestjs/graphql";
import { CompanyService } from "../service/company.service";
import { CompanyDTO } from "../models/dto/company.dto";
import { Injectable } from "@nestjs/common";
import { CreateCompanyInput } from "../models/createCompany.input";
import { UpdateCompanyInput } from "../models/updateCompany.input";

@Injectable()
@Resolver(CompanyDTO)
export class CompanyResolver {
    constructor(private readonly companyService: CompanyService) { }
    @Mutation(() => CompanyDTO)
    async createCompany(@Args('createCompanyInput') createCompanyInput: CreateCompanyInput) {
        return this.companyService.create(createCompanyInput);
    }
    @Query(() => [CompanyDTO])
    async companies() {
        return this.companyService.findAll();
    }
    @Query(() => CompanyDTO)
    async company(@Args('id') id: string) {
        return this.companyService.findOne(id);
    }
    @Mutation(() => CompanyDTO)
    async updateCompany(@Args('id') id: string, @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput) {
        return this.companyService.update(id, updateCompanyInput);
    }
    @Mutation(() => CompanyDTO)
    async removeCompany(@Args('id') id: string) {
        return this.companyService.remove(id);
    }
}