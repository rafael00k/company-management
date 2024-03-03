import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { Company } from "../datasource/company.entity";
import { MongooseErrorHandler } from "../../config/mongooseException.handler";
import { CompanyRepository } from "../datasource/company.repository";
import { CompanyMapper } from "../mappers/company.mapper";
import { CompanyDTO } from "../models/dto/company.dto";

@Injectable()
export class CompanyService {
    constructor(
        @Inject(CompanyRepository) private readonly companyRepository: CompanyRepository
    ) { }

    async create(createCompanyInput: any): Promise<CompanyDTO> {
        let createdCompany: Company;
        try {
            const createdCompany = await this.companyRepository.create(createCompanyInput);
        } catch (error) {
            MongooseErrorHandler.handleError(error);
        }

        return this.companyHandler(createdCompany);

    }

    async findAll(): Promise<CompanyDTO[]> {
        let allCompanies: Company[];
        try {
            allCompanies = await this.companyRepository.findAll();

        } catch (error) {
            MongooseErrorHandler.handleError(error);
        }

        return allCompanies.map(company => this.companyHandler(company));
    }


    async findOne(id): Promise<CompanyDTO> {
        let company: Company;
        try {
            company = await this.companyRepository.findOne(id);
        } catch (error) {
            MongooseErrorHandler.handleError(error);
        }

        return this.companyHandler(company);
    }
    async update(id, updateCompanyInput): Promise<CompanyDTO> {
        let updatedCompany: Company;
        try {
            updatedCompany = await this.companyRepository.update(id, updateCompanyInput);
        } catch (error) {
            MongooseErrorHandler.handleError(error);
        }

        return this.companyHandler(updatedCompany);

    }

    async remove(id) {
        let deletedCompany: Company;
        try {
            deletedCompany = await this.companyRepository.delete(id);

        } catch (error) {
            MongooseErrorHandler.handleError(error);
        }

        return this.companyHandler(deletedCompany);

    }

    private companyHandler(company: Company) {
        if (!company) {
            throw new NotFoundException(`Company not found`);
        }

        return CompanyMapper.toDTO(company);
    }
}