import { Company } from "../datasource/company.entity";
import { CompanyDTO } from "../models/dto/company.dto";

export class CompanyMapper {

    static toDTO(entity: Company): CompanyDTO {
        return {
            id: entity?._id.toString(),
            name: entity?.name,
            address: entity?.address,
            description: entity?.description,
            numberOfEmployees: entity?.numberOfEmployees,
            createdAt: entity?.createdAt,
            updatedAt: entity?.updatedAt
        }
    }
}