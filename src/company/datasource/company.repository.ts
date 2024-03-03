import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";
import { Company } from "./company.entity";
import { CompanyDocument } from "./company.schema";
import { Injectable } from "@nestjs/common";

@Injectable()
export class CompanyRepository {

    constructor(@InjectModel(Company.name) private companyModel: Model<CompanyDocument>) { }


    async create(createCompanyInput: any): Promise<Company> {
        const company = new this.companyModel(createCompanyInput);
        return company.save();

    }

    async findAll(): Promise<Company[]> {
        return this.companyModel.find().exec()
    }

    async findOne(id: string): Promise<Company> {
        return this.companyModel.findById(id).exec();
    }

    async update(id: string, updateCompanyInput: any): Promise<Company> {
        return this.companyModel.findByIdAndUpdate(id, updateCompanyInput, { new: true }).exec();
    }

    async delete(id: string): Promise<Company> {
        return this.companyModel.findByIdAndDelete(id).exec();
    }

}