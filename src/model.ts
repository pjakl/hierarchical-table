import {Type} from 'class-transformer';
import {IsArray, IsDefined, IsObject, IsOptional, ValidateNested} from 'class-validator';

export class Item {
	@IsDefined()
	data!: Object;
	@IsOptional()
	@IsObject()
	@ValidateNested()
	@Type(() => Kids)
	kids?: Kids
}

export class KidsRecords {
	@IsDefined()
	@IsArray()
	@ValidateNested({each: true})
	@Type(() => Item)
	records!: Item[];
}

export class Kids {
	[rootKey: string]: KidsRecords;
}
