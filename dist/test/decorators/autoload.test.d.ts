import 'jest';
export declare class Model {
}
export declare class Repository {
    model: Model;
    constructor();
    constructor(metadata: Object);
    getSomething(): string;
}
export declare class CustomMetadataRepository {
    model: Model;
    constructor(metadata?: Object);
    getSomething(): string;
}
export declare class TestAutoloadPropertyDecorator {
    static className: string;
    repository: Repository;
    customMetadataRepository: CustomMetadataRepository;
    constructor();
    constructor(metadata: Object);
    getSomething(): string;
}
