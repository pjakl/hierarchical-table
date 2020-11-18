import inputJson from './data.json';
import {arrayPlainToClass, Item} from './validator';


test('should validate everything and return all data', async () => {
	const results: Item[] = await arrayPlainToClass(inputJson, new Item());
	expect(results).toHaveLength(11);
	expect(results[0].data).toBeDefined();
	expect(results[0].kids).toBeDefined();
});

test('should fail as passed input is not array', async () => {
	await expect(arrayPlainToClass({}, new Item()))
		.rejects
		.toThrow('Passed JSON is not array of items');
});

test('should fail as Item is missing data', async () => {
	await expect(arrayPlainToClass([{}], new Item()))
		.rejects
		.toThrow('Not a valid input : An instance of Item has failed the validation:\n' +
			' - property data has failed the following constraints: isDefined');
});

test('should pass if kids are not defined', async () => {
	await expect(arrayPlainToClass([{
		data: {
			foo: 'bar'
		}
	}], new Item()))
		.resolves
		.toBeDefined();
});

test('should pass if kids are empty object', async () => {
	await expect(arrayPlainToClass([{
		data: {
			foo: 'bar'
		},
		kids: {}
	}], new Item()))
		.resolves
		.toBeDefined();
});

test('should fail when kids are array', async () => {
	await expect(arrayPlainToClass([{
		data: {
			foo: 'bar'
		},
		kids: []
	}], new Item()))
		.rejects
		.toThrow('Not a valid input : An instance of Item has failed the validation:\n' +
			' - property kids has failed the following constraints: isObject');
});
