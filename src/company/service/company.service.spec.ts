import { CompanyService } from './company.service';
import { CompanyRepository } from '../datasource/company.repository';
import { NotFoundException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Company } from '../datasource/company.entity';
import { Model, Types } from 'mongoose';
import { createCompanyInputMock, createdCompanyDTO, createdCompanyMock, updateCompanyInputMock, updatedCompanyDTO, updatedCompanyMock } from '../mocks/company.mock';
import { CompanyMapper } from '../mappers/company.mapper';

describe('CompanyService', () => {
    let companyService: CompanyService;
    let companyRepository: CompanyRepository;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [CompanyService, CompanyRepository,
                {
                    provide: getModelToken(Company.name),
                    useValue: Model
                }

            ]
        }).compile()
        companyRepository = module.get<CompanyRepository>(CompanyRepository);
        companyService = module.get<CompanyService>(CompanyService);
    });

    beforeEach(() => {
        jest.clearAllMocks();
    });



    describe('create', () => {
        it('should create a new company', async () => {
            createdCompanyMock._id = new Types.ObjectId();
            createdCompanyDTO.id = createdCompanyMock._id.toString();
            jest.spyOn(companyRepository, 'create').mockResolvedValue(createdCompanyMock);
            jest.spyOn(CompanyMapper, 'toDTO')
            jest.spyOn(CompanyService.prototype as any, 'companyHandler').mockReturnValueOnce(createdCompanyDTO);
            const result = await companyService.create(createCompanyInputMock);
            expect(companyRepository.create).toHaveBeenCalledWith(createCompanyInputMock);
            expect(result).toEqual(createdCompanyDTO);
        });



        describe('findAll', () => {
            it('should find all companies', async () => {
                createdCompanyMock._id = new Types.ObjectId();
                createdCompanyDTO.id = createdCompanyMock._id.toString();
                const foundCompanies = [createdCompanyMock]; // Adicione as empresas encontradas aqui
                jest.spyOn(companyRepository, 'findAll').mockResolvedValue(foundCompanies);
                jest.spyOn(CompanyMapper, 'toDTO')
                const result = await companyService.findAll();
                expect(CompanyMapper.toDTO).toHaveBeenCalledWith(createdCompanyMock);
                expect(result).toEqual([createdCompanyDTO]);
            });
        });

        describe('findOne', () => {
            it('should find a company by ID', async () => {
                createdCompanyMock._id = new Types.ObjectId();
                createdCompanyDTO.id = createdCompanyMock._id.toString();
                const companyId = 'someId'
                jest.spyOn(companyRepository, 'findOne').mockResolvedValue(createdCompanyMock);
                jest.spyOn(CompanyMapper, 'toDTO')
                const result = await companyService.findOne(companyId);
                expect(companyRepository.findOne).toHaveBeenCalledWith(companyId);
                expect(CompanyMapper.toDTO).toHaveBeenCalledWith(createdCompanyMock);
                expect(result).toEqual(createdCompanyDTO);
            });

            it('should throw NotFoundException if company is not found', async () => {
                const companyId = 'nonExistentId';
                jest.spyOn(companyRepository, 'findOne').mockResolvedValue(null);
                jest.spyOn(CompanyMapper, 'toDTO')
                try {
                    await companyService.findOne(companyId)
                } catch (error) {
                    expect(error).toBeInstanceOf(NotFoundException);
                    expect(error.message).toEqual('Company not found');

                    expect(CompanyMapper.toDTO).not.toHaveBeenCalled()
                }

            });
        });

        describe('update', () => {
            it('should update a company', async () => {
                updatedCompanyMock._id = new Types.ObjectId();
                updatedCompanyDTO.id = updatedCompanyMock._id.toString();
                const companyId = 'someId';
                jest.spyOn(companyRepository, 'update').mockResolvedValue(updatedCompanyMock);
                const result = await companyService.update(companyId, updateCompanyInputMock);
                expect(result).toEqual(updatedCompanyDTO);
            });
        });

        describe('remove', () => {
            it('should remove a company', async () => {
                createdCompanyMock._id = new Types.ObjectId();
                createdCompanyDTO.id = createdCompanyMock._id.toString()
                const companyId = 'someId';
                jest.spyOn(companyRepository, 'delete').mockResolvedValue(createdCompanyMock);
                const result = await companyService.remove(companyId);
                expect(result).toEqual(createdCompanyDTO);
            });
        });
    })
})
