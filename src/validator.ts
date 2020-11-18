import {plainToClassFromExist} from 'class-transformer';
import {validate, ValidationError} from 'class-validator';


export async function plainToClass<T>(plainJson: any, targetProducer: () => T): Promise<T> {
	const model: T = plainToClassFromExist(targetProducer(), plainJson);
	const errors: ValidationError[] = await validate(model);

	if (errors.length > 0) {
		throw new Error(errors.toString());
	}

	return model;
}

export async function arrayPlainToClass<T>(plainJson: any, targetProducer: () => T): Promise<Array<T>> {
	if (!Array.isArray(plainJson)) {
		throw new Error('Passed JSON is not array of items');
	}
	try {
		return await Promise.all(plainJson.map(i => plainToClass(i, targetProducer)));
	} catch (e) {
		throw new Error(`Not a valid input : ${e.message}`);
	}
}
