import { Company } from "../datasource/company.entity";
import { CreateCompanyInput } from "../models/createCompany.input";
import { CompanyDTO } from "../models/dto/company.dto";
import { UpdateCompanyInput } from "../models/updateCompany.input";
import { Types } from "mongoose";
export const createCompanyInputMock: CreateCompanyInput = {
    name: 'company name',
    description: 'description of the company',
    address: 'address of the company',
    numberOfEmployees: 0
}

export const createdCompanyMock: Company = {
    _id: new Types.ObjectId(),
    name: 'company name',
    description: 'address of the company',
    address: 'address of the company',
    numberOfEmployees: 0,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const createdCompanyDTO = {
    id: 'some id',
    name: 'company name',
    description: 'address of the company',
    address: 'address of the company',
    numberOfEmployees: 0,
    createdAt: new Date(),
    updatedAt: new Date()

}

export const updateCompanyInputMock: Partial<UpdateCompanyInput> = {
    name: 'string',
    description: 'string',
    address: 'string',
    numberOfEmployees: 10
}

export const updatedCompanyMock: Company = {
    _id: new Types.ObjectId(),
    name: 'string',
    description: 'string',
    address: 'string',
    numberOfEmployees: 10,
    createdAt: new Date(),
    updatedAt: new Date()
}

export const updatedCompanyDTO: CompanyDTO = {
    id: 'some id',
    name: 'string',
    description: 'string',
    address: 'string',
    numberOfEmployees: 10,
    createdAt: new Date(),
    updatedAt: new Date()
}