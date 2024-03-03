import { Error as MongooseError } from 'mongoose';
import { HttpException, HttpStatus } from '@nestjs/common';

export class MongooseErrorHandler {
    public static handleError(error: any) {
        console.log('error', error)
        if (error instanceof MongooseError) {
            switch (error.name) {
                case 'ValidationError':
                    return this.handleValidationError(error);
                case 'CastError':
                    return this.handleCastError(error);
                default:
                    return this.handleOtherError(error);
            }
        } else if (error instanceof HttpException) {
            throw error;
        } else {
            console.error('Unexpected error:', error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private static handleValidationError(error: any) {
        const errors: { [key: string]: string } = {};
        for (let field in error.errors) {
            errors[field] = error.errors[field].message;
        }
        return new HttpException({ message: 'Validation Error', errors }, HttpStatus.BAD_REQUEST);
    }

    private static handleCastError(error: any) {
        const message = `Invalid ${error.kind}: ${error.value}. Path: ${error.path}`;
        return new HttpException({ message: 'Cast Error', error: message }, HttpStatus.BAD_REQUEST);
    }

    private static handleOtherError(error: any) {
        console.error('Unexpected error:', error);
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

