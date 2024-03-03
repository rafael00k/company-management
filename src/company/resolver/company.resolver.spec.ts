import { Test, TestingModule } from '@nestjs/testing';
import { CompanyResolver } from './company.resolver';
import { CompanyService } from '../service/company.service';
import { CompanyDTO } from '../models/dto/company.dto';
import { createCompanyInputMock, createdCompanyDTO, updateCompanyInputMock, updatedCompanyDTO } from '../mocks/company.mock';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;
  let service: CompanyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CompanyResolver,
        {
          provide: CompanyService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
    service = module.get<CompanyService>(CompanyService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('createCompany', () => {
    it('should create a company', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(createdCompanyDTO);
      const result = await resolver.createCompany(createCompanyInputMock);

      expect(result).toBe(createdCompanyDTO);
      expect(service.create).toHaveBeenCalledWith(createCompanyInputMock);
    });
  });

  describe('companies', () => {
    it('should return an array of companies', async () => {
      const companies: CompanyDTO[] = [createdCompanyDTO];
      jest.spyOn(service, 'findAll').mockResolvedValue(companies);

      const result = await resolver.companies();

      expect(result).toEqual(companies);
      expect(service.findAll).toHaveBeenCalled();
    });
  });

  describe('company', () => {
    it('should return a company by id', async () => {
      const companyId = 'some id';
      jest.spyOn(service, 'findOne').mockResolvedValue(createdCompanyDTO);

      const result = await resolver.company(companyId);

      expect(result).toEqual(createdCompanyDTO);
      expect(service.findOne).toHaveBeenCalledWith(companyId);
    });
  });

  describe('updateCompany', () => {
    it('should update a company', async () => {
      const companyId = '1';
      jest.spyOn(service, 'update').mockResolvedValue(updatedCompanyDTO);

      const result = await resolver.updateCompany(companyId, updateCompanyInputMock);

      expect(result).toEqual(updatedCompanyDTO);
      expect(service.update).toHaveBeenCalledWith(companyId, updateCompanyInputMock);
    });
  });

  describe('removeCompany', () => {
    it('should remove a company', async () => {
      const companyId = '1';
      jest.spyOn(service, 'remove').mockResolvedValue(createdCompanyDTO);

      const result = await resolver.removeCompany(companyId);

      expect(result).toEqual(createdCompanyDTO);
      expect(service.remove).toHaveBeenCalledWith(companyId);
    });
  });
});
